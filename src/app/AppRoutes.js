import React, { Component, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Spinner from '../app/shared/Spinner';

const Intro = lazy(() => import('./dashboard/Introduction'));
const StrategySimulator = lazy(() => import('./dashboard/StrategySimulator'));
const CandlestickSimulator = lazy(() => import('./dashboard/CandlestickSimulator'));
const PlanAndAnalytics = lazy(() => import('./dashboard/PlanAndAnalytics'));
const Login = lazy(() => import('./user-pages/Login'));
const Register = lazy(() => import('./user-pages/Register'));
const ForgotPass = lazy(() => import('./user-pages/ForgotPass'));
const UserManagement = lazy(() => import('./dashboard/AdminUserManagement'));
const UserManager = lazy(() => import('./admin/usermanager'))
const UserProfile = lazy(() => import('./user-pages/UserProfile'));
const Period = lazy(() => import('./dashboard/period'));




const AppRoutes = () => {
  const { Auth, Aperiod } = useSelector((state) => state.InputValue);
  console.log(localStorage.getItem("Auth"), localStorage.getItem("Aperiod"), localStorage.getItem("level"));
  let Tlogin = localStorage.getItem("Auth") == 2 ?
    (localStorage.getItem("level") == 1 || localStorage.getItem("Aperiod") ? <Switch><Route exact path="/intro" component={Intro} />
      < Route exact path="/strategy_simulator" component={StrategySimulator} />
      <Route exact path="/candlestick_simulator" component={CandlestickSimulator} />
      <Route exact path="/admin_user_management" component={UserManager} />
      <Route exact path="/plan_analytics" component={PlanAndAnalytics} />
      <Route exact path="/detailed_report1" component={PlanAndAnalytics} />
      <Route exact path="/detailed_report2" component={PlanAndAnalytics} />
      <Route exact path="/my_profile" component={UserProfile} />
      <Route exact path="/period" component={Period} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forget_pass" component={ForgotPass} />
      <Redirect to="/intro" component={Intro} /></Switch > : <Switch><Route exact path="/intro" component={Intro} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forget_pass" component={ForgotPass} />
      <Redirect to="/intro" /></Switch >)
    : (<Switch><Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <Route exact path="/forget_pass" component={ForgotPass} />
      <Redirect to="/login" /></Switch>)


  return (
    <Suspense fallback={<Spinner />}>
      {/* <Switc>// */}
      {Tlogin}

      {/* </Switc/h>/ */}
    </Suspense>
  );
}
export default AppRoutes;





// {auth ?
//   <Route exact path="/intro" component={INtro} />
//   <Route exact path="/dashboard" component={Dashboard} />
//   <Route exact path="/tab1" component={Tab1} />
//   <Route exact path="/tab2" component={Tab2} />
//   <Route exact path="/detailed_report1" component={Tab2} />
//   <Route exact path="/detailed_report2" component={Tab2} />
//   :
//   }
//   <Route exact path="/login" component={Login} />
//   <Route exact path="/register" component={Register} />
//   <Route exact path="/forget_pass" component={ForgotPass} />



//   {auth ?
//   <Redirect to="/dashboard" />
//   :
//   <Redirect to="/login" />
//   }