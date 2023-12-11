import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";

function Name() {
  const [userName, setUserName] = useState("");
  const cookies = new Cookies();
  

  useEffect(() => {

    const cookie = cookies.get("accessToken");
      if (cookie) {
      const decodedToken = jwtDecode(cookie);
      const {name} = decodedToken;
      console.log(decodedToken);

      setUserName(name);
    }
  }, []);

  return (
    <li className="nav-item dropdown">
      <a
        className="nav-link dropdown-toggle"
        style={{ cursor: "pointer" }}
        id="pagesDropdown"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className="fas fa-user-alt mr-1 text-gray"></i>
        {userName}
      </a>
      <div className="dropdown-menu mt-3" aria-labelledby="pagesDropdown">
        <Link
          className="dropdown-item border-0 transition-link"
          to={"/history"}
        >
          History
        </Link>
      </div>
    </li>
  );
}

export default Name;
