import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import LoadingSpinner from "../components/LoadingSpinner";

const IMGBB_API = "https://api.imgbb.com/1/upload";
const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;

const UpdateCourse = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFeatured, setSelectedFeatured] = useState(true);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://study-pilot-server-three.vercel.app/courses/${id}`)
      .then(({ data }) => {
        setCourse(data);
        setSelectedCategory(data?.category || "");
        setSelectedFeatured(Boolean(data?.isFeatured));
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setImageFile(null);
      setPreview("");
      return;
    }
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const uploadToImgbb = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await axios.post(
      `${IMGBB_API}?key=${IMGBB_KEY}`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (e) => {
          if (e.total) setUploadPct(Math.round((e.loaded * 100) / e.total));
        },
      }
    );
    return data?.data?.url || data?.data?.display_url;
  };

  const handleUpdateCourse = async (e) => {
    e.preventDefault();
    if (!course) return;
    const form = e.target;
    const title = form.title.value.trim();
    const pastedURL = form.imageURL.value.trim();
    const price = form.price.valueAsNumber;
    const duration = `${form.duration.value}h`;
    const description = form.description.value.trim();
    const email = course.email;

    try {
      let imageURL = course.imageURL;
      if (imageFile) {
        if (!IMGBB_KEY) {
          Swal.fire(
            "Missing API Key",
            "Set VITE_IMGBB_KEY in your .env",
            "warning"
          );
          return;
        }
        setUploading(true);
        setUploadPct(0);
        imageURL = await uploadToImgbb(imageFile);
      } else if (pastedURL) {
        imageURL = pastedURL;
      }

      const updatedCourse = {
        title,
        imageURL,
        price,
        duration,
        category: selectedCategory,
        description,
        isFeatured: Boolean(selectedFeatured),
        email,
      };

      const { data } = await axios.put(
        `https://study-pilot-server-three.vercel.app/courses/${course._id}`,
        updatedCourse,
        { headers: { "Content-Type": "application/json" } }
      );

      if (data?.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
          color: "white",
          title: "Successfully updated course",
          showConfirmButton: false,
          timer: 1500,
        });
        setCourse((prev) => ({ ...prev, ...updatedCourse }));
        setImageFile(null);
        setPreview("");
      } else {
        Swal.fire("No changes", "Nothing was updated.", "info");
      }
    } catch (err) {
      Swal.fire("Error", err.response?.data?.message || err.message, "error");
    } finally {
      setUploading(false);
      setUploadPct(0);
    }
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
        <p>Course not found.</p>
      </div>
    );
  }

  const durationNumber =
    typeof course.duration === "string"
      ? parseInt(course.duration)
      : Number(course.duration) || 0;

  return (
    <div className="flex justify-center items-center py-2">
      <Helmet>
        <title>Study Pilot - Update Course</title>
      </Helmet>

      <div className="shadow-lg card-surface rounded-xl p-8 max-w-2xl w-full space-y-6">
        <h1 className="text-3xl font-bold text-center section-gradient mb-2">
          Update Your Course
        </h1>
        <p className="text-sm text-center mb-4">
          Update course profile so students choose the right path!
        </p>

        <form onSubmit={handleUpdateCourse} className="space-y-4">
          <div className="form-control">
            <label className="label-text font-semibold">
              Course Title/Name
            </label>
            <input
              defaultValue={course.title}
              name="title"
              type="text"
              placeholder="Enter course title"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="form-control">
            <label className="label-text font-semibold">Current Cover</label>
            <div className="rounded-lg overflow-hidden">
              <img
                className="w-full max-h-64 object-cover"
                src={preview || course.imageURL}
                alt="Current cover"
              />
            </div>

            <label className="label-text font-semibold mt-3">
              Replace with a local file (uploads to imgbb)
            </label>
            <input
              name="imageFile"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
            {uploading && (
              <div className="mt-2 text-sm text-base-content/70">
                Uploading... {uploadPct}%
              </div>
            )}

            <label className="label-text font-semibold mt-3">
              Or paste a new Image URL (optional)
            </label>
            <input
              name="imageURL"
              type="url"
              placeholder="https://imgbb.com/cover.jpg"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="form-control">
            <label className="label-text font-semibold">Price ($)</label>
            <input
              defaultValue={course.price}
              name="price"
              type="number"
              step="0.01"
              min="0"
              placeholder="Enter course price ($)"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="form-control">
            <label className="label-text font-semibold">
              Duration (1-24 hours)
            </label>
            <input
              defaultValue={durationNumber}
              name="duration"
              type="number"
              placeholder="Enter duration (hours)"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              min="1"
              max="24"
              required
            />
          </div>

          <div className="form-control">
            <label className="label-text font-semibold">Category</label>
            <select
              value={selectedCategory}
              name="category"
              className="select select-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setSelectedCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select Category
              </option>
              <option value="Web Development">Web Development</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Web Design">Web Design</option>
              <option value="Security">Security</option>
              <option value="Backend Development">Backend Development</option>
              <option value="Cloud & DevOps">Cloud & DevOps</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label-text font-semibold">Featured Course</label>
            <select
              value={String(selectedFeatured)}
              name="featured"
              className="select select-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              onChange={(e) => setSelectedFeatured(e.target.value === "true")}
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label-text font-semibold">
              Course Description
            </label>
            <textarea
              defaultValue={course.description}
              name="description"
              placeholder="Write a detailed description about your course"
              className="textarea textarea-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              rows={4}
              required
            />
          </div>

          <div className="form-control">
            <label className="label-text font-semibold">User Email</label>
            <input
              name="email"
              type="email"
              defaultValue={course.email}
              readOnly
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md cursor-not-allowed"
            />
          </div>

          <div className="form-control">
            <label className="label-text font-semibold">User Name</label>
            <input
              name="displayName"
              type="text"
              defaultValue={course.displayName}
              readOnly
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md cursor-not-allowed"
            />
          </div>

          <div className="form-control">
            <button
              className="btn btn-gradient w-full py-3 font-semibold transform transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500"
              disabled={uploading}
            >
              {uploading ? `Uploading Image… ${uploadPct}%` : "Submit Course"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCourse;
