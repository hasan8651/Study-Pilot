import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";

const IMGBB_API = "https://api.imgbb.com/1/upload";
const IMGBB_KEY = import.meta.env.VITE_IMGBB_KEY;

const AddCourse = () => {
  const { user } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedFeatured, setSelectedFeatured] = useState(true);

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadPct, setUploadPct] = useState(0);

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
    // imgbb returns both url and display_url
    return data?.data?.url || data?.data?.display_url;
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    const form = e.target;
    const title = form.title.value.trim();
    const fallbackURL = form.imageURL.value.trim(); // optional fallback
    const price = form.price.valueAsNumber;
    const duration = `${form.duration.value}h`;
    const description = form.description.value.trim();
    const email = form.email.value;
    const displayName = form.displayName.value;

    try {
      // 1) Upload local image if provided, else use fallback URL
      let imageURL = fallbackURL;
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
      }

      if (!imageURL) {
        Swal.fire(
          "Image required",
          "Choose a file or provide an image URL.",
          "info"
        );
        return;
      }
      if (!title || !selectedCategory || !price || !form.duration.value) {
        Swal.fire("Missing fields", "Please fill all required fields.", "info");
        return;
      }

      // 2) Submit course with the uploaded image URL
      const newCourse = {
        title,
        imageURL,
        price,
        duration,
        category: selectedCategory,
        description,
        isFeatured: Boolean(selectedFeatured),
        email,
        displayName,
      };

      const { data } = await axios.post(
        "https://study-pilot-server-three.vercel.app/courses",
        newCourse,
        { headers: { "Content-Type": "application/json" } }
      );

      if (data?.insertedId) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          background: "linear-gradient(to right, #093371, #6E11B0, #093371)",
          color: "white",
          title: "Course Added Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        form.reset();
        setSelectedCategory("");
        setSelectedFeatured(true);
        setImageFile(null);
        setPreview("");
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Failed to Add Course",
        text: error.response?.data?.message || error.message,
      });
    } finally {
      setUploading(false);
      setUploadPct(0);
    }
  };

  return (
    <div className="flex justify-center items-center py-2">
      <Helmet>
        <title>Study Pilot - Add Course</title>
      </Helmet>

      <div className="shadow-lg card-surface rounded-xl p-8 max-w-2xl w-full space-y-6">
        <h1 className="text-3xl section-gradient font-bold text-center mb-2">
          Add Your Course
        </h1>
        <p className="text-sm text-center mb-4">
          Add a clear, complete course profile so students choose the right
          path!
        </p>

        <form onSubmit={handleAddCourse} className="space-y-4">
          <div className="form-control">
            <label className="label-text font-semibold">
              Course Title/Name
            </label>
            <input
              name="title"
              type="text"
              placeholder="Enter course title"
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>

          <div className="form-control">
            <label className="label-text font-semibold">
              Course Cover Image (upload from device)
            </label>
            <input
              name="image"
              type="file"
              accept="image/png, image/jpeg, image/webp"
              onChange={handleFileChange}
              className="file-input file-input-bordered w-full"
            />
            {preview && (
              <div className="mt-3">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full max-h-64 object-cover rounded-lg"
                />
                {uploading && (
                  <div className="mt-2 text-sm text-base-content/70">
                    Uploading... {uploadPct}%
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="form-control">
            <label className="label-text font-semibold">
              Or paste an Image URL (optional)
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
              name="category"
              className="select select-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={selectedCategory}
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
              name="featured"
              className="select select-bordered w-full px-4 py-3 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary"
              value={String(selectedFeatured)}
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
              value={user?.email || ""}
              readOnly
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md cursor-not-allowed"
            />
          </div>

          <div className="form-control">
            <label className="label-text font-semibold">User Name</label>
            <input
              name="displayName"
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="input input-bordered w-full px-4 py-3 rounded-md shadow-md cursor-not-allowed"
            />
          </div>

          <div className="form-control">
            <button
              className="btn section-gradient w-full py-3 font-semibold transform transition-all hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-500"
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

export default AddCourse;
