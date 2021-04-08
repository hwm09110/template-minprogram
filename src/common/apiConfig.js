// 【个人本机测试地址】
// 基础库：192.168.8.136:2002
// 课程：192.168.8.136:2004
// 订单：192.168.8.92:2006
// 订餐：192.168.8.56:2008
// 登录：192.168.8.147:8888

// 【测试服地址】
// 基础库：http://rt.gzhtoa.com:30283/basic430
// 课程：http://rt.gzhtoa.com:30283/course430
// 订单：http://rt.gzhtoa.com:30283/order430
// 订餐：http://rt.gzhtoa.com:30283/orderfood430
// 登录：http://rt.gzhtoa.com:30283/authentication

// 【正式地址】
// 基础库：https://rtschool.gzhtedu.cn/basic430/
// 课程：https://rtschool.gzhtedu.cn/course430/
// 订单：https://rtschool.gzhtedu.cn/order430/
// 订餐：https://rtschool.gzhtedu.cn/orderfood430/
// 登录：https://rtschool.gzhtedu.cn/authentication/

// key:wechatApplet-teacher
// code:053VhPkl2ojMl64s7Qll2eBuBb3VhPkm
// namespace:430

const useDevMode = 'test'; //内网：'intranet', 测试服：'test'

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
  },
  // 【李冠焕本机】
  lgh: {
    basicsdomain: 'http://192.168.8.136:2002',
    coursedomain: 'http://192.168.8.136:2004',
    orderfooddomain: 'http://192.168.8.136:2008',
    logindomain: 'http://rt.gzhtoa.cn:82'
  }
};

// 基础库域名
export const BASICSDOMAIN =
  process.env.NODE_ENV == 'development'
    ? testDomainConfigs[useDevMode]['basicsdomain']
    : 'https://rtschool.gzhtedu.cn/basic430';

// 课程模块域名
export const COURSEDOMAIN =
  process.env.NODE_ENV == 'development'
    ? testDomainConfigs[useDevMode]['coursedomain']
    : 'https://rtschool.gzhtedu.cn/course430';

// 订餐模块域名
export const ORDERFOODDOMAIN =
  process.env.NODE_ENV == 'development'
    ? testDomainConfigs[useDevMode]['orderfooddomain']
    : 'https://rtschool.gzhtedu.cn/orderfood430';

// 登录域名
export const LOGINDOMAIN =
  process.env.NODE_ENV == 'development'
    ? testDomainConfigs[useDevMode]['logindomain']
    : 'https://rtschool.gzhtedu.cn';

// key、namespace
export const KEY = 'wechatApplet-teacher';
export const NAMESPACE = '430';
