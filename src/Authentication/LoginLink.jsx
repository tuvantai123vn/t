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
      .post("http://localhost:5001/auth/logout", { cookie })
      .then((response) => {
        cookies.remove("accessToken");
        console.log("logout");
        console.log(cookie);
        const action = deleteSession("");
        dispatch(action);
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
