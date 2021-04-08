export default {
  onShow () {
    if (typeof this.getTabBar === 'function' &&
      this.getTabBar()) {
      console.log('自定义导航实例>>>', this.getTabBar());
      let currentPagePath = getCurrentPages()[getCurrentPages().length - 1].route;
      this.getTabBar().currentPagePath = currentPagePath;
    }
  },
}
