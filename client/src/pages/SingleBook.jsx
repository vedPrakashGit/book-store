import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { toast } from "react-toastify";
import { getBookById } from "../apicalls/books";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Rating from "../components/Rating";
import { useSelector } from "react-redux";

const SingleBook = ({ addToCart, cartItems }) => {
  const params = useParams();
  const [book, setBook] = useState("");
  const { user } = useSelector((state) => state.user);
  const [cartQty, setCartQty] = useState([]);

  const getBookData = async () => {
    try {
      showLoading();
      const response = await getBookById(params.id);
      if (response.success) {
        setBook(response.data);
      } else {
        toast.error(response.message);
      }
      hideLoading();
      return;
    } catch (err) {
      hideLoading();
      toast.error(err.message);
    }
  };

  useEffect(() => {
    getBookData();
    let cartItem =
      cartItems && cartItems.filter((item) => item.book._id == params.id);
    console.log(cartItems, cartItem);
    setCartQty(cartItem && cartItem.length > 0 ? cartItem[0].quantity : 0);
  }, []);

  return (
    <div>
      {book && (
        <article className="flex items-start space-x-6 p-10 mt-3">
          <div>
            <img
              src={book.thumbnail}
              alt="Book"
              width="250"
              className="flex-none rounded-md bg-slate-100"
            />
            {user && !user.isAdmin && (
              <div>
                {cartQty > 1 && (
                  <span className="mt-3 mx-auto text-center block rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
                    {cartQty} quantity has been added to the cart!
                  </span>
                )}
                <button
                  onClick={() => {
                    addToCart(book._id, book.price);
                    setCartQty((prev) => prev + 1);
                  }}
                  className="py-2 mt-3 w-full border-amber-200 block mt-2 hover:bg-amber-300 hover:text-black outline-current"
                >
                  Add to Cart
                </button>
                <button className="bg-amber-300 mt-3 text-black w-full py-2 hover:bg-amber-300 active:bg-amber-400 focus:outline-none">
                  Purchase this book
                </button>
              </div>
            )}
          </div>
          <div className="min-w-0 relative flex-auto">
            <h2 className="font-semibold text-4xl text-white pr-20">
              {book.title}
            </h2>
            <dl className="mt-3 flex flex-wrap text-sm leading-6 font-medium items-center">
              <div className="ml-2">
                <dt className="sr-only">Genre</dt>
                <dd className="px-4 py-1 ring-1 ring-slate-200 rounded">
                  {book.genre}
                </dd>
              </div>
              <div>
                <dt className="sr-only">Author</dt>
                <dd className="flex items-center text-lg">
                  <svg
                    width="2"
                    height="2"
                    fill="currentColor"
                    className="mx-3 text-slate-300"
                    aria-hidden="true"
                  >
                    <circle cx="1" cy="1" r="1" />
                  </svg>
                  by&nbsp;<span className="font-semibold">{book.author}</span>
                </dd>
              </div>
              <div>
                <dt className="sr-only">Price</dt>
                <dd className="flex items-center text-lg">
                  <svg
                    width="2"
                    height="2"
                    fill="currentColor"
                    className="mx-3 text-slate-300"
                    aria-hidden="true"
                  >
                    <circle cx="1" cy="1" r="1" />
                  </svg>
                  Rs. {book.price.toFixed(2)}
                </dd>
              </div>
              <div>
                <dt className="sr-only">Stock</dt>
                <dd className="flex items-center">
                  <svg
                    width="2"
                    height="2"
                    fill="currentColor"
                    className="mx-4 text-slate-300"
                    aria-hidden="true"
                  >
                    <circle cx="1" cy="1" r="1" />
                  </svg>
                  <div className="px-4 py-1 ring-1 bg-slate-700 rounded-2xl">
                    {book.availability ? "Available" : "Not in stock"}
                  </div>
                </dd>
              </div>
            </dl>

            <hr className="mt-4" />

            <Rating
              bookId={book._id}
              showReviewModal={params.query == "showReviewModal" ? true : false}
            />

            <Link
              to="/"
              className="py-2 px-6 flex-1 inline-flex items-center justify-center gap-2 border-2 text-amber-200 border-amber-200 mt-2 hover:bg-amber-200 hover:text-black rounded-lg mt-10"
            >
              <AiOutlineArrowLeft />
              Back
            </Link>
          </div>
        </article>
      )}
    </div>
  );
};

export default SingleBook;
