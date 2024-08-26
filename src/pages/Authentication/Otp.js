import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Row,
  Button,
  Form,
  FormFeedback,
  Alert,
  Spinner,
} from "reactstrap";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import withRouter from "../../Components/Common/withRouter";
// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

// actions
import {
  loginUser,
  socialLogin,
  resetLoginFlag,
  loginApi,
  otpApi,
} from "../../slices/thunks";

import logoLight from "../../assets/images/logo-light.png";
import { createSelector } from "reselect";
import { otpSuccess, resetOtpData } from "../../slices/auth/login/reducer";
//import images

const Otp = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectLayoutState = (state) => state;

  const loginpageData = createSelector(selectLayoutState, (state) => ({
    user: state.Account.user,
    error: state.Login.error,
    loading: state.Login.loading,
    errorMsg: state.Login.errorMsg,
    otpData: state.Login.otpData,
  }));

  const { user, error, loading, errorMsg, otpData } =
    useSelector(loginpageData);

  const loginRes = useSelector((state) => state.Login.loginData);
  console.log(loginRes)

  useEffect(() => {
    let auth = localStorage.getItem("authUser");
    let authData = JSON.parse(auth);
    if (otpData && otpData.success) {
      localStorage.setItem("authUser", JSON.stringify(otpData));
      dispatch(otpSuccess(otpData));
      navigate("/dashboard");
    } else if (authData && authData.success) {
      dispatch(otpSuccess(authData));
      navigate("/dashboard");
    }
  }, [otpData]);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      OTP: "",
      FCM:"",
      phoneNumber: loginRes.phoneNumber.toString() || "",
    },
    validationSchema: Yup.object({
      OTP: Yup.string().required("Please Enter Your Otp"),
    }),
    onSubmit: (values) => {
      dispatch(otpApi(values));
    },
  });

  useEffect(() => {
    if (errorMsg) {
      setTimeout(() => {
        dispatch(resetLoginFlag());
      }, 3000);
    }
  }, [dispatch, errorMsg]);
  document.title = "Basic SignIn | StyleExchange";
  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-5">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mt-sm-5 mb-4 text-white-50">
                  <div>
                    {/* <Link to="/" className="d-inline-block auth-logo">
                                            <img src={logoLight} alt="" height="20" />
                                        </Link> */}
                  </div>
                  <p className="mt-3 fs-15 fw-medium">Swipe Pannel</p>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4 card-bg-fill">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Welcome Back !</h5>
                      <p className="text-muted">
                        Sign in to continue to Swipe.
                      </p>
                    </div>
                    {error && error ? (
                      <Alert color="danger"> {error} </Alert>
                    ) : null}
                    <div className="p-2 mt-4">
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                        action="#"
                      >
                        <div className="mb-3">
                          <Label htmlFor="otp" className="form-label">
                            Otp
                          </Label>
                          <Input
                            name="OTP"
                            className="form-control"
                            placeholder="Enter otp"
                            type="otp"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.OTP || ""}
                            invalid={
                              validation.touched.OTP && validation.errors.OTP
                                ? true
                                : false
                            }
                          />
                          {validation.touched.OTP && validation.errors.OTP ? (
                            <FormFeedback type="invalid">
                              {validation.errors.OTP}
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mt-4">
                          <Button
                            color="success"
                            disabled={error ? null : loading ? true : false}
                            className="btn btn-success w-100"
                            type="submit"
                          >
                            {loading ? (
                              <Spinner size="sm" className="me-2">
                                {" "}
                                Loading...{" "}
                              </Spinner>
                            ) : null}
                            Sign In
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>

                {/* <div className="mt-4 text-center">
                  <p className="mb-0">
                    
                    <Link
                      to="/login"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      {" "}
                      Login{" "}
                    </Link>{" "}
                  </p>{" "}
                </div> */}
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default withRouter(Otp);
