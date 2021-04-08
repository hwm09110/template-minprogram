const ora = require('ora')
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
const merge = require('webpack-merge')
const program = require('commander')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MpxWebpackPlugin = require('@mpxjs/webpack-plugin')
const mpxWebpackPluginConfig = require('./mpx.plugin.conf')
const getConfig = require('../config/index')
const getDllManifests = require('./getDllManifests')

let webpackMainConfig = require('./webpack.conf')

const mainSubDir = ''
function resolveDist (file, subPathStr = mainSubDir) {
  return path.resolve(__dirname, '../dist', subPathStr, file || '')
}
function resolve (file) {
  return path.resolve(__dirname, '..', file || '')
}

const webpackConfigArr = []
const userSelectedMode = 'wx'

const mpxLoaderConfig = {}

const transModuleRules = [
  {
    test: /\.mpx$/,
    use: MpxWebpackPlugin.loader(mpxLoaderConfig)
  }
]

program
  .option('-w, --watch', 'watch mode')
  .option('-p, --production', 'production release')
  .parse(process.argv)

const config = getConfig(program.production)
const dllManifests = getDllManifests(program.production)

const plugins = []
const copyList = [
  {
    from: resolve('project.config.json'),
    to: mainSubDir ? '..' : ''
  }]
const localDllManifests = dllManifests.filter((manifest) => {
  return !manifest.mode
})
localDllManifests.forEach((manifest) => {
  plugins.push(new webpack.DllReferencePlugin({
    context: config.context,
    manifest: manifest.content
  }))
  copyList.push({
    context: path.join(config.dllPath, 'lib'),
    from: manifest.content.name,
    to: manifest.content.name
  })
})
plugins.push(new CopyWebpackPlugin(copyList))

const webpackWxConfig = merge(webpackMainConfig, {
  plugins
})

webpackConfigArr.push(merge(webpackWxConfig, {
  output: {
    path: resolveDist()
  },
  module: { rules: transModuleRules },
  plugins: [
    new MpxWebpackPlugin(Object.assign({mode: userSelectedMode}, mpxWebpackPluginConfig))
  ]
}))

function runWebpack (cfg) {
  // env
  if (Array.isArray(cfg)) {
    cfg.forEach(item => item.plugins.unshift(new webpack.DefinePlugin(config.env)))
  } else {
    cfg.plugins.unshift(new webpack.DefinePlugin(config.env))
  }

  // production mode set mode be 'production' for webpack
  // watch mode set cache be true for webpack
  if (program.production || program.watch) {
    const extendCfg = {}
    if (program.production) { extendCfg.mode = 'production' }
    if (program.watch){ extendCfg.cache = true }

    if (Array.isArray(cfg)) {
      cfg = cfg.map(item => merge(item, extendCfg))
    } else {
      cfg = merge(cfg, extendCfg)
    }
  }
  if (process.env.npm_config_report) {
    var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    var mainCfg = Array.isArray(cfg) ? cfg[0] : cfg
    mainCfg.plugins.push(new BundleAnalyzerPlugin())
  }
  if (program.watch) {
    webpack(cfg).watch({}, callback)
  } else {
    webpack(cfg, callback)
  }
}

function callback (err, stats) {
  spinner.stop()
  if (err) return console.error(err)
  if (Array.isArray(stats.stats)) {
    stats.stats.forEach(item => {
      console.log(item.compilation.name + '打包结果：')
      process.stdout.write(item.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false,
        entrypoints: false
      }) + '\n\n')
    })
  } else {
    process.stdout.write(stats.toString({
      colors: true,
      modules: false,
      children: false,
      chunks: false,
      chunkModules: false,
      entrypoints: false
    }) + '\n\n')
  }

  if (!program.watch && stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.cyan('  Build complete.\n'))
  if (program.watch) {
    console.log(chalk.cyan(`  ${new Date()} build finished.\n  Still watching...\n`))
  }
}

const spinner = ora('building...')
spinner.start()

try {
  rm.sync(path.resolve(__dirname, `../dist/*`))
} catch (e) {
  console.error(e)
  console.log('\n\n删除dist文件夹遇到了一些问题，如果遇到问题请手工删除dist重来\n\n')
}

if (webpackConfigArr.length === 1) {
  runWebpack(webpackConfigArr[0])
} else {
  runWebpack(webpackConfigArr)
}
