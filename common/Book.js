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

const COVER_FONT_SIZE = /*Device.isIpad() ? 40 :*/ 22;
const STORY_FONT_SIZE = /*Device.isIpad() ? 26 :*/ 16;


var Book = {
  "title": "The Tale of Peter Rabbit",
  "bookId": "1",
  "thumbnail": 'cover',
  "L1": 'English',
  "L2": 'Spanish',
  "rating": 2.5,
  "blends": {
      A : '95% English',
      B : 'mostly English',
      C : '50% each',
      D : 'mostly Spanish',
      E : '95% Spanish'
  },
  "author": "Beatrix Potter",
  "style": {
    backgroundColor: '#fff'
  },
  "about":
      "The Tale of Peter Rabbit is a British children's book written and illustrated by Beatrix Potter that follows mischievous and disobedient young Peter Rabbit as he is chased about the garden of Mr. McGregor. He escapes and returns home to his mother, who puts him to bed after dosing him with camomile tea. The tale was written for five-year-old Noel Moore, son of Potter's former governess Annie Carter Moore, in 1893. It was revised and privately printed by Potter in 1901 after several publishers' rejections, but was printed in a trade edition by Frederick Warne & Co. in 1902. The book was a success, and multiple reprints were issued in the years immediately following its debut. It has been translated into 36 languages, and with 45 million copies sold it is one of the best-selling books of all time."
  ,
  "ages": "1-5",
  "publisher": "Frederick Warne & Co.",
  "pages": [
  {
    style : {},
    "content": [
    {
      type : 'image',
      src : 'cover',
      style : {
          marginBottom: 30,
          width: 350,
          height: 320,
      }
    },
    {
      "type": "paragraph",
      style : {
        alignSelf : 'center'
      },
      "content": [
        {
          "type": "text",
          style : {
            fontSize: COVER_FONT_SIZE,
            lineHeight: COVER_FONT_SIZE + 10,
            fontWeight: 'bold',
          },
          "content": {
            "L1": "THE TALE OF PETER RABBIT",
            "L2": "THE TALE OF PETER RABBIT"
          },
          "blends": {
            "A": "L1",
            "B": "L1",
            "C": "L1",
            "D": "L1",
            "E": "L1"
          }
        }
      ]
    },
    {
      "type": "paragraph",
      style : {
        alignSelf : 'center'
      },
      "content": [
        {
          "type": "text",
          style : {
              fontSize: COVER_FONT_SIZE,
              lineHeight: COVER_FONT_SIZE + 10,
            fontWeight: '100',
          },
          "content": {
            "L1": "by",
            "L2": "by"
          },
          "blends": {
            "A": "L1",
            "B": "L1",
            "C": "L1",
            "D": "L1",
            "E": "L1"
          }
        }
      ]
    },
    {
      "type": "paragraph",
      style : {
        alignSelf : 'center'
      },
      "content": [
        {
          "type": "text",
          style : {
            fontSize: STORY_FONT_SIZE,
            fontWeight: 'bold',
          },
          "content": {
            "L1": "Beatrix Potter",
            "L2": "Beatrix Potter"
          },
          "blends": {
            "A": "L1",
            "B": "L1",
            "C": "L1",
            "D": "L1",
            "E": "L1"
          }
        }
      ]
    }
  ]
  },
  {
    "style": {},
    "content": [
    {
      type : 'image',
      src : 'pr_2',
      style : {
        marginBottom: 40,
        width: 350,
        height: 360,
      }
    },
    {
      "type": "paragraph",
      "content": [
      {
        "type": "text",
        "content": {
          "L1": "Once upon a time ",
          "L2": "Érase una vez "
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
          "L1": "there were ",
          "L2": "había "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "four ",
          "L2": "cuatro "
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
          "L1": "little rabbits, ",
          "L2": "conejitos, "
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
          "L1": "and their names were ",
          "L2": "y sus nombres eran "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "— Flopsy, Mopsy, ",
          "L2": "— Flopsy, Mopsy, "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "Cotton-tail, and ",
          "L2": "Cotton-tail y "
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
          "L1": "Peter. ",
          "L2": "Pedro. "
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
          "L1": "They lived with their ",
          "L2": "Ellos vivían con su "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "mother ",
          "L2": "mamá "
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
          "L1": "in the sand-bank, ",
          "L2": "en el banco de arena, "
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
          "L1": "underneath the root ",
          "L2": "debajo de las raíces "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "of a big fir-tree.",
          "L2": "del abeto grande."
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
    "style": {},
    "content": [
    {
      type : 'image',
      src : 'pr_3',
      style : {
        marginBottom: 30,
        width: 350,
        height: 360,
      }
    },
    {
      "type": "paragraph",
      "content": [{
        "type": "text",
        "content": {
          "L1": "“Now my dears,” ",
          "L2": "“Ahora mis queridos,” "
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
          "L1": "said old ",
          "L2": "dijo la vieja "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L1"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "Mrs. Rabbit ",
          "L2": "Señora Conejo "
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
          "L1": "one morning, ",
          "L2": "una mañana, "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L1"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "“you may go into the fields or down the lane, but don’t go into ",
          "L2": "“pueden andar por los campos o por la calle, pero no vayan "
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
          "L1": "Mr. McGregor’s garden; ",
          "L2": "al jardín de Señor McGregor; "
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
          "L1": "your ",
          "L2": "su "
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
          "L1": "father ",
          "L2": "papá "
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
          "L1": "had an accident there; he was put in a pie by ",
          "L2": "tuvo un accidente allí; fue puesto en un pastel por la "
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
          "L1": "Mrs. McGregor”",
          "L2": "Señora McGregor.”"
        },
        "blends": {
          "A": "L2",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      }]
    }]
  }, {
    "style": {},
    "content": [
    {
      "type": "paragraph",
      style : {
        marginTop : 20,
        marginBottom : 20
      },
      "content": [{
        "type": "text",
        "content": {
          "L1": "“Now run along, and don’t get into mischief. I am going out”",
          "L2": "“Ahora váyanse y no hagan diabluras. Voy a salir”"
        },
        "blends": {
          "A": "L1",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      }]
    },
    {
      type : 'image',
      src : 'pr_4',
      style : {
        marginBottom: 40,
        width: 350,
        height: 360,
      }
    }]
  }, {
    "style": {},
    "content": [
    {
      type : 'image',
      src : 'pr_5',
      style : {
        marginBottom: 40,
        width: 350,
        height: 360,
      }
    },
    {
      "type": "paragraph",
      "content": [{
        "type": "text",
        "content": {
          "L1": "Then ",
          "L2": "Entonces "
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
          "L1": "old ",
          "L2": "la vieja "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "Mrs. Rabbit ",
          "L2": "Señora Conejo "
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
          "L1": "took a basket and her umbrella, and went ",
          "L2": "agarró su canasta y paraguas, y fue "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "through the ",
          "L2": "por el "
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
          "L1": "wood ",
          "L2": "bosque "
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
          "L1": "to the baker’s. ",
          "L2": "a la panadería. "
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
          "L1": "She bought a loaf of ",
          "L2": "Ella compró un "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "brown bread ",
          "L2": "pan de molde moreno "
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
          "L1": "and five currant buns.",
          "L2": "y cinco bollos de pasas."
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
    "style": {},
    "content": [
    {
      type : 'image',
      src : 'pr_6',
      style : {
        marginBottom: 40,
        width: 350,
        height: 360,
      }
    },
    {
      "type": "paragraph",
      "content": [{
        "type": "text",
        "content": {
          "L1": "Flopsy, Mopsy, ",
          "L2": "Flopsy, Mopsy, "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "and ",
          "L2": "y "
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
          "L1": "Cotton-tail, ",
          "L2": "Cotton-tail, "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "who were ",
          "L2": "quienes eran "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "good little rabbits, ",
          "L2": "conejitos buenos, "
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
          "L1": "went down ",
          "L2": "fueron por "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "the lane ",
          "L2": "la calle "
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
          "L1": "to gather ",
          "L2": "a recoger "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "blackberries.",
          "L2": "moras."
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
  }, {
    "style": {},
    "content": [
    {
      type : 'image',
      src : 'pr_7',
      style : {
        marginBottom: 40,
        width: 350,
        height: 360,
      }
    },
    {
      "type": "paragraph",
      "content": [{
        "type": "text",
        "content": {
          "L1": "But ",
          "L2": "Pero "
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
          "L1": "Peter, ",
          "L2": "Pedro, "
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
          "L1": "who was ",
          "L2": "quien era "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "very ",
          "L2": "muy "
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
          "L1": "naughty, ran straight to ",
          "L2": "travieso, corrió directamente "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "Mr. McGregor’s garden, ",
          "L2": "al jardín de Señor McGregor, "
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
          "L1": "and squeezed under ",
          "L2": "y pasó debajo "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "the gate!",
          "L2": "del portón!"
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
  }, {
    "style": {},
    "content": [
    {
      type : 'image',
      src : 'pr_8',
      style : {
        marginBottom: 40,
        width: 350,
        height: 360,
      }
    },
    {
      "type": "paragraph",
      "content": [{
        "type": "text",
        "content": {
          "L1": "First ",
          "L2": "Primero "
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
          "L1": "he ate some ",
          "L2": "comió un poco de "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "lettuces ",
          "L2": "lechuga "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "and some French beans; and ",
          "L2": "y algunas judías verdes; y "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "then ",
          "L2": "después "
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
          "L1": "he ate some radishes;",
          "L2": "comió algunos rábanos;"
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
    style : {},
    "content": [
    {
      "type": "paragraph",
      "content": [{
        "type": "text",
        "content": {
          "L1": "And then, ",
          "L2": "Y después, "
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
          "L1": "feeling rather ",
          "L2": "sintiéndose bastante "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "sick, ",
          "L2": "enfermo, "
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
          "L1": "he went to look for some parsley.",
          "L2": "fue a buscar perejil."
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }]
    },
    {
      type : 'image',
      src : 'pr_9',
      style : {
        marginBottom: 40,
        width: 350,
        height: 360,
      }
    }]
  }, {
    "style": {},
    "content": [
    {
      type : 'image',
      src : 'pr_10',
      style : {
        marginBottom: 40,
        width: 350,
        height: 360,
      }
    },
    {
      "type": "paragraph",
      "content": [{
        "type": "text",
        "content": {
          "L1": "But round the end of a cucumber frame, ",
          "L2": "Pero al doblar por donde estaban los pepinos, "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "whom should he meet but ",
          "L2": "¡con quién podría haberse encontrado sino "
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
          "L1": "Mr. ",
          "L2": "Señor "
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
          "L1": "McGregor!",
          "L2": "McGregor!"
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L2"
        }
      }]
    }]
  }, {
    "style": {},
    "content": [
    {
      type : 'image',
      src : 'pr_11',
      style : {
        marginBottom: 40,
        width: 350,
        height: 360,
      }
    },
    {
      "type": "paragraph",
      "content": [{
        "type": "text",
        "content": {
          "L1": "Mr. ",
          "L2": "Señor "
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
          "L1": "McGregor ",
          "L2": "McGregor "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "was on ",
          "L2": "estaba en "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "his hands and knees ",
          "L2": "cuatro patas "
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
          "L1": "planting out young cabbages, ",
          "L2": "plantando repollos jóvenes, "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "but he jumped up and ran after ",
          "L2": "pero saltó y corrió después de "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "Peter, ",
          "L2": "Pedro, "
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
          "L1": "waving a rake and calling out, ",
          "L2": "agitando un rastrillo y gritando, "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "“Stop thief!”",
          "L2": "“¡Párate ladrón!”"
        },
        "blends": {
          "A": "L1",
          "B": "L2",
          "C": "L2",
          "D": "L2",
          "E": "L2"
        }
      }]
    }]
  }, {
    "style": {},
    "content": [
    {
      "type": "paragraph",
      "content": [{
        "type": "text",
        "content": {
          "L1": "Peter ",
          "L2": "Pedro "
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
          "L1": "was most dreadfully ",
          "L2": "estaba terriblemente "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "frightened; ",
          "L2": "asustado; "
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
          "L1": "he rushed ",
          "L2": "corrió "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "all over the ",
          "L2": "por el "
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
          "L1": "garden, ",
          "L2": "jardín, "
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
          "L1": "for he had forgotten the way back to the ",
          "L2": "porque había olvidado cómo regresar al "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L2",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "gate. ",
          "L2": "portón. "
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
          "L1": "He lost one of his ",
          "L2": "Perdió uno de sus "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "shoes ",
          "L2": "zapatos "
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
          "L1": "among the cabbages, and the other ",
          "L2": "entre los repollos, y el otro "
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L2"
        }
      }, {
        "type": "text",
        "content": {
          "L1": "shoe ",
          "L2": "zapato "
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
          "L1": "amongst the potatoes.",
          "L2": "entre las papas."
        },
        "blends": {
          "A": "L1",
          "B": "L1",
          "C": "L1",
          "D": "L1",
          "E": "L2"
        }
      }]
    }]
  }]
};

module.exports = Book;
