var Mixins = {
  styleOverride : function(node) {
    if(!node.style) {
      return {};
    }

    return node.style;
  }
};

module.exports = Mixins;
