import React from 'react';
const Realm = require('realm');

var realm = new Realm({
    schema: [{
        name: 'Book',
        primaryKey: 'id',
        properties: {
            id: {type:'string'},
            path: 'string',
            readCount: {type: 'int', default: 0},
            rating: {type: 'int', default: 0},
            earmarkedPage: {type: 'int', default: 0},
            blendLevel: {type: 'int', default: 0},
    }}],
    schemaVersion: 2,
    migration: function(oldRealm, newRealm) {
    // only apply this change if upgrading to schemaVersion 1
    if (oldRealm.schemaVersion < 1) {
          var oldObjects = oldRealm.objects('Book');
          var newObjects = newRealm.objects('Book');

          // loop through all objects and set the new properties in the new schema
          for (var i = 0; i < newObjects.length; i++) {
            newObjects[i].rating = 0;
            newObjects[i].earmarkedPage = 0;
          }
        }

    if (oldRealm.schemaVersion < 2) {
          var oldObjects = oldRealm.objects('Book');
          var newObjects = newRealm.objects('Book');

          // loop through all objects and set the new properties in the new schema
          for (var i = 0; i < newObjects.length; i++) {
            newObjects[i].blendLevel = 0;
          }
        }
    },
});

class LocalLibraryDAO {
    save(bookId, bookPath) {
        realm.write(() => {
            realm.create('Book', {id: bookId, path: bookPath}, true);
        });

        window.EventBus.trigger('libraryUpdated', `New book added: ${bookId}`);
    }

    delete(bookId) {
        realm.write(() => {
          let book = realm.objects('Book').filtered(`id = "${bookId}"`);
          realm.delete(book);
        });

        window.EventBus.trigger('libraryUpdated', `Book deleted: ${bookId}`);
    }

    get(bookId, callback) {
        let book = realm.objects('Book').filtered(`id = "${bookId}"`);
        callBack(book);
    }

    getAll() {
        let books = realm.objects('Book');
        return books;
    }

    clearDB() {
        realm.write(() => {
          realm.deleteAll();
        });

        window.EventBus.trigger('libraryUpdated', `Cleared DB`);
    }
}

export default LocalLibraryDAO;
