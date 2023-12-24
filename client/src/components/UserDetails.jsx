import React from "react";
import { RiUser2Fill } from "react-icons/ri";

const UserDetails = ({ user }) => {
  return (
    <div className="text-center py-10 max-w-lg mx-auto border border-amber-300 px-5 rounded-md mt-10 mb-12 text-white">
      <RiUser2Fill className="text-8xl mx-auto" />
      <h3 className="font-bold text-4xl mt-3 mb-4 border-b-2 border-b-slate-600 pb-3">
        {user && user.name}
      </h3>
      <p className="text-2xl mb-2">Email: {user && user.email}</p>
      <p className="text-2xl">
        User Type: {user && user.isAdmin == true ? "Admin" : "Normal"}
      </p>
    </div>
  );
};

export default UserDetails;
