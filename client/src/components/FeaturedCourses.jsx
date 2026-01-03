import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import CourseCard from "./CourseCard";

const FeaturedCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    setLoading(true);
    axios("https://study-pilot-server-three.vercel.app/popular-courses")
      .then((data) => setCourses(data.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="py-14">
      <h1 className="text-2xl md:text-3xl py-4 mb-2 section-gradient font-semibold text-center">
        Popular Courses
      </h1>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FeaturedCourses;
