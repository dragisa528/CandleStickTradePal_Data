import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Button, message, Space } from "antd";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { useSelector, useDispatch } from 'react-redux'
import {
  InputAuth, InputUsername, InputEmail,
  InputUserId, InputLevel, InputFirstName, InputLastname, InputAperiod
} from '../../reducers/InputSlice'



const eye = <FontAwesomeIcon icon={faEye} />;

const Login = () => {

  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();
  const [redirect, setRedirect] = useState(false);
  const [eMail, setEmail] = useState("");
  const [pAss, setPass] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const ShowPass = () => {
    setPasswordShown(!passwordShown);
  };
  const HandleChange = (p1, p2) => {
    if (p1 === 1) {
      setEmail(p2);
    } else if (p1 === 2) setPass(p2);
  };
  const Login = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!eMail || eMail === "" || eMail === undefined) {
      message.warning("Invaild email")
    } else if (!pAss || pAss === undefined) {
      message.warning("Invalid password")
    } else if (!emailRegex.test(eMail)) {
      var arr = {
        username: eMail,
        eMail: "",
        pAss: pAss
      }
      axios.post("/api/users/login", arr).then((res) => {
        if (res.data === "User Not Found") {
          message.warning(res.data)
        } else if (res.data === "Password Dont Matched") {
          message.warning(res.data)
        } else if (res.data === "Your period is finished. Please register again") {
          message.warning(res.data)
        }
        else {
          console.log(res.data);
          // dispatch(InputAuth(2));
          // dispatch(InputUsername(res.data.username));
          // dispatch(InputEmail(res.data.email));
          // dispatch(InputUserId(res.data.userId));
          // dispatch(InputLevel(res.data.level));
          // dispatch(InputFirstName(res.data.firstName));
          // dispatch(InputLastname(res.data.lastname));
          localStorage.setItem("level", res.data.level);
          localStorage.setItem("Auth", 2);
          localStorage.setItem("Username", res.data.username);
          localStorage.setItem("Password", res.data.password);
          console.log(localStorage.getItem("Password"))
          localStorage.setItem("Email", res.data.email);
          localStorage.setItem("UserId", res.data.userId);
          localStorage.setItem("FirstName", res.data.firstName);
          localStorage.setItem("Lastname", res.data.lastname);
          setRedirect(true);
          message.config({
            top: "60px",
            duration: 2
          })
          message.success("Successfully login");
        }

      });
    }
    else if (eMail || pAss) {
      var arr = {
        username: "",
        email: eMail,
        pAss: pAss
      }
      console.log(arr);
      axios.post("/api/users/login", arr).then((res) => {
        console.log(res);
        if (res.data === "User Not Found") {
          message.warning(res.data)
        } else if (res.data === "Password Dont Matched") {
          message.warning("Your account or password is incorrect.If you don't remember your password, Forgot Password now")
        }
        else if (res.data === "Your period is finished. Please register again") {
          message.warning(res.data)
        }
        else {
          console.log(res.data);
          // dispatch(InputAuth(2));
          // dispatch(InputUsername(res.data.username));
          // dispatch(InputEmail(res.data.email));
          // dispatch(InputUserId(res.data.userId));
          // dispatch(InputLevel(res.data.level));
          // dispatch(InputFirstName(res.data.firstName));
          // dispatch(InputLastname(res.data.lastname));
          localStorage.setItem("level", res.data.level);
          localStorage.setItem("Auth", 2);
          localStorage.setItem("Username", res.data.username);
          localStorage.setItem("Email", res.data.email);
          localStorage.setItem("Password", res.data.password);
          console.log(localStorage.getItem("Password"))
          localStorage.setItem("UserId", res.data.userId);
          localStorage.setItem("FirstName", res.data.firstName);
          localStorage.setItem("Lastname", res.data.lastname);
          setRedirect(true);
          message.config({
            top: "60px",
            duration: 2
          })
          message.success("Successfully login");
        }

      });
    }
  };
  if (redirect) {
    return <Redirect to="/intro" />;
  }
  return (
    <div>
      <div className="d-flex align-items-center auth px-0">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div
              className="card text-left py-5 px-5 px-sm-5"
              style={{ backgroundColor: "#1a1a34" }}
            >
              <h4 className="mb-4">Hello! let's get started</h4>
              <h6 className="font-weight-light mb-4">Sign in to continue.</h6>
              <div className="row">
                <div className="form-group col-12">
                  <input
                    type="email"
                    value={eMail}
                    style={{
                      color: "white",
                      backgroundColor: "rgb(26, 26, 52)",
                    }}
                    className="form-control form-control-lg"
                    placeholder="Email or username"
                    onChange={(event) => HandleChange(1, event.target.value)}
                  />
                </div>
              </div>
              <div className="row">
                <div className="form-group col-12">
                  <div
                    className="input-group"
                    style={{ backgroundColor: "rgb(26, 26, 52)" }}
                  >
                    {passwordShown ? (
                      <input
                        type="text"
                        value={pAss}
                        style={{
                          color: "white",
                          backgroundColor: "rgb(26, 26, 52)",
                        }}
                        className="form-control form-control-lg"
                        onChange={(event) =>
                          HandleChange(2, event.target.value)
                        }
                        placeholder="Password"
                      />
                    ) : (
                      <input
                        type="password"
                        value={pAss}
                        style={{
                          color: "white",
                          backgroundColor: "rgb(26, 26, 52)",
                        }}
                        className="form-control form-control-lg"
                        onChange={(event) =>
                          HandleChange(2, event.target.value)
                        }
                        placeholder="Password"
                      />
                    )}
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i
                          onClick={ShowPass}
                          style={{
                            cursor: "pointer",
                            zIndex: "1",
                            color: "#d1d1d1",
                          }}
                        >
                          {eye}
                        </i>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <button
                  onClick={Login}
                  className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                >
                  SIGN IN
                </button>
              </div>
              <div className="my-2 d-flex justify-content-between align-items-center">
                <Link to="/forget_pass">Forgot password?</Link>
              </div>
              <div className="text-center mt-4 font-weight-light">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary">
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
