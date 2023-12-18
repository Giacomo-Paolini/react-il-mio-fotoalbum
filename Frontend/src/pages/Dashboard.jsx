import { Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const [photos, setPhotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(false);

  function handleChange(event) {
    const value = Number(event.target.value);
    setSelectedCategories((prevState) => ({
      ...prevState,
      [value]: event.target.checked,
    }));
  }

  useEffect(() => {
    axios
      .get("http://localhost:3000/photos")
      .then((res) => {
        console.log("ecco le foto: ", res.data);
        setPhotos(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function openNewPhotoForm() {
    axios.get("http://localhost:3000/categories").then((res) => {
      setCategories(res.data);
    });
    setIsModalOpen(true);
  }

  function closeNewPhotoForm() {
    setIsModalOpen(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    data.set("visible", data.get("visible") === "on");
    data.set(
      "categories",
      Object.keys(selectedCategories).filter((id) => selectedCategories[id])
    );

    axios
      .post("http://localhost:3000/photos", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div className="grid place-items-center">
        <nav className="mb-4">
          <button onClick={openNewPhotoForm}>New Photo</button>
        </nav>
      </div>
      {isModalOpen && (
        <div className="my-modal modal grid place-items-center">
          <div className="modal-content">
            <span className="close" onClick={closeNewPhotoForm}>
              &times;
            </span>
            <form className="w-full max-w-sm" onSubmit={handleSubmit}>
              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="title"
                  >
                    Title
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-400 text-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-purple-500"
                    type="text"
                    name="title"
                    id="title"
                  />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="image"
                  >
                    Image
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-400 text-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-purple-500"
                    name="image"
                    id="image"
                    type="file"
                  />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="description"
                  >
                    Description
                  </label>
                </div>
                <div className="md:w-2/3">
                  <textarea
                    className="bg-gray-400 text-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-purple-500"
                    name="description"
                    id="description"
                  />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="visible"
                  >
                    Visible
                  </label>
                </div>
                <div className="md:w-2/3">
                  <input
                    className="bg-gray-400 appearance-none border-2 border-gray-200 rounded w-25 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                    type="checkbox"
                    name="visible"
                    id="visible"
                  />
                </div>
              </div>

              <div className="md:flex md:items-center mb-6">
                <div className="md:w-1/3">
                  <label
                    className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
                    htmlFor="category"
                  >
                    Category
                  </label>
                </div>
                <div className="md:w-2/3">
                  {categories.map((category, index) => (
                    <div key={index}>
                      <label>
                        <input
                          className="bg-gray-400 appearance-none border-2 border-gray-200 w-25 rounded py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-purple-500"
                          type="checkbox"
                          name="categories"
                          value={category.id}
                          onChange={handleChange}
                          checked={!!selectedCategories[category.id]}
                        />
                        {category.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:flex md:items-center">
                <div className="md:w-1/3"></div>
                <div className="md:w-2/3">
                  <button
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Create
                  </button>
                  <button
                    onClick={closeNewPhotoForm}
                    className="ml-4 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 p-3">
        {photos.map((photo, index) => (
          <div key={index} className="max-w-[450px]">
            <img
              src={`http://localhost:3000/uploads/${photo.image}`}
              className="border border-transparent rounded-lg shadow-xl"
              alt={photo.title}
            />
          </div>
        ))}
      </div>
    </>
  );
}
