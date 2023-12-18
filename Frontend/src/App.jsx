import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./base/Layout";
import PrivateRoute from "./middlewares/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { AuthProvider } from "./contexts/authContext";
import Show from "./pages/Show";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/dashboard/*"
              element={<PrivateRoute path="/" element={<Dashboard />} />}
            >
              <Route path="show/:id" element={<Show />} />
            </Route>
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
