import React, { useState, useRef } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Link } from "react-router-dom";
import { changePassword } from "../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/loaderSlice";

const ChangePassword = () => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const curPwdRef = useRef();
  const newPwdRef = useRef();
  const conNewPwdRef = useRef();

  const [curPwd, setCurPwd] = useState("");
  const [newPwd, setNewPwd] = useState("");
  const [conNewPwd, setConNewPwd] = useState("");

  const [isCurPwdValid, setIsCurPwdVAlid] = useState(true);
  const [isNewPwdValid, setIsNewPwdVAlid] = useState(true);
  const [isConNewPwdValid, setIsConNewPwdVAlid] = useState(true);

  const submitHandler = async (e) => {
    e.preventDefault();
    let areFieldsSet = true;
    if (curPwd === "" || curPwd.trim().length == 0) {
      setIsCurPwdVAlid(false);
      areFieldsSet = false;
    }
    if (newPwd === "" || newPwd.trim().length == 0) {
      setIsNewPwdVAlid(false);
      areFieldsSet = false;
    }
    if (conNewPwd === "" || conNewPwd.trim().length == 0) {
      setIsConNewPwdVAlid(false);
      areFieldsSet = false;
    }

    if (newPwd != conNewPwd) {
      toast.error("Password must be same!");
      areFieldsSet = false;
    }

    if (!areFieldsSet) {
      return;
    }

    try {
      let response = await changePassword({
        email: user.email,
        currentPassword: curPwd,
        newPassword: newPwd,
      });
      dispatch(showLoading());
      if (response.success) {
        dispatch(hideLoading());
        toast.success(response.message);
        curPwdRef.current.value = "";
        newPwdRef.current.value = "";
        conNewPwdRef.current.value = "";
      } else {
        dispatch(hideLoading());
        toast.error(response.message);
      }
    } catch (err) {
      dispatch(hideLoading());
      toast.error(err.message);
    }
  };

  return (
    <>
      <div className="container max-w-lg mt-12 ">
        <ToastContainer />
        <h1 className="text-white text-4xl font-bold text-center mb-4">
          Change your password
        </h1>
        <p className="text-center mb-3">
          Fill the following input fields to do the same
        </p>
        <form className="p-8 rounded-md border" onSubmit={submitHandler}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Current Password
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                ref={curPwdRef}
                type="password"
                name="currentPassword"
                id="currentPassword"
                onChange={(e) => setCurPwd(e.target.value)}
                className="block w-full rounded-md border-0 py-3 pl-7 pr-20 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter email address"
              />
            </div>
            {!isCurPwdValid && !curPwd.length && (
              <span className="text-sm text-red-500">
                Current Password is required!
              </span>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-white"
            >
              New Password
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                ref={newPwdRef}
                type="password"
                name="newPassword"
                id="newPassword"
                onChange={(e) => setNewPwd(e.target.value)}
                className="block w-full rounded-md border-0 py-3 pl-7 pr-20 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter the password"
              />
            </div>
            {!isNewPwdValid && !newPwd.length && (
              <span className="text-sm text-red-500">
                New Password is required!
              </span>
            )}
          </div>
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-white"
            >
              Confirm New Password
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <input
                ref={conNewPwdRef}
                type="password"
                name="confirmNewPassword"
                id="confirmNewPassword"
                onChange={(e) => setConNewPwd(e.target.value)}
                className="block w-full rounded-md border-0 py-3 pl-7 pr-20 text-white ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Enter the password"
              />
            </div>
            {!isConNewPwdValid && !conNewPwd.length && (
              <span className="text-sm text-red-500">
                Confirming New Password is necessary!
              </span>
            )}
          </div>

          <div className="text-center mt-8">
            <button className="py-3 w-6/12 border-amber-200 block mx-auto hover:bg-amber-300 hover:text-black outline-current">
              CHANGE PASSWORD
            </button>
            <p className="text-center text-gray-200 mt-2">
              Back to <Link to="/">Home</Link>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default ChangePassword;
