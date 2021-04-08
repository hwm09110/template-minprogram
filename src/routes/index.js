// 首页、通用
const comonRoutes = [
  './pages/index/index',
  './pages/index/login',
  './pages/index/bind',
  './pages/index/auth',

  './pages/mine/index'
]

// 学生请假
const exampleRoutes = ['./pages/index']

const allRoutes = [...comonRoutes]
console.log('allRoutes', allRoutes)

module.exports = { allRoutes, exampleRoutes }
