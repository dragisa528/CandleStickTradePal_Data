import axios from "axios"
import React, { useState, useEffect } from "react";
import {Input} from "@mui/material"

const Profile = () => {
    useEffect(() => {
        console.log(localStorage.getItem("email"))
        axios.post("/getuser", localStorage.getItem("email")).then(res => {
            console.log(res.data)
        })
    })

    return <>
        <Input placeholder="Email" />
        <Input placeholder="FirstName" />
        <Input placeholder="LastName" />
    </>
}

export default Profile;