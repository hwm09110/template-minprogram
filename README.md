# zt-afterclass-teacher-minprogram

> 430托管小程序【教师端】

## Dev

```bash
# install dep
npm i

# for dev
npm run watch

# for online
npm run build
```

npm script规范 [build|watch]:[dev|prod]:[cross|web|none]

build默认prod，watch默认dev。另单独提供了build:dev和watch:prod，用于单次构建分析看未压缩代码分析问题和持续压缩代码便于大体积项目真机调试。

建议自行调整cross的目标。npm-run-all是为了兼容windows下无法同时执行两个npm script，若不需要转web平台，可考虑去掉。

解决微信电脑端打开页面白屏问题 请使用assets/js/_microtask.js替换掉node_modules\core-js\library\modules\_microtask.js。 文件位置：node_modules\core-js\library\modules\_microtask.js
