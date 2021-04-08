/**
 *对Date的扩展，将 Date 转化为指定格式的String
 *月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 *年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 *例子：
 *(new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 *(new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
 * version 1.0
 */
Date.prototype.Format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp('(' + k + ')').test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      );
  return fmt;
};

// 获取当前日期
export function getTodayDate(fmt = 'yyyy-MM-dd') {
  return new Date().Format(fmt);
}

// 时间戳格式化
export function formatTime(timeStamps, fmt = 'yyyy-MM-dd') {
  return new Date(timeStamps).Format(fmt);
}

/*日期字符串转时间戳(秒)*/
export function dateToTimestamp(datestr) {
  datestr = datestr.replace(/-/g, '/');
  return Math.floor(new Date(datestr).getTime() / 1000);
}

//获取未来几天的日期
export function getFuturedates(daysCount) {
  let dates = [];
  let oneDayMillisecond = 86400000; //一天毫秒数
  let oDate = new Date();
  let nowTimeStamp = oDate.getTime();

  for (let i = 1; i <= daysCount; i++) {
    dates.push(formatTime(nowTimeStamp + oneDayMillisecond * i));
  }
  return dates;
}

// 判断日期是否为未来的某一天 dateStr => 2021-01-19 11:17:20
// 判断dateStr是否为明天，则n传1，是否为后天，则n传2
export function isNNextDate(dateStr, n) {
  let todayTimeStamps = new Date().getTime();
  let futureTimeStamps = new Date(
    dateStr.split(' ')[0].replace(/-/g, '/')
  ).getTime();
  let oneDayStamps = 24 * 60 * 60 * 1000;
  return (
    futureTimeStamps - todayTimeStamps > (n - 1) * oneDayStamps &&
    futureTimeStamps - todayTimeStamps <= oneDayStamps * n
  );
}

//获取某年某月有几天
export function getMonthDayCount(year, month) {
  return new Date(year, month, 0).getDate();
}

// 防抖函数
export function debounce(fn, delay, options) {
  let timer = null;
  let canRun = true;
  return function () {
    let context = this;
    let args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    if (options && options.immediate) {
      timer = setTimeout(() => {
        canRun = true;
      }, delay);
      canRun && fn.apply(context, args);
      canRun = !canRun;
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args);
      }, delay);
    }
  };
}

// 节流函数
export function throttle(fn, wait) {
  let previous = 0;
  return function () {
    let now = Date.now();
    let context = this;
    let args = arguments;
    if (now - previous > wait) {
      fn.apply(context, args);
      previous = now;
    }
  };
}

// 判断是否是正确的手机号码
export function isPhone(phone) {
  return /^1[2,3,4,5,6,7,8,9]\d{9}$/g.test(phone);
}

/**
 * 判断是否IOS系统
 */
export function isIOSSystem() {
  let isIOS = false;
  try {
    const res = wx.getSystemInfoSync();
    if (res.system.indexOf('iOS') != -1) {
      isIOS = true;
    } else {
      isIOS = false;
    }
  } catch (e) {
    // Do something when catch error
  }
  return isIOS;
}

// 深拷贝
export function deepCopy(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error');
  }
  var targetObj = source.constructor === Array ? [] : {};
  for (var keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepCopy(source[keys]);
      } else {
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}

/*
将周次转化成中文
*/
export const weekChinese = [
  
  '周一',
  '周二',
  '周三',
  '周四',
  '周五',
  '周六',
  '周日',
];
/**将日期转换位中文形式*/
export function dateHandler(param,format){
  //注意：苹果手机不支持以“-”分割的时间形式，故必须进行格式转换。
  let time = param.split(" ").length > 1 ? param : param + " 00:00:00";
  time = param.replace(/-/g,"/");
  let timetap = Date.parse(time),
      date = new Date(timetap).Format(format);
  return date;    
}
//保存时分
export function hourAndSecond(date) {
  return date.substring(0, 5);
}
//将小数转成百分比
export function transSmallNumToPercent(smallNum) {
  let nums = Number(smallNum);
  return parseFloat(nums / 100).toFixed(2);
}
