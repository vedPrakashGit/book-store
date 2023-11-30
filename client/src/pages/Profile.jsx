import { Link } from "react-router-dom";

const Profile = () => {
  return (
    <>
      <div className="py-4 sm:py-8 px-2 lg:px-4 flex justify-between">
        <h3 className="text-2xl font-bold">Profile</h3>
        <div>
          <Link to="/change-password">Change Password</Link>
        </div>
      </div>
    </>
  );
};

export default Profile;
