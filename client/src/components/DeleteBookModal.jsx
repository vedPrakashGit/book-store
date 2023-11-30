import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { deleteBook } from "../apicalls/books";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { toast } from "react-toastify";

const DeleteBookModal = ({
  getAllBooksOnLoad,
  showDeleteBookModalHandler,
  id,
}) => {
  const deleteBookHandler = async () => {
    try {
      showLoading();
      const res = await deleteBook({ bookId: id });
      if (res.success) {
        toast.success(res.message);
        getAllBooksOnLoad();
        showDeleteBookModalHandler();
      } else {
        toast.error(res.message);
      }
      hideLoading();
    } catch (err) {
      toast.error(err.message);
    }
  };

  console.log(id);

  return (
    <div className="px-4">
      <div className="flex justify-end text-black">
        <AiOutlineClose
          className="cursor-pointer"
          onClick={showDeleteBookModalHandler}
        />
      </div>
      <h3 className="mt-8 text-black font-bold text-center text-xl">
        Are you sure you want to delete this book from the list?
      </h3>
      <p className="text-black text-sm text-center">
        This action can't be undone! You will have to add all the details again
        to add this book.
      </p>

      <div className="modal-footer flex gap-3 pt-2 mt-4">
        <button
          type="button"
          onClick={showDeleteBookModalHandler}
          className="py-2 flex-1 border-gray-400 block mt-2 bg-transparent text-black hover:bg-gray-100 hover:text-black outline-current"
        >
          Cancel
        </button>
        <button
          onClick={deleteBookHandler}
          className="py-2 flex-1 border-amber-200 block mt-2 hover:bg-amber-300 hover:text-black outline-current"
        >
          Delete Book
        </button>
      </div>
    </div>
  );
};

export default DeleteBookModal;
