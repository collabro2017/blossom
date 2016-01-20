var Book = {
  title : 'The Tale of Peter Rabbit',
  author : 'Beatrix Potter',
  style : {
    //example
    // backgroundColor : 'red'
  },
  pages : [
    //first page
    {
      style : {
        //example
        // backgroundColor : 'green'
      },
      content : [
        {
          type : 'paragraph',
          content : [
            {
              type : 'text',
              content : {
                L1 : 'Once upon a time there were four',
                L2 : 'Érase una vez había cuatro'
              },
              blends : {
                A : 'L1',
                B : 'L1',
                C : 'L2',
                D : 'L2',
                E : 'L2'
              }
            },
            {
              type : 'text',
              content : {
                L1 : 'little rabbits,',
                L2 : 'conejitos,'
              },
              blends : {
                A : 'L2',
                B : 'L2',
                C : 'L1',
                D : 'L1',
                E : 'L1'
              }
            },
            {
              type : 'text',
              content : {
                L1 : 'and their names were - Flopsy, Mopsy Cotton-tail and',
                L2 : 'y sus nombres eran—Flopsy,Mopsy, Cotton-tail y'
              },
              blends : {
                A : 'L1',
                B : 'L1',
                C : 'L2',
                D : 'L2',
                E : 'L2'
              }
            },
            {
              type : 'text',
              content : {
                L1 : 'Peter.',
                L2 : 'Pedro.'
              },
              blends : {
                A : 'L2',
                B : 'L2',
                C : 'L1',
                D : 'L1',
                E : 'L2'
              }
            },
            {
              type : 'text',
              content : {
                L1 : 'They lived with their',
                L2 : 'Ellos vivían con su'
              },
              blends : {
                A : 'L1',
                B : 'L1',
                C : 'L2',
                D : 'L2',
                E : 'L2'
              }
            },
            {
              type : 'text',
              content : {
                L1 : 'Mother',
                L2 : 'mamá'
              },
              blends : {
                A : 'L2',
                B : 'L2',
                C : 'L1',
                D : 'L1',
                E : 'L2'
              }
            },
            {
              type : 'text',
              content : {
                L1 : 'in the sand-bank, underneath the root of',
                L2 : 'en el banco de arena, debajo de las raíces del'
              },
              blends : {
                A : 'L1',
                B : 'L1',
                C : 'L2',
                D : 'L2',
                E : 'L2'
              }
            },
            {
              type : 'text',
              content : {
                L1 : 'a big fir-tree.',
                L2 : 'del abeto grande.'
              },
              blends : {
                A : 'L1',
                B : 'L2',
                C : 'L1',
                D : 'L2',
                E : 'L2'
              }
            }
          ]
        },
      ]
    },

    //2nd page
    {
      content : [
        {
          type : 'paragraph',
          content : [
            {
              type : 'text',
              content : {
                L1 : 'Well, that\'s certainly good to know.',
                L2 : 'Bueno, eso es ciertamente bueno saberlo.'
              },
              blends : {
                A : 'L1',
                B : 'L1',
                C : 'L1',
                D : 'L2',
                E : 'L2'
              }
            }
          ]
        },
        {
          type : 'paragraph',
          content : [
            {
              type : 'text',
              content : {
                L1 : 'I suggest you drop it, Mr. Data.',
                L2 : 'Sugiero se te cae, Sr. Data.'
              },
              blends : {
                A : 'L1',
                B : 'L1',
                C : 'L1',
                D : 'L2',
                E : 'L2'
              },
              //example of style override
              style : {
                fontStyle : 'italic',
                fontWeight : 'bold'
              }
            },
            {
              type : 'text',
              content : {
                L1 : 'Captain, why are we out here chasing comets? we should be doing something completely different',
                L2 : 'Capitán, ¿por qué estamos aquí persiguiendo cometas?'
              },
              blends : {
                A : 'L1',
                B : 'L1',
                C : 'L1',
                D : 'L2',
                E : 'L2'
              }
            }
          ]
        }
      ]
    }

  ]
};

module.exports = Book;