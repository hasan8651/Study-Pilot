import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router";
import { FaEye, FaTrash } from "react-icons/fa";
import { Helmet } from "react-helmet-async";

const MyEnrolledCourse = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const email = user?.email;

  useEffect(() => {
    if (email) {
      setLoading(true);
      axios
        .get("https://study-pilot-server-three.vercel.app/my-enrolled")
        .then(({ data }) => {
          const filtered = data.filter((course) => course.email === email);
          setCourses(filtered);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setLoading(false));
    }
  }, [email]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
      color: "white",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(
            `https://study-pilot-server-three.vercel.app/my-enrolled/${id}`
          )
          .then(({ data }) => {
            if (data?.deletedCount > 0) {
              setCourses((prev) => prev.filter((course) => course._id !== id));
              Swal.fire({
                position: "top-end",
                background:
                  "linear-gradient(to right, #093371, #6E11B0, #093371)",
                color: "white",
                icon: "success",
                title: "Your enrolled course has been deleted.",
                showConfirmButton: false,
                timer: 1500,
              });
            }
          })
          .catch((err) => {
            Swal.fire(
              "Error",
              err.response?.data?.message || err.message,
              "error"
            );
          });
      }
    });
  };

  return (
    <div className="p-6 w-[90%] mx-auto">
      <Helmet>
        <title>Study Pilot - Enrolled Courses</title>
      </Helmet>
      <h1 className="text-3xl font-bold text-center text-purple-600 mb-2">
        My Enrolled Course(s)
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border-2 border-purple-600 shadow-lg rounded-lg">
            <thead>
              <tr className="section-gradient">
                <th className="border px-4 py-2 text-left border-purple-600 font-semibold">
                  #
                </th>
                <th className="border px-4 py-2 text-left border-purple-600 font-semibold">
                  Image
                </th>
                <th className="border px-4 py-2 text-left border-purple-600 font-semibold">
                  Title
                </th>
                <th className="border px-4 py-2 text-left border-purple-600 font-semibold hidden md:table-cell">
                  Category
                </th>
                <th className="border px-4 py-2 text-center border-purple-600 font-semibold hidden md:table-cell">
                  Duration
                </th>
                <th className="border px-4 py-2 text-center border-purple-600 font-semibold hidden md:table-cell">
                  Price
                </th>
                <th className="border px-4 py-2 text-left border-purple-600 font-semibold">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {courses.map((course, i) => (
                <tr key={course._id}>
                  <td className="border border-purple-600 px-4 py-2">
                    {i + 1}
                  </td>
                  <td className="border border-purple-600 p-1">
                    <img
                      className="w-28 h-15 md:ml-4 rounded-2xl"
                      src={course.imageURL}
                      alt="Cover Image"
                    />
                  </td>
                  <td className="border border-purple-600 px-4 py-2">
                    {course.title}
                  </td>
                  <td className="border border-purple-600 px-4 py-2 hidden md:table-cell">
                    {course.category}
                  </td>
                  <td className="border border-purple-600 px-4 py-2 text-center hidden md:table-cell">
                    {course.duration}
                  </td>
                  <td className="border border-purple-600 px-4 py-2 text-center hidden md:table-cell">
                    {course.price}
                  </td>
                  <td className="border border-purple-600 ">
                    <div className="flex justify-between gap-4 md:gap-0 px-2">
                      <Link
                        to={`/courses/${course.courseId}`}
                        className="btn btn-gradient btn-sm text-xl"
                      >
                        <FaEye />
                      </Link>

                      <button
                        onClick={() => handleDelete(course._id)}
                        className="btn btn-gradient btn-sm text-xl"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {courses.length <= 0 && !loading && (
        <p className="text-red-700 text-3xl text-center font-bold mt-5">
          No enrolled course.
        </p>
      )}
    </div>
  );
};

export default MyEnrolledCourse;
