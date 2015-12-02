let pageNavigator = null;

export default {
  init(navigator) {
    pageNavigator = navigator;
  },

  open(route) {
    pageNavigator.popToTop();
    pageNavigator.replace(route);
  }
}