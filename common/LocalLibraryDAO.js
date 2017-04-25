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
        earmarkedPage: 'string'
    }}]
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
