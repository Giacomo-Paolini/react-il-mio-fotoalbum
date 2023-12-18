import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/useAuth";
import { Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  function handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const formObject = Array.from(data.entries()).reduce(
      (obj, [key, value]) => {
        obj[key] = value;
        return obj;
      },
      {}
    );

    axios
      .post("http://localhost:3000/login", formObject)
      .then((response) => {
        console.log(response);
        localStorage.setItem("token", response.data.token);
        login();
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="p-4 grid place-items-center">
      <form className="w-full max-w-sm" onSubmit={handleSubmit}>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="email"
            >
              Email
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-400 text-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-orange-500"
              type="email"
              name="email"
              id="email"
            />
          </div>
        </div>

        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/3">
            <label
              className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="md:w-2/3">
            <input
              className="bg-gray-400 text-white appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 leading-tight focus:outline-none focus:bg-gray-700 focus:border-orange-500"
              type="password"
              name="password"
              id="password"
            />
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-orange-500 hover:bg-orange-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Login
            </button>
            <Link to="/register">
              <button className="ml-4 shadow border hover:bg-orange-500 hover:text-white focus:shadow-outline focus:outline-none font-bold py-2 px-4 rounded">
                Register
              </button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
