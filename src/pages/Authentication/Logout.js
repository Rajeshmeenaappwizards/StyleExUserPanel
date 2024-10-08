import PropTypes from "prop-types";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";

import { logoutUser } from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import withRouter from "../../Components/Common/withRouter";
import { createSelector } from "reselect";
import { resetLoginData, resetOtpData } from "../../slices/auth/login/reducer";

const Logout = (props) => {
  const dispatch = useDispatch();


  const logoutData = createSelector(
    (state) => state.Login,
    (isUserLogout) => isUserLogout.isUserLogout
  );
  // Inside your component
  const isUserLogout = useSelector(logoutData);

  useEffect(() => {
    dispatch(resetLoginData());
    dispatch(logoutUser());
    dispatch(resetOtpData())
  }, [dispatch]);

  if (isUserLogout) {
    return <Navigate to="/login" />;
  }

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};


export default withRouter(Logout);