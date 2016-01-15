var Book = {
  title : 'My Awesome Book',
  author : 'some guy',
  pages : [
    //first page
    {
      content : [
        {
          type : 'paragraph',
          content : [
            {
              type : 'text',
              content : {
                L1 : 'test',
                L2 : 'prueba',
              },
              blends : {
                A : 'L1',
                B : 'L1',
                C : 'L1',
                D : 'L2',
                E : 'L2'
              },
              style : {
                // fontStyle : 'italic'
              }
            },
            {
              type : 'text',
              content : {
                L1 : 'number one',
                L2 : 'numero uno'
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
                L1 : 'is done.',
                L2 : 'completo.'
              },
              blends : {
                A : 'L1',
                B : 'L2',
                C : 'L2',
                D : 'L2',
                E : 'L2'
              }
            }
          ]
        }
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