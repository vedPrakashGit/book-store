import React, { useEffect, useState } from "react";
import Modal from "../components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import { toast } from "react-toastify";
import { getAllBooks } from "../apicalls/books";
import BookForm from "../components/BookForm";
import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import DeleteBookModal from "../components/DeleteBookModal";
import { Link } from "react-router-dom";


// const dummy = [
//   {
//     id: 1,
//     title: "Let's Rock It",
//     author: "Brian D'Cock",
//     genre: "LifeStyle",
//     price: 567.0,
//     availability: true,
//     thumbnail:
//       "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
//   },
//   {
//     id: 2,
//     title: "Let's Rock It",
//     author: "Brian D'Cock",
//     genre: "LifeStyle",
//     price: 567.0,
//     availability: true,
//     thumbnail:
//       "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
//   },
//   {
//     id: 3,
//     title: "Let's Rock It",
//     author: "Brian D'Cock",
//     genre: "LifeStyle",
//     price: 567.0,
//     availability: false,
//     thumbnail:
//       "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
//   },
//   {
//     id: 4,
//     title: "Let's Rock It",
//     author: "Brian D'Cock",
//     genre: "LifeStyle",
//     price: 567.0,
//     availability: true,
//     thumbnail:
//       "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
//   },
//   {
//     id: 5,
//     title: "Let's Rock It",
//     author: "Brian D'Cock",
//     genre: "LifeStyle",
//     price: 567.0,
//     availability: true,
//     thumbnail:
//       "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
//   },
//   {
//     id: 6,
//     title: "Let's Rock It",
//     author: "Brian D'Cock",
//     genre: "LifeStyle",
//     price: 567.0,
//     availability: false,
//     thumbnail:
//       "https://img.freepik.com/free-photo/book-composition-with-open-book_23-2147690555.jpg",
//   },
// ];

