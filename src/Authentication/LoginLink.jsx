import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
import { deleteSession } from "../Redux/Action/ActionSession";

function LoginLink(props) {
  const cookies = new Cookies();
  const cookie = cookies.get("accessToken");
  const dispatch = useDispatch();

  const onRedirect = () => {
    axios
      .post("https://asm3-be-4qtm.onrender.com/auth/logout", { cookie })
      .then((response) => {
        cookies.remove("accessToken");
        sessionStorage.clear();
        localStorage.clear();
        const action = deleteSession("");
        dispatch(action);

        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <li className="nav-item" onClick={onRedirect}>
      <Link className="nav-link" to="/signin">
        ( Logout )
      </Link>
    </li>
  );
}

export default LoginLink;
