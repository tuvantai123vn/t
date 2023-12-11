import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addSession } from "../Redux/Action/ActionSession";
import { useDispatch, useSelector } from "react-redux";
import "./Auth.css";
import queryString from "query-string";
import CartAPI from "../API/CartAPI";
import { useCookies } from "react-cookie";
import UserAPI from "../API/UserAPI";
import { jwtDecode } from "jwt-decode";

function SignIn(props) {
  const listCart = useSelector((state) => state.Cart.listCart);
  const [cookies, setCookie] = useCookies(["accessToken"]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState(false);
  const [emailRegex, setEmailRegex] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [checkPush, setCheckPush] = useState(false);
  const [errorLogin, setErrorLogin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = async () => {
    try {
      setErrorEmail(false);
      setErrorPassword(false);
      setEmailRegex(false);

      if (!email) {
        setErrorEmail(true);
      } else if (!validateEmail(email)) {
        setEmailRegex(true);
      } else if (!password) {
        setErrorPassword(true);
      } else {
        const user = {
          email,
          password,
        };
        const responseData = await UserAPI.postSignin(user);
        const data = responseData.data;

        if (responseData) {
          const decodedToken = jwtDecode(data);

          const action = addSession(decodedToken.userId);
          localStorage.setItem('id_user', decodedToken.userId);
          dispatch(action);
          setCookie("accessToken", data, {maxAge: 7200});
          navigate("/");
          setCheckPush(true);
        } else {
          setErrorLogin(true);
        }
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      // Handle errors and display user-friendly error messages
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (checkPush) {
        for (let i = 0; i < listCart.length; i++) {
          const params = {
            idUser: localStorage.getItem("id_user"),
            idProduct: listCart[i].idProduct,
            count: listCart[i].count,
          };
          const query = "?" + queryString.stringify(params);
          const response = await CartAPI.postAddToCart(query);
        }
        navigate("/");
      }
    };
    fetchData();
  }, [checkPush]);

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
          <span className="login100-form-title p-b-33">Sign In</span>

          <div className="d-flex justify-content-center pb-5">
            {emailRegex && (
              <span className="text-danger">* Incorrect Email Format</span>
            )}
            {errorEmail && (
              <span className="text-danger">* Please Check Your Email</span>
            )}
            {errorPassword && (
              <span className="text-danger">* Please Check Your Password</span>
            )}
            {errorLogin && (
              <span className="text-danger">
                * Please Check Your Email or Password
              </span>
            )}
          </div>

          <div className="wrap-input100 validate-input">
            <input
              className="input100"
              type="text"
              placeholder="Email"
              value={email}
              onChange={onChangeEmail}
            />
          </div>

          <div className="wrap-input100 rs1 validate-input">
            <input
              className="input100"
              type="password"
              placeholder="Password"
              value={password}
              onChange={onChangePassword}
            />
          </div>

          <div className="container-login100-form-btn m-t-20">
            <button className="login100-form-btn" onClick={onSubmit}>
              Sign in
            </button>
          </div>

          <div className="text-center p-t-45 p-b-4">
            <span className="txt1">Create an account?</span>
            &nbsp;
            <Link to="/signup" className="txt2 hov1">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
