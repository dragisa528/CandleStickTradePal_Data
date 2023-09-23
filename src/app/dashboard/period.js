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
    const billeddata = [
        {
            title: '1',
            type: 'week',
            price: "$5.99/wk"
        },
        {
            title: '1',
            type: 'Month',
            price: "$0.00/mo"
        }
        , {
            title: '1',
            type: 'Year',
            price: "$19.49/ye"
        }

        , {
            title: '1',
            type: 'Lifetime',
            price: "$23.0/8y"
        }

    ]
    const SetPeriod = (p) => () => {
        axios.post('/api/users/setperiod', { email: localStorage.getItem('email'), period: p }).then(res => {
            message.config({
                top: "60px",
                duration: 5
            })
            message.success(res.data)
        }).catch(err => {
            message.config({
                top: "60px",
                duration: 5
            })
            message.warning(err.data)
        })
    }
    return (
        <div className="app cursor-pointer">
            <div className='row mt-5'>
                <div className="col-sm-3 mb-4">
                    <div className="card" style={{ borderRadius: '20px', backgroundColor: 'rgba(255,255,255,.05)' }}>
                        <div className="card-body text-center" >
                            <h4 className=" mt-3 mb-3" style={{ color: "#CBCBE2", fontSize: "20px" }}>1</h4>
                            <h4 className="mb-2" style={{ color: "#CBCBE2", fontSize: "20px" }}>Week</h4>
                            <h4 className="mb-2" style={{ color: "#CBCBE2", fontSize: "20px" }}>$5.99</h4>
                            <h4 className="mb-4" style={{ color: "#CBCBE2", fontSize: "20px" }}>$5.99/Wk</h4>
                            <button type="button" style={{ borderRadius: 6, boxShadow: '0px 1px 20px 1px #434568' }} className="btn btn-outline-info btn-md px-2.5 py-2" onClick={SetPeriod(7)}>Apply</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 mb-4">
                    <div className="card" style={{ borderRadius: '20px', backgroundColor: 'rgba(255,255,255,.05)' }}>
                        <div className="card-body text-center" >
                            <h4 className=" mt-3 mb-3" style={{ color: "#CBCBE2", fontSize: "20px" }}>1</h4>
                            <h4 className="mb-2" style={{ color: "#CBCBE2", fontSize: "20px" }}>Month</h4>
                            <h4 className="mb-2" style={{ color: "#CBCBE2", fontSize: "20px" }}>$9.99</h4>
                            <h4 className="mb-4" style={{ color: "#CBCBE2", fontSize: "20px" }}>$9.99/Mo</h4>
                            <button type="button" style={{ borderRadius: 6, boxShadow: '0px 1px 20px 1px #434568' }} className="btn btn-outline-info btn-md px-2.5 py-2" onClick={SetPeriod(30)}>Apply</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 mb-4">
                    <div className="card" style={{ borderRadius: '20px', backgroundColor: 'rgba(255,255,255,.05)' }}>
                        <div className="card-body text-center" >
                            <h4 className=" mt-3 mb-3" style={{ color: "#CBCBE2", fontSize: "20px" }}>1</h4>
                            <h4 className="mb-2" style={{ color: "#CBCBE2", fontSize: "20px" }}>Yeah</h4>
                            <h4 className="mb-2" style={{ color: "#CBCBE2", fontSize: "20px" }}>$500</h4>
                            <h4 className="mb-4" style={{ color: "#CBCBE2", fontSize: "20px" }}>$500/Ye</h4>
                            <button type="button" style={{ borderRadius: 6, boxShadow: '0px 1px 20px 1px #434568' }} className="btn btn-outline-info btn-md px-2.5 py-2" onClick={SetPeriod(365)}>Apply</button>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3 mb-4">
                    <div className="card" style={{ borderRadius: '20px', backgroundColor: 'rgba(255,255,255,.05)' }}>
                        <div className="card-body text-center" >
                            <h4 className=" mt-3" style={{ marginBottom: '53px', color: "#CBCBE2", fontSize: "20px" }}>Lifetime</h4>
                            <h4 className="" style={{ marginBottom: '53px', color: "#CBCBE2", fontSize: "20px" }}>$1000</h4>
                            <button type="button" style={{ borderRadius: 6, boxShadow: '0px 1px 20px 1px #434568' }} className="btn btn-outline-info btn-md  py-2" onClick={SetPeriod(0)}>Apply</button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default UserProfile;


