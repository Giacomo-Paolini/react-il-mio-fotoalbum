import { useState, useEffect } from "react";
import axios from "axios";
import Draggable from "react-draggable";

export default function PhotoList() {
  const [photos, setPhotos] = useState([]);

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

  return (
    <div className="w-full min-h-[80dvh] p-4 relative">
      {photos.map((photo, index) => (
        <Draggable key={index}>
          <div
            key={index}
            className="absolute max-w-[450px]"
            style={{
              left: `${Math.floor(Math.random() * 40 + 20)}%`,
              top: `${Math.floor(Math.random() * 20 + 20)}%`,
              transform: "translate(-50%, -50%)",
              zIndex: `${index}`,
            }}
          >
            <div className="relative group">
              <img
                src={`http://localhost:3000/uploads/${photo.image}`}
                className="relative border border-transparent rounded-lg shadow-xl max-w-full h-auto align-middle transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110"
                alt={photo.title}
              />
              <div className="absolute bottom-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <h2 className="text-2xl text-white">{photo.title}</h2>
                <p className="text-white overflow-ellipsis overflow-hidden whitespace-nowrap">
                  {photo.description}
                </p>
                <small className="text-white">
                  {photo.categories.map((category) => category.name).join(", ")}
                </small>
              </div>
            </div>
          </div>
        </Draggable>
      ))}
    </div>
  );
}
