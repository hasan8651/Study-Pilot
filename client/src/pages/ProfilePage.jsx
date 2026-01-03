import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Helmet } from "react-helmet-async";
import Swal from "sweetalert2";

const ProfilePage = () => {
  const { user, updateProfileFunction } = useContext(AuthContext);
  const [displayName, setDisplayName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(
    user?.photoURL || "https://img.icons8.com/windows/64/user.png"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfileFunction({
        displayName,
        photoURL,
      });
      Swal.fire({
        position: "top-end",
        background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
        color: "white",
        icon: "success",
        title: "Profile updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        position: "top-end",
        background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
        color: "white",
        icon: "error",
        title: `Error updating profile: ${error.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 p-4 card-surface rounded-lg shadow-lg">
      <Helmet>
        <title>Study Pilot - {user?.displayName}</title>
      </Helmet>
      <h2 className=" text-2xl section-gradient font-semibold mb-4 text-center">
        My Profile
      </h2>
      <div className="flex flex-col items-center mb-6">
        <img
          src={photoURL || "https://img.icons8.com/windows/64/user.png"}
          alt="user photo"
          className="w-50 h-50 rounded-full border border-gray-300 mb-2 object-cover"
        />
        <p className="text-lg font-medium">{user?.displayName}</p>
        <p className="text-lg font-medium">{user?.email}</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter new display name"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Photo URL</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Enter new photo URL"
          />
        </div>
        <button
          type="submit"
          className="btn btn-gradient w-full py-2 rounded transition"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default ProfilePage;
