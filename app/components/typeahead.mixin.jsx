"use strict";
/* global setTimeout, clearTimeout */

var TypeaheadMixin = {

  componentWillUnmount: function() {
    clearTimeout(this.blurTimer);
  },

  hideMenu: function () {
    this.setState({
      index: -1,
      hideMenu: true
    });
  },

  handleKeyDown: function(event) {
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
  },

  handleBlur: function() {
    this.blurTimer = setTimeout(function() {
      this.hideMenu();
    }.bind(this), 200);
  }

};


module.exports = TypeaheadMixin;
