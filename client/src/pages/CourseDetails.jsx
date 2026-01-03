import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContext";
import Swal from "sweetalert2";
import NotFound from "./NotFound";

const CourseDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [course, setCourse] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://study-pilot-server-three.vercel.app/courses/${id}`)
      .then(({ data }) => {
        setCourse(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleEnrolled = () => {
    const enrolledtCourse = {
      courseId: course?._id,
      title: course?.title,
      imageURL: course?.imageURL,
      price: course?.price,
      duration: course?.duration,
      category: course?.category,
      email: user?.email,
    };

    console.log(enrolledtCourse);

    axios
      .post(
        "https://study-pilot-server-three.vercel.app/my-enrolled",
        enrolledtCourse,
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(({ data }) => {
        if (data?.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
            color: "white",
            title: "Course Enrolled Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire({
          icon: "error",
          title: "Failed to Enroll Course",
          text: error.response?.data?.message || error.message,
        });
      });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <LoadingSpinner />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex justify-center items-center py-20">
        <NotFound />
      </div>
    );
  }
  return (
    <div className="min-h-screen py-6 px-4">
      <Helmet>
        <title>Study Pilot - {course.title}</title>
      </Helmet>
      <div className="mb-6 text-center text-md text-base-content/70">
        Learn at your pace. Lifetime access. Certificate on completion.
      </div>
      <div className="max-w-5xl mx-auto shadow-xl rounded-lg overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={course.imageURL}
              alt={course.title}
              loading="lazy"
              className=" w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            />
          </div>
          <div className="lg:w-1/2 p-8 space-y-4">
            <h1 className="text-3xl font-bold text-purple-600">
              {course.title}
            </h1>

            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between text-lg font-semibold">
              <p>
                Featured:{" "}
                <span
                  className={
                    course.isFeatured ? "text-green-500" : "text-red-500"
                  }
                >
                  {course.isFeatured ? "Yes" : "No"}
                </span>
              </p>
              <p>
                Category:{" "}
                <span className="text-green-500">{course.category}</span>
              </p>
            </div>
            <div className="border-t border-purple-600 w-100"></div>
            <p className="text-purple-600 leading-relaxed font-semibold">
              {course.description}
            </p>
            <div className="border-t border-purple-600 w-100"></div>
            <div className="flex gap-4 px-2 items-center justify-between text-lg font-semibold">
              <div className="md:flex md:gap-6">
                <p>
                  Duration:
                  <span className="ml-1 text-green-500">{course.duration}</span>
                </p>
                <p>
                  Price:
                  <span className="ml-1 text-green-500">${course.price}</span>
                </p>
              </div>
              <div>
                {user?.email && (
                  <button onClick={handleEnrolled} className="btn btn-gradient">
                    Enroll Now
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