const Home = ({ addToCart }) => {
  const [bookData, setBookData] = useState([]);
  const [formType, setFormType] = useState("Add");
  const [targetBook, setTargetBook] = useState();
  const [showBookFormModal, setShowBookFormModal] = useState(false);
  const [showDeleteBookModal, setShowDeleteBookModal] = useState(false);
  const { user } = useSelector((state) => state.user);
  const [selectedBook, setSelectedBook] = useState({});
  const dispatch = useDispatch();

  const showAddBookModalHandler = () => {
    setFormType("Add");
    setShowBookFormModal(!showBookFormModal);
  };

  const showEditBookModalHandler = () => {
    setFormType("Edit");
    setShowBookFormModal(!showBookFormModal);
  };

  const showDeleteBookModalHandler = () => {
    setShowDeleteBookModal(!showDeleteBookModal);
  };

  const getAllBooksOnLoad = async () => {
    try {
      dispatch(showLoading());
      const response = await getAllBooks();
      console.log(response);
      if (response.success) {
        dispatch(hideLoading());
        setBookData(response.data);
      } else {
        dispatch(hideLoading());
        toast.error(response.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err);
    }
  };

  useEffect(() => {
    getAllBooksOnLoad();
  }, []);

  return (
    <div className="py-4 sm:py-8 px-2 lg:px-4">
      {showBookFormModal && (
        <Modal showModalHandler={showAddBookModalHandler}>
          <BookForm
            formType={formType}
            selectedBook={selectedBook}
            setSelectedBook={setSelectedBook}
            getAllBooksOnLoad={getAllBooksOnLoad}
            showAddBookModalHandler={showAddBookModalHandler}
          />
        </Modal>
      )}
      {showDeleteBookModal && (
        <Modal showModalHandler={showDeleteBookModalHandler}>
          <DeleteBookModal
            getAllBooksOnLoad={getAllBooksOnLoad}
            showDeleteBookModalHandler={showDeleteBookModalHandler}
            id={targetBook}
          />
        </Modal>
      )}
      <div className="flex justify-between items-center pb-4">
        <h1 className="text-amber-300 font-bold text-2xl my-0">
          {user && user.isAdmin
            ? "List of books added"
            : "Our latest collection of books"}
        </h1>
        <div className="flex items-center">
          <input
            className="px-3 py-2 bg-white text-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md focus:ring-1 text-md w-80"
            placeholder="Search by book title, author or genre"
          />
          {user && user.isAdmin && (
            <button
              onClick={showAddBookModalHandler}
              className="ml-4 bg-amber-200 flex-shrink-0 text-black py-2 hover:bg-amber-300 active:bg-amber-400 focus:outline-none"
            >
              + Add Book
            </button>
          )}
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20  xl:grid-cols-4">
        <ul
          role="list"
          className="grid gap-x-8 gap-y-4 sm:gap-y-6 xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xl:col-span-4"
        >
          {bookData.length &&
            bookData.map((book) => {
              return (
                <li
                  key={book._id}
                  className="text-center border p-3 rounded-md border-gray-500"
                >
                  <div className="gap-x-6 h-full flex flex-col relative">
                    {user && user.isAdmin && (
                      <span
                        className={`absolute inline-flex items-center rounded-md ${
                          book.availability ? "bg-green-900" : "bg-rose-900"
                        } top-2 left-2 px-2 py-1 text-xs font-medium ring-1 ring-inset ring-blue-700/10`}
                      >
                        {book.availability ? "In Stock" : "Not Available"}
                      </span>
                    )}
                    <Link to={`/book/${book._id}`}>
                      <img
                        className="mx-auto"
                        src={book.thumbnail}
                        alt="Book"
                      />
                    </Link>
                    <div>
                      <h3 className="text-lg mt-3">
                        <Link
                          to={`/book/${book._id}`}
                          className="font-bold tracking-tight leading-7 leading-tight text-white hover:text-blue-400"
                        >
                          {book.title}
                        </Link>
                      </h3>
                      <p className="text-sm leading-6 text-gray-400">
                        by{" "}
                        <span className="font-semibold"> {book.author} </span>
                      </p>
                    </div>
                    <div className="w-full pt-2 flex justify-between mt-auto">
                      <label className="text-white">
                        <span className="font-semibold">
                          Rs. {book.price.toFixed(2)}
                        </span>
                      </label>
                      <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                        {book.genre}
                      </span>
                    </div>
                    {user && user.isAdmin === true ? (
                      <div className="w-full flex gap-2 justify-between items-center">
                        <button
                          onClick={() => {
                            showEditBookModalHandler();
                            setSelectedBook(book);
                          }}
                          className="py-2 px-3 flex-1 flex items-center justify-center gap-2 border-amber-200 block mt-2 hover:bg-amber-300 hover:text-black outline-current"
                        >
                          <AiOutlineEdit /> Edit
                        </button>

                        <button
                          onClick={() => {
                            showDeleteBookModalHandler();
                            setTargetBook(book._id);
                          }}
                          className="py- px-3 flex-1 flex items-center justify-center gap-2 border-red-600 bg-red-600 hover:bg-red-700 hover:border-red-700 block mt-2 outline-current"
                        >
                          <AiOutlineDelete />
                          Delete
                        </button>
                      </div>
                    ) : (
                      <div className="w-full flex justify-between items-center gap-3">
                        <Link
                          to={`/book/${book._id}/showReviewModal`}
                          title="Give Review"
                          className="py-2 block px-3 rounded-lg border border-amber-200 mt-2 text-white hover:bg-amber-300 hover:text-black outline-current"
                        >
                          &#9733;
                        </Link>
                        {book.availability === true ? (
                          <button
                            onClick={() => addToCart(book._id, book.price)}
                            className="py-2 flex-1 border-amber-200 block mt-2 hover:bg-amber-300 hover:text-black outline-current"
                          >
                            Add to Cart
                          </button>
                        ) : (
                          <button
                            className="py-2 flex-1 border-gray-600 bg-gray-600 hover:border-gray-600 block mt-2 outline-current cursor-not-allowed"
                            disabled
                          >
                            Not in Stock
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Home;
