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
      voice: voice,
      // rate: 0.5, => //TODO: seems like iOS8 plays much faster??
    }).then(started => {
      console.log('started');
      //nothing to do
    })
    .catch(error => {
      console.log('error');
      //nothing to do, but this may be raised when flipping pages
      //while speech is playing
    });
  },
};

module.exports = Mixins;
