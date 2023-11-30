import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { loginUser } from "../apicalls/users";
import { showLoading, hideLoading } from "../redux/loaderSlice";
import { useDispatch } from "react-redux";

const Login = () => {
  const emailRef = useRef();
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const pwdRef = useRef();
  const [pwd, setPwd] = useState("");
  const [isPwdValid, setIsPwdValid] = useState(true);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    let areFieldsSet = true;
    if (email == "" || email.trim().length == 0) {
      setIsEmailValid(false);
      areFieldsSet = false;
    }
    if (pwd == "" || pwd.trim().length == 0) {
      setIsPwdValid(false);
      areFieldsSet = false;
    }
    if (!areFieldsSet) {
      return;
    }
    const data = {
      email: email,
      password: pwd,
    };

    try {
      const res = await loginUser(data);
      dispatch(showLoading);
      if (res.success) {
        toast.success(res.message);
        localStorage.setItem("token", res.token);
        dispatch(hideLoading);
        emailRef.current.value = "";
        pwdRef.current.value = "";
        window.location.href = "/";
      } else {
        toast.error(res.message);
        dispatch(hideLoading);
      }
    } catch (err) {
      toast.error(err);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="container max-w-lg mt-16 ">
        <ToastContainer />
        <h1 className="text-white text-4xl font-bold text-center mb-4">
          LOGIN
        </h1>
        <form className="p-8 rounded-md border" onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Email Address
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                ref={emailRef}
                type="email"
                name="email"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-3 pl-7 pr-20 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter email address"
              />
            </div>
            {!isEmailValid && !email.length && (
              <span className="text-sm text-red-500">Email is required!</span>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-white"
            >
              Password
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                ref={pwdRef}
                type="password"
                name="password"
                id="password"
                onChange={(e) => setPwd(e.target.value)}
                className="block w-full rounded-md border-0 py-3 pl-7 pr-20 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter the password"
              />
            </div>
            {!isPwdValid && !pwd.length && (
              <span className="text-sm text-red-500">
                Password is required!
              </span>
            )}
          </div>

          <div className="text-center mt-8">
            <button className="py-3 w-6/12 border-amber-200 block mx-auto hover:bg-amber-300 hover:text-black outline-current">
              LOGIN
            </button>
            <p className="text-center text-gray-200 mt-2">
              Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
