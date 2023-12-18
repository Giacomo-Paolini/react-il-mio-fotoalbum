import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Show() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/photos/${id}`);
        setData(response.data.data);
        console.log(response.data.data);
      } catch (error) {
        setError(true);
      }
      setLoading(false);
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <h1>Show</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error, try again</p>
      ) : (
        data.map((item) => (
          <div key={item.id}>
            <p>{item.title}</p>
            <p>{item.body}</p>
          </div>
        ))
      )}
    </div>
  );
}
