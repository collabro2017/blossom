var Mixins = {
  styleOverride : function(node) {
    if(!!node && !!node.style) {
      return node.style;
    }

    return {};
  }
};

module.exports = Mixins;
