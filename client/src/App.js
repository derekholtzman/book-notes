import { useState, useEffect } from 'react';
import BookBlurb from './components/BookBlurb';
import Book from './views/Book';
import AddBook from './views/AddBook';
import DEVpreloadedBooks from './lib/books.js';
import style from './css/App.module.css'

function App() {
  // NOTE Preloaded books intended for serverless demo functionality only - remove for personal production
  const [bookshelf, defineBookshelf] = useState(DEVpreloadedBooks);
  const [activeBook, setActiveBook] = useState();
  const [isAddBookVisible, setAddBookVisible] = useState(false);

  const saveAnnotation = (newChapters) => {
    let index = bookshelf.findIndex((book) => book.id === activeBook.id);
    let revisedBook = {
      ...bookshelf[index],
      ...{ chapters: [...newChapters] },
    };
    bookshelf.splice(index, 1, revisedBook);
    setActiveBook(bookshelf[index]);
  };

  const deleteBook = (id) => {
    let index = bookshelf.findIndex((book) => book.id === id);
    bookshelf.splice(index, 1);
  };

  const addBook = (newBook) => {
    let doesBookExist = bookshelf.find(
      (book) => book.id === newBook.industryIdentifiers[0].identifier
    );
    if (!doesBookExist) {
      defineBookshelf([
        ...bookshelf,
        {
          id: newBook.industryIdentifiers[1].identifier,
          title: newBook.title,
          author: newBook.authors,
          image: newBook.imageLinks.thumbnail,
          categories: newBook.categories,
          chapters: [],
        },
      ]);
    } else {
      console.log('This book already exists');
    }
    setAddBookVisible(false);
  };

  return (
    <>
      <section className={style.bookBar}>
        {bookshelf &&
          bookshelf.map((book) => (
            <BookBlurb
              isActivated={book.id === activeBook?.id ? true : false}
              setActiveBook={setActiveBook}
              key={book.id}
              book={book}
              deleteBook={deleteBook}
            />
          ))}
        <button onClick={() => setAddBookVisible(!isAddBookVisible)}>
          Add Book
        </button>
        {isAddBookVisible && <AddBook addBook={addBook} />}
      </section>
      <section>
        {activeBook && (
          <Book
            saveAnnotation={saveAnnotation}
            chapters={activeBook.chapters}
          />
        )}
      </section>
    </>
  );
}

export default App;
