var Speech = require('react-native-speech');

var Mixins = {
  styleOverride : function(node) {
    if(!!node && !!node.style) {
      return node.style;
    }

    return {};
  },

  speak : function(text, voice) {
    Speech.speak({
          text: text,
          voice: voice
        })
  },
};

module.exports = Mixins;
