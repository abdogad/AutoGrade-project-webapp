import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import apis from "../../apis/apis";
import SpinnerLoader from "./SpinnerLoader";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";

function PrivateRoutes() {
  const [isLogged, setIsLogged] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    apis
      .isLogged()
      .then((res) => {
        if (res.status === 200) {

          setIsLogged(true);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <SpinnerLoader />
  ) : isLogged ? (
    <>
      <Navbar />
        <Outlet />
      <Footer />
    </>
  ) : (
    <Navigate to="/" />
  );
}

export default PrivateRoutes;
