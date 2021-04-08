// 页面分享

/*获取当前页url*/
function getCurrentPageUrl(){
  let pages = getCurrentPages()    //获取加载的页面
  let currentPage = pages[pages.length-1]    //获取当前页面的对象
  let url = currentPage.route    //当前页面url
  return url
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs(){
  let pages = getCurrentPages()    //获取加载的页面
  let currentPage = pages[pages.length-1]    //获取当前页面的对象
  let url = currentPage.route    //当前页面url
  let options = currentPage.options    //如果要获取url中所带的参数可以查看options

  //拼接url的参数
  let urlWithArgs = url + '?'
  for(let key in options){
      let value = options[key]
      urlWithArgs += key + '=' + value + '&'
  }
  urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length-1)

  return urlWithArgs
}

/**
 * setSharePagePath
 * 设置页面分享的path
 * options {
 *  requireLogin 分享的页面是否需要登录才能访问   0:不需要 1需要
 * }
 */
export function setSharePagePath(options = {requireLogin:0}) {
  let currentPage = getCurrentPageUrlWithArgs();
  console.log('currentPage', currentPage);
  let encode_currentPage = encodeURIComponent('/'+currentPage);
  console.log('encode_currentPage', encode_currentPage);
  let sharePath = `/pages/index/auth?fromPath=${ encode_currentPage }&requireLogin=${ options.requireLogin }`;
  return sharePath;
}
