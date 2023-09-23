import React, { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { MaterialReactTable } from "material-react-table";
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Stack, TextField, Tooltip, Paper, createTheme, ThemeProvider, useTheme, darken, Input, createMuiTheme, } from "@mui/material";
import { Delete, Edit, Search } from "@mui/icons-material";
import "./style.css";
import { useSelector, useDispatch } from 'react-redux'
import "react-notifications/lib/notifications.css"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import PhoneInput from "react-phone-input-2";
import "./phonestyle.css";
import countryList from 'react-select-country-list'
import Select from 'react-select'
import { message } from "antd";



const UserManager = () => {

  const { Rperiod } = useSelector((state) => state.InputValue);

  const inputStyles = {
    borderBottom: "2px solid #c8cce3",
    color: "#c8cce3",
    "::placeholder": {
      color: "#c8cce3",
    },
  };
  const placeholderStyle = {
    color: "white",

  };

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editmodal, setEditmodal] = useState(false);

  const [tableData, setTableData] = useState([]);
  const [validationErrors, setValidationErrors] = useState({});
  const [searchword, setSearchword] = useState("");
  const [rowdata, setRowdata] = useState([]);

  useEffect(() => {
    GetAllUsers();
    console.log("ss: " + Rperiod)
  }, []);

  const GetAllUsers = () => {
    axios.post("/api/users/getallusers").then((res) => {
      setTableData(res.data);
      for (var i = 0; i < res.data.length; i++) {
        if (res.data[i].request) {
          NotificationManager.info(`User ${res.data[i].username} has requested to use it for ${res.data[i].request} days`, 'News');
        }
      }
    });
  };

  const handleCreateNewRow = (values) => {
    axios.post("/api/users/AddUser", values).then((res) => {
      if (res.data === "User's email already exists!") {
        NotificationManager.warning(res.data, 'Failure');
      }
      else if (res.data === "Username already exists!") {
        NotificationManager.warning(res.data, 'Failure');
      }
      else {
        NotificationManager.success(res.data, 'success');
      }
      console.log(res.data);
      GetAllUsers();
      // setTableData(res.data);
    });
  };

  const handleSaveRowEdits = async (data) => {
    console.log(data);
    axios.post("/api/users/updateuser", data).then((res) => {
      console.log(res.data);
      setTableData(res.data);
    });
  };
  const handleCancelRowEdits = () => {
    setValidationErrors({});
  };

  //Delete row

  const handleDeleteRow = useCallback(
    (row) => {
      if (
        window.confirm(
          `Are you sure you want to delete ${row.getValue("username")}`
        )
      ) {
        console.log(row.original);
        axios.post("/api/users/deleteuser", row.original).then((res) => {
          console.log(res.data);
          setTableData(res.data);
        });
        return;
      }
      //send api delete request here, then refetch or update local table data for re-render

      // tableData.splice(row.index, 1);
      // setTableData([...tableData]);
    },
    [tableData]
  );

  const getCommonEditTextFieldProps = useCallback(
    (cell) => {
      return {
        error: !!validationErrors[cell.id],
        helperText: validationErrors[cell.id],
        onBlur: (event) => {
          const isValid =
            cell.column.id === "email"
              ? validateEmail(event.target.value)
              : cell.column.id === "age"
                ? validateAge(+event.target.value)
                : validateRequired(event.target.value);
          if (!isValid) {
            //set validation error for cell if invalid
            setValidationErrors({
              ...validationErrors,
              [cell.id]: `${cell.column.columnDef.header} is required`,
            });
          } else {
            //remove validation error for cell if valid
            delete validationErrors[cell.id];
            setValidationErrors({
              ...validationErrors,
            });
          }
        },
      };
    },
    [validationErrors]
  );

  const globalTheme = useTheme();

  const tableTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: globalTheme.palette.secondary,
      background: {
        default: "#27283a"
      }
    },
  });

  const columns = useMemo(
    () => [
      {
        accessorKey: "_id",
        header: "ID",
        enableColumnOrdering: false,
        enableEditing: false, //disable editing on this column
        enableSorting: false,
        size: 80,
      },
      {
        accessorKey: "username",
        header: "UserName",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "firstName",
        header: "First Name",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "lastname",
        header: "Last Name",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "password",
        header: "Password",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "email",
        header: "Email",
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "email",
        }),
      },
      {
        accessorKey: "Phone",
        header: "Phone",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
      },
      {
        accessorKey: "country",
        header: "Country",
        size: 140,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
        }),
      },
      {
        accessorKey: "period",
        header: "Period",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
      },
      {
        accessorKey: "registerTime",
        header: "Register_Time",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
      },
      {
        accessorKey: "request",
        header: "Request",
        size: 80,
        muiTableBodyCellEditTextFieldProps: ({ cell }) => ({
          ...getCommonEditTextFieldProps(cell),
          type: "number",
        }),
      },
    ],
    [getCommonEditTextFieldProps]
  );

  const handleSearchSubmit = (name) => (e) => {
    if (name === "Search" || e.key === "Enter") {
      console.log(searchword);
      var searchitem = {
        searchword: searchword,
      };
      console.log(searchword);
      if (searchword) {
        axios.post("/api/users/searchuser", searchitem).then((res) => {
          console.log(res.data);
          setTableData(res.data);
        });
      } else {
        axios.post("/api/users/getallusers").then((res) => {
          setTableData(res.data);
        });
      }
    }
  };

  const handleEditing = (row) => () => {
    console.log(row._valuesCache);
    setRowdata(row._valuesCache);
    setEditmodal(true);
  };

  return (
    <div className="custom-table">
      <NotificationContainer />
      <ThemeProvider theme={tableTheme}>
        <MaterialReactTable
          displayColumnDefOptions={{
            "mrt-row-actions": {
              muiTableHeadCellProps: {
                align: "center",
              },
              size: 120,
            },
          }}
          // enableFilterMatchHighlighting={true}
          // enableFullScreenToggle={false}
          // enableHiding={false}
          enableFilters={false}
          // enableDensityToggle={false}
          columns={columns}
          data={tableData}
          editingMode="modal" //default
          enableColumnOrdering={false}
          enableEditing
          // onEditingRowSave={handleSaveRowEdits}
          // onEditingRowCancel={handleCancelRowEdits}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="left" title="Edit">
                <IconButton
                  onClick={handleEditing(row)}
                  style={{ color: "#c8cce3" }}
                >
                  <Edit />
                </IconButton>
              </Tooltip>
              <Tooltip arrow>
                <IconButton
                  color="error"
                  onClick={() => handleDeleteRow(row)}
                  style={{ color: "#c8cce3" }}
                >
                  <Delete />
                </IconButton>
              </Tooltip>
            </Box>
          )}
          renderTopToolbarCustomActions={() => (
            <div style={{ display: "flex" }}>
              <Button
                style={{ backgroundColor: "#8b8fa3", marginRight: "65px" }}
                onClick={() => setCreateModalOpen(true)}
                variant="contained"
              >
                Create
              </Button>
              <Input
                // style={{ backgroundColor: "#8b8fa3", float: "right" }}
                value={searchword}
                onChange={(e) => setSearchword(e.target.value)}
                onKeyPressCapture={handleSearchSubmit("")}
                placeholder="Search here...."
                inputProps={{ style: inputStyles }}
                InputProps={{ disableUnderline: true }}
              />
              <IconButton
                onClick={handleSearchSubmit("Search")}
                style={{
                  position: "absolute",
                  left: "325px",
                  top: "8px",
                  color: "#8b8fa3",
                }}
              >
                <Search />
              </IconButton>
            </div>
          )}
        />
      </ThemeProvider>
      <CreateNewAccountModal
        columns={columns}
        open={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onSubmit={handleCreateNewRow}
        placeholderStyle={placeholderStyle}
      />
      <EditingModal
        columns={columns}
        open={editmodal}
        onClose={() => setEditmodal(false)}
        onSubmit={handleSaveRowEdits}
        rowdata={rowdata}
        setRowdata={setRowdata}
        placeholderStyle={placeholderStyle}
      />
    </div>
  );
};

