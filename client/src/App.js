//Hooks
import { useState, createContext, useEffect } from 'react';
import useEditBook from './hooks/editBook';
//Components
import Sidebar from './views/Sidebar';
import PinnedNote from './views/PinnedNote';
import Book from './views/Book';
import EditBookModal from './components/Modals/EditBookModal';
import AddBookModal from './components/Modals/AddBookModal.js';
import FilterModal from './components/Modals/FilterModal';
//CSS
import style from './styles/App.module.css';
//Data
import DEVpreloadedBooks from './lib/books.js';

const ActiveBookContext = createContext();

function App() {
  const [bookshelf, defineBookshelf] = useState(DEVpreloadedBooks);
  const [activeBook, setActiveBook] = useState({});
  const [pinnedBook, setPinnedBook] = useState({});
  const [isEditModalOpen, toggleEditModal] = useState(false);
  const [isFilterModalOpen, toggleFilterModal] = useState(false);
  const [isAddBookModalOpen, toggleAddBookModal] = useState(false);
  const [bookEdits, defineBookEdits] = useState({});
  const { data: editedBook } = useEditBook(bookEdits);

  const saveEdits = (editType, edits, chapterId) => {
    defineBookEdits({ activeBook, editType, edits, chapterId });
  };

  useEffect(() => {
    setActiveBook(editedBook);
  }, [editedBook]);

  return (
    <ActiveBookContext.Provider
      value={{ toggleEditModal, activeBook, saveEdits, setPinnedBook }}
    >
      <main className={style.app}>
        <Sidebar
          toggleFilterModal={toggleFilterModal}
          toggleAddBookModal={toggleAddBookModal}
          toggleEditModal={toggleEditModal}
          isFilterModalOpen={isFilterModalOpen}
          isAddBookModalOpen={isAddBookModalOpen}
          bookshelf={bookshelf}
          pinnedBook={pinnedBook}
          activeBook={activeBook}
          setActiveBook={setActiveBook}
        />
        {isEditModalOpen && <EditBookModal />}
        {isAddBookModalOpen && <AddBookModal />}
        {isFilterModalOpen && <FilterModal />}
        <section className={style.main}>
          <PinnedNote />
          {activeBook && <Book />}
        </section>
      </main>
    </ActiveBookContext.Provider>
  );
}

export { App, ActiveBookContext };
