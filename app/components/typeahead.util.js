"use strict";
/* global setTimeout, clearTimeout */

function handleKeyDown(event) {
  var index = this.state.index;
  var opLen = this.getOptions().length;
  switch (event.which) {
    case 40:  //down
      event.preventDefault();
      this.setState({index: Math.min(index + 1, opLen - 1)});
      break;
    case 38:  //up
      event.preventDefault();
      this.setState({
        index: index < 0 ? opLen - 1 : Math.max(0, index - 1)
      });
      break;
    case 9:   // tab
    case 13:  // enter
      if (index < 0 || opLen < 1) return;
      event.preventDefault();
      this.handleSelect(index);
      break;
    case 27:  // esc
      event.preventDefault();
      this.hideMenu();
      break;
    default:
  }
}

function handleBlur() {
  this.blurTimer = setTimeout(
    () => this.hideMenu()
  , 200);
}

function hideMenu() {
  this.setState({
    index: -1,
    hideMenu: true
  });
}

function handleUnmount() {
  clearTimeout(this.blurTimer);
}


exports.handleKeyDown = handleKeyDown;
exports.handleBlur = handleBlur;
exports.hideMenu = hideMenu;
exports.handleUnmount = handleUnmount;