export const CreateNewAccountModal = ({
  open,
  columns,
  placeholderStyle,
  onClose,
  onSubmit,
}) => {
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
  const [values, setValues] = useState(() =>
    columns.reduce((acc, column) => {
      acc[column.accessorKey ?? ""] = "";
      return acc;
    }, {})
  );
  const handleSubmit = () => {
    console.log(values);
    if (!values.username || values.username === "" || values.username === undefined)
      NotificationManager.warning("Invaild Username!", 'Failure');
    else if (!values.firstName || values.firstName === "" || values.firstName === undefined)
      NotificationManager.warning("Invaild First Name!", 'Failure');
    else if (!values.lastname || values.lastname === "" || values.lastname === undefined)
      NotificationManager.warning("Invaild Last Name!", 'Failure');
    else if (!values.password || values.password === "" || values.password === undefined)
      NotificationManager.warning("Invaild Password!", 'Failure');
    else if (!values.email || values.email === "" || values.email === undefined)
      NotificationManager.warning("Invaild Email!", 'Failure');
    else if (!values.Phone || values.Phone === "" || values.Phone === undefined)
      NotificationManager.warning("Invaild PhoneNumber!", 'Failure');
    else if (!values.country || values.country === "" || values.country === undefined)
      NotificationManager.warning("Invaild Country!", 'Failure');
    return;
    onSubmit(values);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ style: { borderRadius: '10px' } }}>
      <NotificationContainer />
      <DialogTitle textAlign="center" style={{ background: "#27283a", color: "white" }}>
        Create New Account
      </DialogTitle>
      <DialogContent style={{ background: "#27283a" }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            {columns.map((column) =>
              column.accessorKey === "_id" ||
                column.accessorKey === "request" ||
                column.accessorKey === "period" ? null : (
                column.accessorKey === "Phone" ? (
                  <PhoneInput
                    specialLabel={""}
                    country={"us"}
                    name={column.accessorKey}
                    onChange={(phone) =>
                      setValues({ ...values, [column.accessorKey]: phone })
                    }
                  />
                ) : (
                  column.accessorKey === "country" ? (
                    <Select
                      styles={darkTheme}
                      name={column.accessorKey}
                      options={options}
                      value={value}
                      onChange={(selectedOption) => {
                        setValue(selectedOption);
                        setValues({ ...values, [column.accessorKey]: selectedOption.label });
                      }}
                    />
                  ) : (
                    column.accessorKey === "registerTime" ? null : (
                      <TextField
                        key={column.accessorKey}
                        placeholder={column.header}
                        name={column.accessorKey}
                        inputProps={{ style: placeholderStyle }}
                        onChange={(e) =>
                          setValues({ ...values, [e.target.name]: e.target.value })
                        }
                      />
                    )
                  )
                )
              )
            )}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }} style={{ background: "#27283a" }}>
        <Button
          onClick={onClose}
          style={{ color: "#27283a", backgroundColor: "#8b8fa3" }}
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          style={{ backgroundColor: "#8b8fa3" }}
          onClick={handleSubmit}
          variant="contained"
        >
          Create New Account
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const EditingModal = ({
  open,
  columns,
  placeholderStyle,
  rowdata,
  setRowdata,
  onClose,
  onSubmit,
}) => {
  console.log(rowdata);
  const handleSubmit = () => {
    onSubmit(rowdata);
    NotificationManager.success("Exactly updated", 'Success');
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} PaperProps={{ style: { borderRadius: '10px' } }}>
      <DialogTitle textAlign="center" style={{ background: "#27283a", color: "white" }}>
        Edit
      </DialogTitle>
      <DialogContent style={{ background: "#27283a" }}>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            <TextField
              name="firstName"
              value={rowdata.firstName}
              placeholder="First Name"
              inputProps={{ style: placeholderStyle }}
              onChange={(e) =>
                setRowdata({ ...rowdata, [e.target.name]: e.target.value })
              }
            // style={{ border: "1px #a5aac7 solid" }}
            />
            <TextField
              name="lastname"
              value={rowdata.lastname}
              placeholder="Last Name"
              inputProps={{ style: placeholderStyle }}
              onChange={(e) =>
                setRowdata({ ...rowdata, [e.target.name]: e.target.value })
              }
            // style={{ border: "1px #a5aac7 solid" }}
            />
            <TextField
              name="email"
              value={rowdata.email}
              placeholder="Email"
              inputProps={{ style: placeholderStyle }}
              onChange={(e) =>
                setRowdata({ ...rowdata, [e.target.name]: e.target.value })
              }
            // style={{ border: "1px #a5aac7 solid" }}
            />
            <TextField
              name="Phone"
              value={rowdata.Phone}
              placeholder="Phone"
              inputProps={{ style: placeholderStyle }}
              onChange={(e) =>
                setRowdata({ ...rowdata, [e.target.name]: e.target.value })
              }
            // style={{ border: "1px #a5aac7 solid" }}
            />
            <TextField
              name="country"
              value={rowdata.country}
              placeholder="Country"
              inputProps={{ style: placeholderStyle }}
              onChange={(e) =>
                setRowdata({ ...rowdata, [e.target.name]: e.target.value })
              }
            // style={{ border: "1px #a5aac7 solid" }}
            />
            <TextField
              name="period"
              value={rowdata.period}
              placeholder="Period"
              style={{ color: 'white !important', webkitTextFillColor: 'white !important' }}
              inputProps={{ style: placeholderStyle }}
              onChange={(e) =>
                setRowdata({ ...rowdata, [e.target.name]: e.target.value })
              }
            // style={{ border: "1px #a5aac7 solid" }}
            />

            <TextField
              name="request"
              disabled
              placeholder="Request"
              value={rowdata.request}
              inputProps={{ style: placeholderStyle }}
              onChange={(e) =>
                setRowdata({ ...rowdata, [e.target.name]: e.target.value })
              }
            // style={{ border: "1px #a5aac7 solid" }}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }} style={{ background: "#27283a" }}>
        <Button
          onClick={onClose}
          style={{ color: "#27283a", backgroundColor: "#8b8fa3" }}
          variant="contained"
        >
          Cancel
        </Button>
        <Button
          style={{ backgroundColor: "#8b8fa3" }}
          onClick={handleSubmit}
          variant="contained"
        >
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const validateRequired = (value) => !!value.length;
const validateEmail = (email) =>
  !!email.length &&
  email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
const validateAge = (age) => age >= 18 && age <= 50;

export default UserManager;