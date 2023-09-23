import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import { message } from "antd";
import "react-notifications/lib/notifications.css"
import { NotificationContainer, NotificationManager } from 'react-notifications';
import ReactLoading from "react-loading";
import "./card.css";
import { useDispatch, useSelector } from "react-redux";
import {
    InputAperiod, InputRPeriod
} from '../../reducers/InputSlice'


const Introduction = () => {
    const dispatch = useDispatch();
    const { Email } = useSelector((state) => state.InputValue);

    const [Bflag, setBflag] = useState(false);
    const [Sflag, setSflag] = useState(false);
    const [Pflag, setPflag] = useState(false);
    const [Prflag, setPrflag] = useState(false);

    const [Cperiod, setCperiod] = useState('');
    const [Rdata, setRdata] = useState(false);
    const iN2 = ["Set Predetermined Risks", "Accurately Predict Stop Loss", "Maximize Profit Potential", "Determine Risk-Optimized Quantity", "User Friendly Interface"];
    const iN3 = ["Simplify Complex Analysis", "Analyze different Market Commodities", "Back-Test Trading Scenarios", "Customized Risk Parameters", "Customized To Trade in 6 Major Currencies"];
    const [open, setOpen] = React.useState(true);
    const [selectedDiv, setSelectedDiv] = useState(null);

    const Handle = () => {
        localStorage.removeItem("Auth");
        localStorage.removeItem("userId");
        localStorage.removeItem("level");
        localStorage.removeItem("Username");
        localStorage.removeItem("Email");
        localStorage.removeItem("UserId");
        localStorage.removeItem("FirstName");
        localStorage.removeItem("Lastname");
        localStorage.removeItem("Aperiod")
        window.location = "/login";
    };

    const getuserperiod = () => {
        axios.post('/api/users/getperiod', { email: localStorage.getItem('Email') }).then(res => {
            if (res.data === "success") {
                setOpen(false);
                NotificationManager.success(res.data, 'Success');
                // dispatch(InputAperiod(1))
                localStorage.setItem("Aperiod", 1)
            }
            else if (res.data.period === Infinity) {
                setOpen(false);
            }
            else {
                NotificationManager.warning(res.data, 'Warning');
                console.log(res.data)
                dispatch(InputAperiod(0))
                localStorage.setItem("Aperiod", 0)
                setCperiod(res.data)
            }
        }).catch(err => {
            console.log(err.data)
        })
    }

    const SetPeriod = () => {
        var period;
        if (selectedDiv == 0) {
            period = 7;
        }
        else if (selectedDiv == 1) {
            period = 30
        }
        else if (selectedDiv == 2) {
            period = 365
        }
        else if (selectedDiv == 3) {
            period = 99999999999;
        }

        else if (!selectedDiv) {
            NotificationManager.warning("Please choose period", 'warning');
        }

        axios.post('/api/users/requestperiod', { email: localStorage.getItem("Email"), Rperiod: period }).then(res => {
            console.log(res.data)
            setRdata(true)
            // setOpen(false);
            // setRdata()
            NotificationManager.success(res.data, 'Success');
        }).catch(err => {
            console.log(err.data)
        })


    }

    const handleClick = (divIndex) => {
        setSelectedDiv(divIndex);
    };

    const divStyle = {
    };

    const selectedDivStyle = {
        ...divStyle,
        border: '1px solid var(--col)',
        backgroundColor: '#26262680',
        boxShadow: '0 0 32px #171717',
        transform: 'translateY(-16px) scale(1.02)',
        transition: 'all 0.5s ease',
    };

    useEffect(() => {
        getuserperiod();
    }, [localStorage.getItem("Email")]);
    return (
        <>
            <Dialog
                fullScreen={true}
                style={{ backgroundColor: '#27283a', overflowY: "hidden" }}
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle className="" style={{ backgroundColor: '#27283a', color: 'white' }}>
                    <NotificationContainer />
                    <button onClick={Handle} style={{ borderRadius: 6, boxShadow: '0px 1px 20px 1px #434568' }} className="btn btn-outline-info btn-md px-2 py-2">
                        LogOut
                    </button>
                    <div className="text-center">
                        <h1 className="text-center" style={{ marginTop: '100px', }}>Your request will be processed after you continue</h1>
                    </div>
                </DialogTitle>
                <DialogContent style={{ backgroundColor: '#27283a', color: 'white' }}>
                    <DialogContentText style={{ color: 'white', marginTop: '100px' }} id="alert-dialog-description">
                        <div className="row mb-5">
                            <div className=" col-sm-6 col-12 col-md-3 col-lg-3 mb-3" style={selectedDiv === 0 ? selectedDivStyle : divStyle} onClick={() => handleClick(0)}>
                                <div className="pricing-card basic">
                                    <div className="heading">
                                        <h4>Basic</h4>
                                        {/* Your request will be processed after you continue */}
                                    </div>
                                    <p className="price">
                                        1
                                        <sub>/week</sub>
                                    </p>
                                </div>
                            </div>
                            <div className=" col-sm-6 col-12 col-md-3 col-lg-3 mb-3" style={selectedDiv === 1 ? selectedDivStyle : divStyle} onClick={() => handleClick(1)}>
                                <div className="pricing-card standard">
                                    <div className="heading">
                                        <h4>Standard</h4>
                                    </div>
                                    <p className="price">
                                        1
                                        <sub>/month</sub>
                                    </p>
                                </div>
                            </div>
                            <div className=" col-sm-6 col-12 col-md-3 col-lg-3 mb-3" style={selectedDiv === 2 ? selectedDivStyle : divStyle} onClick={() => handleClick(2)}>
                                <div className="pricing-card  professional">
                                    <div className="heading">
                                        <h4>Professional</h4>
                                    </div>
                                    <p className="price">
                                        1
                                        <sub>/year</sub>
                                    </p>
                                </div>
                            </div>
                            <div className=" col-sm-6 col-12 col-md-3 col-lg-3 mb-3" style={selectedDiv === 3 ? selectedDivStyle : divStyle} onClick={() => handleClick(3)}>
                                <div className="pricing-card  premium">
                                    <div className="heading">
                                        <h4>Premium</h4>
                                    </div>
                                    <p className="price" style={{ fontSize: '25px', marginTop: '61px' }}>
                                        Lifetime
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center">
                                <button type="button" style={{ borderRadius: 6, boxShadow: '0px 1px 20px 1px #434568' }} className="btn btn-outline-info btn-md px-5 py-3" onClick={SetPeriod}>Continue</button>
                            </div>
                        </div>
                    </DialogContentText>
                    <DialogActions style={{ marginTop: '70px' }}>
                    </DialogActions>
                </DialogContent>
            </Dialog>
            <div className="row">
                <div className="col-12 text-center" style={{ marginTop: '50px', marginBottom: '70px' }}>
                    <text className="py-5 px-5" style={{ fontFamily: 'Abhaya Libre', fontSize: '18px' }}>
                        Unlock Your Trading Potential... Streamline Your Strategy with Our Innovative and Intelligent Analyst. A Risk Management  Tool for Trade Optimization!<br />

                        Candlestick TradePal is a powerful tool designed to assist traders in calculating key trade parameters such as stop loss, optimum quantity, and profit taking price. Its advance <br /> features provides traders with valuable insights for effective decision making in risk management and profit optimization. Please visit www.candlesticktradepal.com to view our<br /> user guide and learn more about the its features
                    </text>
                </div>
            </div >
            <div className="row" style={{ fontFamily: 'Abhaya Libre', fontSize: '18px', marginBottom: '60px' }}>
                <div className="col-2" ></div>
                <div className="col-3" style={{ display: "flex", alignContent: 'center', justifyContent: 'center' }}>
                    <ul >
                        {iN2.map((itm, i) => {
                            return <li style={{ paddingBottom: '18px' }} key={i}>{itm}</li>;
                        })}
                    </ul>
                </div>
                <div className="col-2" style={{ display: "flex", alignContent: 'center', justifyContent: 'center' }}>
                    <img src={require('../../assets/images/intrologo.png')} className="gradient-corona-img img-fluid" alt="banner" />
                </div>
                <div className="col-3" style={{ display: "flex", alignContent: 'center', justifyContent: 'center' }}>
                    <ul >
                        {iN3.map((itm, i) => {
                            return <li style={{ paddingBottom: '18px' }} key={i}>{itm}</li>;
                        })}
                    </ul>
                </div>
                <div className="col-2"></div>
            </div>
            <div className="row" style={{ fontFamily: 'Abhaya Libre', fontSize: '18px', textAlign: 'center', marginBottom: '80px' }}>
                <div className="col-12">
                    <ul className="mb-5" style={{ fontSize: '18px', display: "flex", alignContent: 'center', justifyContent: 'center' }}>
                        <li>Gain The Peace Of Mind To Make Quick Decisions As You Analyze Pre-Trades and Post-Trades of Stocks, Options, Futures, Cryptos and Forex Candlesticks!</li>
                    </ul>
                    <text style={{ color: '#12FB1B', fontSize: '21px' }}>Candlestick TradePal… The Trader’s Best Risk Management Tool and Intelligent Strategist.</text>
                </div>
            </div>
            <div className='px-5' style={{ display: "flex", justifyContent: 'space-between', alignItems: "center" }} >
                <div >
                    <Link style={{ color: 'white', textDecoration: 'underline' }} to="">Share with a Friend</Link>
                </div>
                <div >
                    <Link style={{ color: 'white', textDecoration: 'underline' }} to="">Terms of Use</Link>
                </div>
                <div style={{ color: "#00D25B" }}>
                    Click <Link style={{ color: 'white', textDecoration: 'underline' }} to="">here</Link> for Support
                </div>
            </div>
            <hr style={{ backgroundColor: "white" }} />
        </>
    )
}

export default Introduction;