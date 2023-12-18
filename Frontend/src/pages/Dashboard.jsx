import { Link, Navigate, redirect } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [photos, setPhotos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(false);

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
      JSON.stringify(
        Object.keys(selectedCategories)
          .filter((id) => selectedCategories[id])
          .map((id) => Number(id))
      )
    );

    axios
      .post("http://localhost:3000/photos", data)
      .then((response) => {
        console.log(response);
        alert("Image successfully uploaded!");
        event.target.reset();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function deletePhoto(id) {
    axios
      .delete(`http://localhost:3000/photos/${id}`)
      .then((response) => {
        console.log(response);
        alert("Image successfully deleted!");
        redirect("/dashboard/");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function showPhoto(id) {
    axios
      .get(`http://localhost:3000/photos/${id}`)
      .then((response) => {
        setSelectedPhoto(response.data);
        navigate(`/dashboard/show/${id}`);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <>
      <div className="grid place-items-center">
        <nav className="mb-4">
          <button onClick={openNewPhotoForm}>NEW PHOTO</button>
        </nav>
      </div>
      {isModalOpen && (
        <div className="my-modal modal grid place-items-center">
          <div className="modal-content">
            <button>
              <span className="close text-4xl" onClick={closeNewPhotoForm}>
                &times;
              </span>
            </button>
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
                    className="bg-gray-400 text-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-orange-500"
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
                    className="bg-gray-400 text-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-orange-500"
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
                    className="bg-gray-400 text-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-orange-500"
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
                    className="bg-gray-400 text-white appearance-none border-2 border-gray-200 rounded w-25 py-2 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-orange-500"
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
                          className="bg-gray-400 me-3 text-white appearance-none border-2 border-gray-200 rounded w-[10px] h-[10px] py-2 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-orange-500"
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
                    className="shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="submit"
                  >
                    Create
                  </button>
                  <button
                    onClick={closeNewPhotoForm}
                    className="ml-4 shadow border hover:bg-orange-500 hover:text-white focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded"
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
          <div
            key={index}
            className="flex items-center justify-center max-w-[450px] mx-auto"
          >
            <div className="relative group">
              <img
                src={`http://localhost:3000/uploads/${photo.image}`}
                className="border border-transparent rounded-lg shadow-xl"
                alt={photo.title}
              />
              <div>
                <button
                  onClick={() => showPhoto(photo.id)}
                  className="text-2xl absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <ion-icon
                    className="mix-blend"
                    name="create-outline"
                  ></ion-icon>{" "}
                </button>
              </div>
              <div>
                <button
                  onClick={() => deletePhoto(photo.id)}
                  className="text-2xl absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                >
                  <ion-icon
                    className="mix-blend text-white"
                    name="trash-outline"
                  ></ion-icon>
                </button>
              </div>
              <div className="p-4 absolute bottom-0">
                <h2 className="mix-blend text-2xl text-white">{photo.title}</h2>
                <p className="mix-blend text-white overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {photo.description}
                </p>
                <small className="text-white mix-blend">
                  {photo.categories.map((category) => category.name).join(", ")}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
