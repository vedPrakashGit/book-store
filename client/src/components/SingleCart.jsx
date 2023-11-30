import { useEffect, useState } from "react";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { removeCart, updateCart } from "../apicalls/cart";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SingleCart = ({ id, book, userId, getCartItems, qty }) => {
  const [quantity, setQuantity] = useState(qty);
  const dispatch = useDispatch();
  const increaseQty = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQty = () => {
    if (quantity == 1) {
      return;
    }
    setQuantity((prev) => prev - 1);
  };

  const removeFromCart = async (id) => {
    try {
      dispatch(showLoading());
      const response = await removeCart({ cartId: id });
      if (response.success) {
        toast.success(response.message);
        getCartItems();
      } else {
        toast.error(response.message);
      }
      dispatch(hideLoading());
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message);
    }
  };

  useEffect(() => {
    async function updateCartItemData() {
      try {
        dispatch(showLoading());
        const res = await updateCart({
          cartId: id,
          book: book._id,
          user: userId,
          quantity: quantity,
          amount: quantity * book.price,
        });
        if (!res.success) {
          toast.error(res.message);
        }
        dispatch(hideLoading());
      } catch (err) {
        dispatch(hideLoading());
        toast.error(err.message);
      }
    }
    updateCartItemData();
  }, [quantity]);

  return (
    <li className="border p-3 rounded-md border-gray-500">
      <div className="gap-x-6 flex relative">
        <Link to={`/book/${book._id}`}>
          <img src={book.thumbnail} alt="Book" width={150} />
        </Link>
        <div className="flex-1">
          <h3 className="text-xl">
            <Link
              className="font-bold tracking-tight leading-7 leading-tight text-white hover:text-blue-400"
              to={`/book/${book._id}`}
            >
              {book.title}
            </Link>
          </h3>
          <p className="text-sm leading-6 text-gray-400">
            by <span className="font-semibold"> {book.author} </span>
          </p>
          <div className="w-full pt-2 flex justify-between mt-auto">
            <label className="text-white">
              <span className="font-semibold">Rs. {book.price.toFixed(2)}</span>
            </label>
            <span className="inline-flex items-center rounded-md bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10">
              {book.genre}
            </span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between">
            <div>
              <label className="text-white mb-1 block">Choose quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={decreaseQty}
                  className="py-2 border-gray-600 bg-gray-600 hover:border-gray-600"
                >
                  -
                </button>
                <input
                  className="p-1 bg-white text-black border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 rounded-md focus:ring-1 text-center text-md h-10 w-16"
                  value={quantity}
                  onChange={() => {}}
                />
                <button
                  onClick={increaseQty}
                  className="py-2 border-gray-600 bg-gray-600 hover:border-gray-600"
                >
                  +
                </button>
              </div>
            </div>
            {quantity > 1 && (
              <div>
                <label className="text-white mb-1 block text-right border-b-2 pb-2 border-b-slate-600">
                  Subtotal
                </label>
                <h6 className="font-bold text-md pt-1">
                  Rs. {(book.price * quantity).toFixed(2)}
                </h6>
              </div>
            )}
          </div>

          <button
            onClick={() => removeFromCart(id)}
            className="py-2 border-amber-200 block mt-2 hover:bg-amber-300 hover:text-black outline-current"
          >
            Remove from Cart
          </button>
        </div>
      </div>
    </li>
  );
};

export default SingleCart;
