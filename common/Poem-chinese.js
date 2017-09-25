var ReactNative = require('react-native');
const {
  AppRegistry,
  TouchableHighlight,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Dimensions,
} = ReactNative;

var React = require('react');
var {
    Component
} = React;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

var Book = {
  "title": "Awaking in a Spring Morning",
  "bookId": "345",
  "thumbnail": 'cp_01',
  "author": "Folklore",
  "style": {
    backgroundColor: '#fff'
  },
  "L1": 'English',
  "L2": 'Chinese',
  "blends": {
      A : '95% English',
      B : 'mostly English',
      C : '50% each',
      D : 'mostly Chinese',
      E : '95% Chinese'
  },
  "pages": [
  {
    style : {
    },
    "content": [
    //cover
    {
      type : 'image',
      src : 'cp_cover',
      style : {
          marginBottom: 30,
          width: windowWidth,
          height: windowHeight,
      }
    }
  ]
  },
  {
    "content": [
    //page 1
    {
      type : 'image',
      src : 'cp_01',
      style : {
        
        width: windowWidth*0.8,
        height: windowHeight*0.8,
      }
    },
    {
      "type": "paragraph",
      "content": [{
        "type": "text",
        "content": {
          "L1": "One ",
          "L2": "一个 "
        },
        "blends": {
          "A": "L2",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "spring ",
          "L2": "春天 "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "morning, ",
          "L2": "早上, "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "the poet ",
          "L2": "诗人 "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "Meng Haoran ",
          "L2": "孟浩然 "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "had just awoken. ",
          "L2": "刚 睡 醒 了。"
        },
        "blends": {
          "A": "L1",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      }
      ]
    }]
  }, {
    "content": [
    //page 2
    {
      type : 'image',
      src : 'cp_02',
      style : {
        
        width: windowWidth*0.8,
        height: windowHeight*0.8,
      }
    },
    {
      "type": "paragraph",
      "content": [{
        "type": "text",
        "content": {
          "L1": "He ",
          "L2": "他 "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L2",
          "D": "L1",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "looked ",
          "L2": "看了看 "
        },
        "blends": {
          "A": "L1",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "outside the window. ",
          "L2": "窗外。"
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }]
    }]
  }, {
    "content": [
    //page 3
    {
      type : 'image',
      src : 'cp_03',
      style : {
        
        width: windowWidth*0.8,
        height: windowHeight*0.8,
      }
    },
    {
      "type": "paragraph",
      "content": [{
        "type": "text",
        "content": {
          "L1": "Before he realized, ",
          "L2": "不知不觉, "
        },
        "blends": {
          "A": "L1",
          "B": "L2",
          "C": "L2",
          "D": "L1",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "the sun ",
          "L2": "太阳 "
        },
        "blends": {
          "A": "L2",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "had ",
          "L2": "已经 "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "risen high up ",
          "L2": "高高 地 挂 "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "in the sky. ",
          "L2": "在 天 上 了。"
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }]
    }]
  }, {
    "content": [
    //page 4
    {
      type : 'image',
      src : 'cp_04',
      style : {
        
        width: windowWidth*0.8,
        height: windowHeight*0.8,
      }
    },
    {
      "type": "paragraph",
      "content": [{
        "type": "text",
        "content": {
          "L1": "The Birds’ ",
          "L2": "小鸟的 "
        },
        "blends": {
          "A": "L1",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "beautiful ",
          "L2": "优美的 "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "songs ",
          "L2": "歌声 "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "could be heard everywhere. ",
          "L2": "到处 都 能 听到。"
        },
        "blends": {
          "A": "L2",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L2"
        }
      }]
    }]
  }, {
    "content": [
    //page 5
    {
      type : 'image',
      src : 'cp_05',
      style : {
        
        width: windowWidth*0.8,
        height: windowHeight*0.8,
      }
    },
    {
      "type": "paragraph",
      "content": [{
        "type": "text",
        "content": {
          "L1": "At this moment, ",
          "L2": "这时, "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "Meng Haoran ",
          "L2": "孟浩然 "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "remembered that, ",
          "L2": "想起了, "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "last night, ",
          "L2": "昨天晚上, "
        },
        "blends": {
          "A": "L2",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "he ",
          "L2": "他 "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "had heard ",
          "L2": "听到了 "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "strong ",
          "L2": "大 "
        },
        "blends": {
          "A": "L1",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "wind ",
          "L2": "风 "
        },
        "blends": {
          "A": "L1",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "blowing ",
          "L2": "呼呼地吹 "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "and ",
          "L2": "和 "
        },
        "blends": {
          "A": "L1",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "heavy ",
          "L2": "大 "
        },
        "blends": {
          "A": "L1",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "rain ",
          "L2": "雨 "
        },
        "blends": {
          "A": "L1",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "falling. ",
          "L2": "啪啪地下。 "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }]
    }]
  }, {
    "content": [
    //page 6
    {
      type : 'image',
      src : 'cp_06',
      style : {
        
        width: windowWidth*0.8,
        height: windowHeight*0.8,
      }
    },
    {
      "type": "paragraph",
      "content": [{
        "type": "text",
        "content": {
          "L1": "So ",
          "L2": "于是 "
        },
        "blends": {
          "A": "L1",
          "B": "L2",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "he ",
          "L2": "他 "
        },
        "blends": {
          "A": "L1",
          "B": "L2",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "wondered to himself: ",
          "L2": "问 自己: "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "\"Last night, ",
          "L2": "\"昨天晚上, "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "how much of ",
          "L2": "多少 "
        },
        "blends": {
          "A": "L2",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "the spring ",
          "L2": "春 "
        },
        "blends": {
          "A": "L2",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "flowers ",
          "L2": "花 "
        },
        "blends": {
          "A": "L2",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      },{
        "type": "text",
        "content": {
          "L1": "were blown off by the wind and the rain?\"",
          "L2": "被 风 雨 吹 落 了 呢?\""
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      }]
    }]
  },
  {
    style : {
    },
    "content": [
    //last page
    {
      type : 'image',
      src : 'cp_cover',
      style : {
          marginBottom: 30,
          width: windowWidth,
          height: windowHeight,
      }
    }
  ]
  }]
}
;
module.exports = Book;
