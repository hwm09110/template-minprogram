// key:wechatApplet-teacher
// code:053VhPkl2ojMl64s7Qll2eBuBb3VhPkm
// namespace:430

const useDevMode = 'test' //内网：'intranet', 测试服：'test'

const testDomainConfigs = {
  // 内网
  intranet: {
    basicsdomain: 'http://rt.gzhtoa.cn:82/basic430',
    coursedomain: 'http://rt.gzhtoa.cn:82/course430',
    orderfooddomain: 'http://rt.gzhtoa.cn:82/orderfood430',
    logindomain: 'http://rt.gzhtoa.cn:82'
  },
  // 测试服
  test: {
    basicsdomain: 'http://rt.gzhtoa.com:30283/basic430',
    coursedomain: 'http://rt.gzhtoa.com:30283/course430',
    orderfooddomain: 'http://rt.gzhtoa.com:30283/orderfood430',
    logindomain: 'http://rt.gzhtoa.com:30283'
  }
}

// 基础库域名
export const BASICSDOMAIN =
  process.env.NODE_ENV == 'development'
    ? testDomainConfigs[useDevMode]['basicsdomain']
    : 'https://rtschool.gzhtedu.cn/basic430'

// 课程模块域名
export const COURSEDOMAIN =
  process.env.NODE_ENV == 'development'
    ? testDomainConfigs[useDevMode]['coursedomain']
    : 'https://rtschool.gzhtedu.cn/course430'

// 订餐模块域名
export const ORDERFOODDOMAIN =
  process.env.NODE_ENV == 'development'
    ? testDomainConfigs[useDevMode]['orderfooddomain']
    : 'https://rtschool.gzhtedu.cn/orderfood430'

// 登录域名
export const LOGINDOMAIN =
  process.env.NODE_ENV == 'development'
    ? testDomainConfigs[useDevMode]['logindomain']
    : 'https://rtschool.gzhtedu.cn'

// key、namespace
export const KEY = 'wechatApplet-teacher'
export const NAMESPACE = '430'
