import React, { useEffect, useState, useMemo } from "react";
import { Link, Redirect } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import PhoneInput from "react-phone-input-2";
import "./phonestyle.css";
// import { Select, MenuItem } from "@mui/material";
import { message } from "antd";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import countryList from 'react-select-country-list'
import Select from 'react-select'


const eye = <FontAwesomeIcon icon={faEye} />;

const Register = () => {
  const darkTheme = {
    container: (provided) => ({
      ...provided,
      backgroundColor: '#232333',
    }),
    control: (provided) => ({
      ...provided,
      backgroundColor: '#232333',
      borderColor: '#232333',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? '#555' : '#232333',
      color: state.isFocused ? '#fff' : '#ccc',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#fff',
    }),
  }
  const [value, setValue] = useState('');
  const options = useMemo(() => countryList().getData(), []);
  const [messageApi, contextHolder] = message.useMessage();
  const [redirect, setRedirect] = useState(false);
  const [checked, setChecked] = useState(false);
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [eMail, setEmail] = useState("");
  const [cOuntry, setCountry] = useState("");
  const [pAss, setPass] = useState("");
  const [cPass, setCpass] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);
  const [cPasswordShown, setCpasswordShown] = useState(false);
  const [pHone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const changeHandler = value => {
    setValue(value);
    console.log();
    setCountry(value.label);
    // HandleChange(7, value.label);
  }
  const ShowPass = () => {
    setPasswordShown(!passwordShown);
  };
  const ShowCpass = () => {
    setCpasswordShown(!cPasswordShown);
  };
  const HandleChange = (p1, p2) => {
    // console.log(p1, p2);
    // return;
    if (p1 === 1) setFName(p2);
    else if (p1 === 2) setLName(p2);
    else if (p1 === 4) setEmail(p2);
    // else if (value) {

    //   console.log(value)
    // }
    else if (p1 === 10) setPass(p2);
    else if (p1 === 11) setCpass(p2);
    else if (p1 === 12) setChecked(p2);
    else if (p1 === 13) {
      setPhone(p2);
    } else if (p1 === 9) setUsername(p2);
  };
  const Register = () => {

    if (!fName || fName === "" || fName === undefined)
      messageApi.open({
        type: "warning",
        content: "Invaild First Name!",
      });
    else if (!lName || lName === "" || lName === undefined)
      messageApi.open({
        type: "warning",
        content: "Invaild Last Name!",
      });
    else if (!eMail || eMail === "" || eMail === undefined)
      messageApi.open({
        type: "warning",
        content: "Invaild Email!",
      });
    else if (!cOuntry || cOuntry === "" || cOuntry === undefined)
      messageApi.open({
        type: "warning",
        content: "Invaild Country!",
      });
    else if (!username || username === "" || username === undefined)
      messageApi.open({
        type: "warning",
        content: "Invaild Username!",
      });
    else if (!pAss || pAss === "" || pAss === undefined)
      messageApi.open({
        type: "warning",
        content: "Invaild Password!",
      });
    else if (!cPass || cPass === "" || cPass === undefined)
      messageApi.open({
        type: "warning",
        content: "Confirm Password!",
      });
    else if (pAss !== cPass) {
      messageApi.open({
        type: "warning",
        content: "Passwords don't match!",
      });
    } else if (!pHone || pHone === "" || pHone === undefined)
      messageApi.open({
        type: "warning",
        content: "Invaild PhoneNumber!",
      });
    else {
      var arr = { fName, lName, eMail, cOuntry, username, pAss, cPass, pHone };
      axios
        .post("/api/users/register", arr)
        .then((res) => {
          console.log(res.data);
          if (res.data === "UserEmail already exists!" || res.data === "UserName already exists!")
            messageApi.open({
              type: "error",
              content: res.data,
            });
          else {
            console.log(res.data);
            message.success(res.data);
            setRedirect(true);
          }
        })
        .catch((err) => {
          messageApi.open({
            type: "error",
            content: err.data,
          });
        });
    }
  };

  if (redirect) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <NotificationContainer />
      {contextHolder}
      <div className="d-flex align-items-center auth px-0 h-100">
        <div className="row w-100 mx-0">
          <div className="col-lg-4 mx-auto">
            <div
              className="card text-left py-5 px-4 px-sm-5"
              style={{ backgroundColor: "#1a1a34" }}
            >
              <h4>New here?</h4>
              <h6 className="font-weight-light">
                Signing up is easy. It only takes a few steps
              </h6>
              <div className="pt-3">
                <div className="row">
                  <div className="form-group col-6">
                    <input
                      type="text"
                      value={fName}
                      style={{ color: "white" }}
                      className="form-control form-control-lg"
                      placeholder="First Name"
                      onChange={(event) => HandleChange(1, event.target.value)}
                    />
                  </div>
                  <div className="form-group col-6">
                    <input
                      type="text"
                      value={lName}
                      style={{ color: "white" }}
                      className="form-control form-control-lg"
                      placeholder="Last Name"
                      onChange={(event) => HandleChange(2, event.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-6">
                    <input
                      type="email"
                      value={eMail}
                      style={{ color: "white" }}
                      className="form-control form-control-lg"
                      placeholder="Email"
                      pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"
                      onChange={(event) => HandleChange(4, event.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group col-6">
                    <input
                      type="text"
                      value={username}
                      style={{ color: "white" }}
                      className="form-control form-control-lg"
                      onChange={(event) => HandleChange(9, event.target.value)}
                      placeholder="Username"
                    />
                  </div>
                  <div className="form-group col-12">

                    <Select styles={darkTheme} options={options} value={value} onChange={changeHandler} />
                    {/* <input
                      type="text"
                      value={cOuntry}
                      style={{ color: "white" }}
                      className="form-control form-control-lg"
                      onChange={(event) => HandleChange(7, event.target.value)}
                      placeholder="Country"
                    /> */}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-12 ">
                    <PhoneInput
                      specialLabel={""}
                      country={"us"}
                      onChange={(phone) => HandleChange(13, phone)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-6">
                    <div className="input-group">
                      {passwordShown ? (
                        <input
                          type="text"
                          value={pAss}
                          style={{ color: "white" }}
                          className="form-control form-control-lg"
                          onChange={(event) =>
                            HandleChange(10, event.target.value)
                          }
                          placeholder="Password"
                        />
                      ) : (
                        <input
                          type="password"
                          value={pAss}
                          style={{ color: "white" }}
                          className="form-control form-control-lg"
                          onChange={(event) =>
                            HandleChange(10, event.target.value)
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
                              color: "#d1d1d1",
                            }}
                          >
                            {eye}
                          </i>
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="form-group col-6">
                    <div className="input-group">
                      {cPasswordShown ? (
                        <input
                          type="text"
                          value={cPass}
                          style={{ color: "white" }}
                          className="form-control form-control-lg"
                          onChange={(event) =>
                            HandleChange(11, event.target.value)
                          }
                          placeholder="Confirm Password"
                        />
                      ) : (
                        <input
                          type="password"
                          value={cPass}
                          style={{ color: "white" }}
                          className="form-control form-control-lg"
                          onChange={(event) =>
                            HandleChange(11, event.target.value)
                          }
                          placeholder="Confirm Password"
                        />
                      )}
                      <div className="input-group-prepend">
                        <span className="input-group-text">
                          <i
                            onClick={ShowCpass}
                            style={{
                              cursor: "pointer",
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
                <div className="mb-4">
                  <div className="form-check">
                    <label className="form-check-label text-muted">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={checked}
                        onChange={(event) =>
                          HandleChange(12, event.target.checked)
                        }
                      />
                      <i className="input-helper"></i>I agree to all Terms &
                      Conditions
                    </label>
                  </div>
                </div>
                <div className="mt-3">
                  <button
                    onClick={Register}
                    className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="text-center mt-4 font-weight-light">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary">
                    Login
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
