import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import RatingModal from "./RatingModal";
import { toast } from "react-toastify";
import { hideLoading, showLoading } from "../redux/loaderSlice";
import { getRatings } from "../apicalls/rating";
import moment from "moment";
import { AiFillLike } from "react-icons/ai";
import { useDispatch } from "react-redux";

const Rating = ({ bookId, showReviewModal }) => {
  const [showRatingModel, setShowRatingModal] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [overallRating, setOverallRating] = useState(null);
  const [recommends, setRecommends] = useState(null);
  const dispatch = useDispatch();
  const ratingModelHandler = () => {
    setShowRatingModal(!showRatingModel);
  };

  // console.log(showReviewModal);

  const getRatingsData = async () => {
    try {
      dispatch(showLoading());
      const response = await getRatings({ bookId: bookId });
      if (response.success) {
        setRatings(response.data);
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
    if (showReviewModal) {
      setShowRatingModal(true);
    }
  }, [showReviewModal]);

  useEffect(() => {
    getRatingsData();
  }, []);

  useEffect(() => {
    if (ratings.length) {
      let rate = 0,
        recommend = 0;
      ratings.forEach((rating) => {
        rate += rating.rating;
        rating.willRecommend ? recommend++ : recommend;
      });
      setOverallRating((rate / ratings.length).toFixed(2));
      setRecommends(recommend);
    }
  }, [ratings]);

  return (
    <div>
      {showRatingModel && (
        <Modal showModalHandler={ratingModelHandler}>
          <RatingModal
            bookId={bookId}
            showModalHandler={ratingModelHandler}
            getRatingsData={getRatingsData}
          />
        </Modal>
      )}

      <div>
        <div className="flex justify-between items-center mt-5">
          <div>
            <h2 className="text-2xl font-semibold text-amber-200">
              Ratings & Reviews
            </h2>
            {overallRating && (
              <label className="yellow text-2xl flex items-center">
                &#9733;{" "}
                <span className="ml-1 text-lg text-white">
                  Overall Rating: {overallRating}
                </span>
              </label>
            )}
            {recommends && recommends > 0 ? (
              <label className="flex items-center">
                <AiFillLike className="text-amber-200 text-xl inline mr-2" />{" "}
                {recommends} out of {ratings.length} reader(s) would like to
                recommend this book.
              </label>
            ) : (
              ""
            )}
          </div>
          <button
            onClick={ratingModelHandler}
            className="bg-amber-200 text-black py-2 hover:bg-amber-300 active:bg-amber-400 focus:outline-none"
          >
            + Add Your Review
          </button>
        </div>
      </div>

      {ratings && ratings.length == 0 && (
        <div className="p-6 my-8 border rounded text-center">
          <p className="text-xl font-semibold">
            There are no ratings and reviews for this book.
            <br />
          </p>
          <p className="text-md pt-2">
            Click the "Add Your Review" button above to post your review for
            this book.
          </p>
        </div>
      )}

      {ratings && (
        <div className="ratings-wrapper pt-5">
          {ratings.map((rating) => {
            return (
              <div
                key={rating._id}
                className="pt-6 md:p-6 text-center md:text-left space-y-4 bg-slate-900 rounded-md mb-4"
              >
                <div className="start-container inline-flex">
                  {[1, 2, 3, 4, 5].map((star) =>
                    star <= rating.rating ? (
                      <div
                        key={`${rating._id}${star}`}
                        className="yellow text-2xl"
                      >
                        &#9733;
                      </div>
                    ) : (
                      <div
                        key={`${rating._id}${star}`}
                        className="text-gray-500 text-2xl"
                      >
                        &#9733;
                      </div>
                    )
                  )}
                </div>
                <blockquote className="mt-0-imp pt-0">
                  <h6 className="text-lg font-semibold mt-0 mb-2">
                    {rating.title}
                  </h6>
                  <p className="text-md">{`"${rating.review}"`}</p>
                </blockquote>
                <figcaption className="font-medium mt-1">
                  <div className="text-slate-700 dark:text-slate-500">
                    Reviewed by{" "}
                    <span className="text-sky-500 dark:text-sky-400">
                      {rating.user.name}
                    </span>{" "}
                    on {moment(rating.createdAt).format("MMM Do YYYY")}
                  </div>
                </figcaption>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Rating;
