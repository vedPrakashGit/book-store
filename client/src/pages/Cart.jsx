import SingleCart from "../components/SingleCart";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Cart = ({ cartItems, getCartItems }) => {
  const { user } = useSelector((state) => state.user);
  const [totalQty, setTotalQty] = useState();
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    let tempPrice = 0;
    let tempQty = 0;
    cartItems.forEach((item) => {
      tempPrice = tempPrice + item.quantity * item.book.price;
      tempQty = tempQty + item.quantity;
    });
    console.log(tempPrice);
    setTotalPrice(tempPrice);
    setTotalQty(tempQty);
  }, [cartItems]);

  return (
    <div className="py-4 sm:py-8 px-2 lg:px-4">
      <h1 className="text-amber-300 font-bold text-2xl my-0">
        Your Shopping Cart
      </h1>
      {cartItems && cartItems.length == 0 && (
        <div className="p-6 my-8 border rounded text-center w-3/5 mx-auto">
          <p className="text-xl font-semibold">
            There is no item to display in your cart!
            <br />
          </p>
          <p className="text-md pt-2">
            Add your favorite books to your cart now!
          </p>
          <Link
            className="py-3 inline-block px-8 mt-8 rounded-lg border border-amber-200 mt-2 text-white hover:bg-amber-300 hover:text-black outline-current"
            to="/"
          >
            Go Back to Homepage
          </Link>
        </div>
      )}
      <div className="mx-auto pt-4 grid max-w-7xl gap-x-8 gap-y-20  xl:grid-cols-4">
        <ul className="grid gap-x-8 gap-y-4 sm:gap-y-6 xl:grid-cols-2 md:grid-cols-3 sm:grid-cols-2 xl:col-span-4">
          {cartItems &&
            cartItems.map((item) => (
              <SingleCart
                key={item._id}
                id={item._id}
                userId={user && user._id}
                book={item.book}
                qty={item.quantity}
                getCartItems={getCartItems}
              />
            ))}
        </ul>
      </div>
      <div className="border border-t-2 border-t-gray-900 w-full mt-8"></div>
      <div className="flex justify-between pt-3">
        <div>
          <label className="text-white text-lg">Total Items</label>
          <p className="text-amber-300 text-2xl font-semibold">
            {cartItems.length}
          </p>
        </div>
        <div>
          <label className="text-white text-lg">Total Quantity</label>
          <p className="text-amber-300 text-2xl font-semibold">{totalQty}</p>
        </div>
        <div>
          <label className="text-white text-lg">Total Price</label>
          <p className="text-amber-300 text-2xl font-semibold">
            Rs. {totalPrice.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Cart;
