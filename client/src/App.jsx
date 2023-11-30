import "./App.css";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import "react-toastify/dist/ReactToastify.css";
import ChangePassword from "./pages/ChangePassword";
import SingleBook from "./pages/SingleBook";
import Cart from "./pages/Cart";
import { useSelector } from "react-redux";
import { getCart, createCart, updateCart } from "./apicalls/cart";
import { toast } from "react-toastify";
import { showLoading, hideLoading } from "./redux/loaderSlice";

function App() {
  const { user } = useSelector((state) => state.user);
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = async () => {
    try {
      showLoading();
      const response = await getCart({ userId: user._id });
      if (response.success) {
        setCartItems(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      hideLoading();
      toast.error(err.message);
    }
  };

  const addToCart = async (bookId, price) => {
    try {
      showLoading();
      let idExists = false;
      let response = null;
      let existingQuantity = 0;
      let cartId = null;
      cartItems.forEach((item) => {
        if (item.book._id == bookId) {
          cartId = item._id;
          idExists = true;
          existingQuantity = item.quantity;
        }
      });

      if (idExists) {
        response = await updateCart({
          cartId: cartId,
          book: bookId,
          user: user._id,
          quantity: existingQuantity + 1,
          amount: (existingQuantity + 1) * price,
        });
      } else {
        response = await createCart({
          book: bookId,
          user: user._id,
          amount: price,
        });
      }
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      hideLoading();
    } catch (err) {
      hideLoading();
      toast.error(err);
    }
  };

  useEffect(() => {
    if (user) {
      getCartItems();
    }
  }, [user, cartItems]);

  return (
    <BrowserRouter>
      <Navbar cartItems={cartItems} />
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home addToCart={addToCart} />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/change-password"
          element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book/:id"
          element={
            <ProtectedRoute>
              <SingleBook addToCart={addToCart} cartItems={cartItems} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/book/:id/:query"
          element={
            <ProtectedRoute>
              <SingleBook addToCart={addToCart} cartItems={cartItems} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute>
              <Cart cartItems={cartItems} getCartItems={getCartItems} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
