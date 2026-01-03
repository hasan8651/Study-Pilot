import axios from "axios";
import { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";
import CourseCard from "./CourseCard";
import { Helmet } from "react-helmet-async";

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get("https://study-pilot-server-three.vercel.app/courses")
      .then(({ data }) => {
        setCourses(data);
        setFilteredCourses(data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const handleFilter = (category) => {
    setCategoryFilter(category);
    if (category === "") {
      setFilteredCourses(courses);
    } else {
      const filtered = courses.filter((course) => course.category === category);
      setFilteredCourses(filtered);
    }
  };

  const categories = [...new Set(courses.map((course) => course.category))];

  return (
    <div>
      <Helmet>
              <title>Study Pilot - Courses</title>
            </Helmet>
      <div className="mb-4 section-gradient flex items-center justify-center py-2">
        <select
          className="select select-bordered w-full max-w-xs bg-transparent"
          value={categoryFilter}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option className="section-gradient rounded-md" value="">
            All Category
          </option>
          {categories.map((category, i) => (
            <option className="section-gradient rounded-md my-1" key={i} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredCourses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllCourses;
