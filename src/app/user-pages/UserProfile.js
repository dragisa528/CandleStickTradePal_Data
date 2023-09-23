import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  Stack,
  TextField,
} from "@mui/material";
import moment from "moment";
import { message } from "antd";

const UserProfile = () => {

  const [data, setData] = useState([]);
  const [modaldata, setModaldata] = useState([]);
  const [open, setOpen] = useState(false);
  const [period, setPeriod] = useState(0);
  const [addperiod, setAddperiod] = useState();
  const [passwords, setPasswords] = useState({
    lastpassword: "",
    newpassword: ""
  })
  const placeholderStyle = {
    color: "white",

  };
  useEffect(() => {
    console.log(localStorage.getItem("UserId"));
    const user = {
      userId: localStorage.getItem("UserId"),
    };
    axios.post("/api/users/getuser", user).then((res) => {
      console.log(res.data);
      setData(res.data);
      setModaldata(res.data)
      let dead = 0;
      if (
        moment(new Date()).format("MM") -
        moment(res.data.registerTime).format("MM") >
        0
      ) {
        dead +=
          (moment(new Date()).format("MM") -
            moment(res.data.registerTime).format("MM")) *
          30;
        if (
          moment(new Date()).format("DD") -
          moment(res.data.registerTime).format("DD") >
          0
        ) {
          dead +=
            moment(new Date()).format("DD") -
            moment(res.data.registerTime).format("DD");
        }
      }
      if (dead >= res.data.period) {
        message.config({
          top: 60,
          duration: 2
        })
        message.warning("Please apply for an extension of time")
      }
      setPeriod(dead);
    });
  }, []);
  console.log("period: ", period);
  const handleSubmit = () => {
    setAddperiod();
    const date = Number(period) + Number(addperiod);
    const newUser = {
      _id: modaldata._id,
      firstName: modaldata.firstName,
      lastname: modaldata.lastname,
      email: modaldata.email,
      Phone: modaldata.Phone,
      country: modaldata.country,
      lastpassword: passwords.lastpassword,
      newpassword: passwords.newpassword,
      request: addperiod,
    };
    if (newUser.newpassword) {
      localStorage.setItem("Password", passwords.newpassword);
    }
    axios.post("/api/users/updateusers", newUser).then((res) => {
      console.log(res.data);
      if (res.data) {
        setData(res.data)
        message.success("Success");
        setOpen(false);

      }
    });
  };

  const handleModalOpen = () => {
    setModaldata(data)
    setOpen(true)
  }

  const onClose = () => {
    setOpen(false);
  };



  return (
    <>
      <h4>My Profile</h4>
      <br />
      <div className="row">
        <div className="col-lg-4 mb-5">
          <label for={"firstname"}>FirstName: </label> <br></br>
          <Input
            placeholder="FirstName"
            id="FirstName"
            value={data.firstName}

            style={{ color: "white", width: "100%" }}
          />
        </div>
        <div className="col-lg-4 mb-5">
          <label for={"lastName"}>LastName: </label> <br></br>
          <Input
            placeholder="lastName"
            id="lastName"
            value={data.lastname}
            style={{ color: "white", width: "100%" }}
          />
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className="row">
        <div className="col-lg-4 mb-5">
          <label for={"email"}>Email </label> <br></br>
          <Input
            placeholder="Email"
            id="email"
            value={data.email}
            style={{ color: "white", width: "100%" }}
          />
        </div>
        <div className="col-lg-4 mb-5">
          <label for={"Password"}>Password: </label> <br></br>
          <Input
            placeholder="Password"
            id="Password"
            value={localStorage.getItem('Password')}
            style={{ color: "white", width: "100%" }}
          />
        </div>
        <div className="col-lg-4 mb-5">
          <label for={"Username"}>Username: </label> <br></br>
          <Input
            placeholder="Username"
            id="username"
            value={data.username}
            style={{ color: "white", width: "100%" }}
          />
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className="row">
        <div className="col-lg-4 mb-5">
          <label for={"Phone"}>Phone: </label> <br></br>
          <Input
            placeholder="Phone"
            id="Phone"
            value={data.Phone}
            style={{ color: "white", width: "100%" }}
          />
        </div>
        <div className="col-lg-4 mb-5">
          <label for={"country"}>Country </label> <br></br>
          <Input
            placeholder="country"
            id="country"
            value={data.country}
            style={{ color: "white", width: "100%" }}
          />
        </div>
        <div className="col-lg-4 mb-5">
          <Button
            style={{ float: "right", alignItems: "center" }}
            onClick={handleModalOpen}
          >
            Edit
          </Button>
        </div>
      </div>
      <Dialog open={open} onClose={onClose} PaperProps={{ style: { borderRadius: '10px' } }}>
        <DialogTitle textAlign="center" style={{ background: "#27283a", color: "white" }}>Change My Profile</DialogTitle>
        <DialogContent style={{ background: "#27283a" }} >
          <form onSubmit={(e) => e.preventDefault()}>
            <Stack
              sx={{
                width: "100%",
                minWidth: { xs: "300px", sm: "360px", md: "400px" },
                gap: "1.5rem",
                marginTop: "3px"
              }}
            >
              <TextField
                // key={column.accessorKey}
                placeholder={"First Name"}
                inputProps={{ style: placeholderStyle }}
                name={"firstName"}
                value={modaldata.firstName}
                onChange={(e) =>
                  setModaldata({ ...modaldata, [e.target.name]: e.target.value })
                }
              />
              <TextField
                // key={column.accessorKey}
                placeholder={"Last Name"}
                inputProps={{ style: placeholderStyle }}
                name={"lastname"}
                value={modaldata.lastname}
                onChange={(e) =>
                  setModaldata({ ...modaldata, [e.target.name]: e.target.value })
                }
              />{" "}
              <TextField
                // key={column.accessorKey}
                placeholder={"Email"}
                inputProps={{ style: placeholderStyle }}
                name={"email"}
                value={modaldata.email}
                onChange={(e) =>
                  setModaldata({ ...modaldata, [e.target.name]: e.target.value })
                }
              />{" "}
              <TextField
                // key={column.accessorKey}
                placeholder={"Phone"}
                name={"Phone"}
                inputProps={{ style: placeholderStyle }}
                value={modaldata.Phone}
                onChange={(e) =>
                  setModaldata({ ...modaldata, [e.target.name]: e.target.value })
                }
              />
              <TextField
                // key={column.accessorKey}
                placeholder={"Country"}
                inputProps={{ style: placeholderStyle }}
                name={"country"}
                value={modaldata.country}
                onChange={(e) =>
                  setModaldata({ ...modaldata, [e.target.name]: e.target.value })
                }
              />
              <TextField
                // key={column.accessorKey}
                placeholder={"Last Password"}
                inputProps={{ style: placeholderStyle }}
                name={"lastpassword"}
                value={passwords.lastpassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, [e.target.name]: e.target.value })
                }
                type="password"
              />
              <TextField
                // key={column.accessorKey}
                placeholder={"New Password"}
                inputProps={{ style: placeholderStyle }}
                name={"newpassword"}
                value={passwords.newpassword}
                onChange={(e) =>
                  setPasswords({ ...passwords, [e.target.name]: e.target.value })

                }
                type="password"
              />
              {period >= modaldata.period ? (
                // <LocalizationProvider dateAdapter={AdapterDayjs}>
                //   <DatePicker />
                // </LocalizationProvider>
                <Input
                  max={300}
                  min={30}
                  placeholder="extend your period"
                  inputProps={{ style: placeholderStyle }}
                  value={addperiod}
                  onChange={(e) => setAddperiod(e.target.value)}
                  type="number"
                />
              ) : null}
            </Stack>
          </form>
        </DialogContent>
        <DialogActions sx={{ p: "1.25rem" }} style={{ background: "#27283a" }}>
          {" "}
          <Button onClick={onClose} style={{ color: "#27283a", backgroundColor: "#8b8fa3" }}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" style={{ backgroundColor: "#8b8fa3" }}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserProfile;
