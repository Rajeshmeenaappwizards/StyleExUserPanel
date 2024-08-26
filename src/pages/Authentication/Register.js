import React, { useEffect } from "react";
import {
  Row,
  Col,
  CardBody,
  Card,
  Alert,
  Container,
  Input,
  Label,
  Form,
  FormFeedback,
} from "reactstrap";

// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// action
import {
  registerUser,
  apiError,
  resetRegisterFlag,
  registerApi,
} from "../../slices/thunks";

//redux
import { useSelector, useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

//import images
import logoLight from "../../assets/images/logo-light.png";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { createSelector } from "reselect";

const Register = () => {
  const history = useNavigate();
  const dispatch = useDispatch();

  const registerApiRes = useSelector((state) => state.Account.registerData);
  const errorRes = useSelector((state) => state.Account.error);

  const validation = useFormik({
    enableReinitialize: true,

    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      userName: "",
      phone: "",
      password: "",
      confirm_password: "",
      role: "admin",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      firstName: Yup.string().required("Please Enter Your First Name"),
      lastName: Yup.string().required("Please Enter Your Last Name"),
      phone: Yup.string()
        .required("Please Enter Your Phone Number")
        .matches(/^[0-9]{10}$/, "Phone number must be exactly 10 digits"),
      userName: Yup.string().required("Please Enter Your User Name"),
      password: Yup.string().required("Please enter your password"),
      confirm_password: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords do not match")
        .required("Please confirm your password"),
    }),
    onSubmit: (values) => {
      if (values.password === values.confirm_password) {
        const { confirm_password, ...payload } = values;
        dispatch(registerApi(payload));
      }
    },
  });

  const selectLayoutState = (state) => state.Account;
  const registerdatatype = createSelector(selectLayoutState, (account) => ({
    success: registerApiRes?.success,
    error: account.error,
  }));
  const { error, success } = useSelector(registerdatatype);

  useEffect(() => {
    dispatch(apiError(""));
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      setTimeout(() => history("/login"), 2000);
    }

    setTimeout(() => {
      dispatch(resetRegisterFlag());
    }, 5000);
  }, [dispatch, success, error, history]);

  document.title = "Basic SignUp | StyleExchange";

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-2">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mb-2 text-white-50">
                  <div>
                    <div className=" mb-2 text-white-50">
                      <img
                        style={{ width: "100px", height: "auto" }}
                        className="object-fit-contain"
                        src="/swiplogo.png"
                        alt="Icon"
                      />
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h5 className="text-primary">Create New Account</h5>
                      <p className="text-muted">
                        Get your free velzon account now
                      </p>
                    </div>
                    <div className="p-2 mt-4">
                      <Form
                        onSubmit={(e) => {
                          e.preventDefault();
                          validation.handleSubmit();
                          return false;
                        }}
                        className="needs-validation"
                        action="#"
                      >
                        {success && success ? (
                          <>
                            {toast("Your Redirect To Login Page...", {
                              position: "top-right",
                              hideProgressBar: false,
                              className: "bg-success text-white",
                              progress: undefined,
                              toastId: "",
                            })}
                            <ToastContainer autoClose={2000} limit={1} />
                            <Alert color="success">
                              Register User Successfully and Your Redirect To
                              Login Page...
                            </Alert>
                          </>
                        ) : null}

                        <div className="mb-3">
                          <Label htmlFor="firstName" className="form-label">
                            First Name <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="firstName"
                            name="firstName"
                            className="form-control"
                            placeholder="Enter FirstName"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.firstName || ""}
                            invalid={
                              validation.touched.firstName &&
                              validation.errors.firstName
                                ? true
                                : false
                            }
                          />
                          {validation.touched.firstName &&
                          validation.errors.firstName ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.firstName}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="lastName" className="form-label">
                            Last Name <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="lastName"
                            name="lastName"
                            className="form-control"
                            placeholder="Enter lastName"
                            type="text"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.lastName || ""}
                            invalid={
                              validation.touched.lastName &&
                              validation.errors.lastName
                                ? true
                                : false
                            }
                          />
                          {validation.touched.lastName &&
                          validation.errors.lastName ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.lastName}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="useremail" className="form-label">
                            Email <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            className="form-control"
                            placeholder="Enter email address"
                            type="email"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.email || ""}
                            invalid={
                              validation.touched.email &&
                              validation.errors.email
                                ? true
                                : false
                            }
                          />
                          {validation.touched.email &&
                          validation.errors.email ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.email}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="phone" className="form-label">
                            Phone <span className="text-danger">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            className="form-control"
                            placeholder="Enter Phone Number"
                            type="phone"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.phone || ""}
                            invalid={
                              validation.touched.phone &&
                              validation.errors.phone
                                ? true
                                : false
                            }
                          />
                          {validation.touched.phone &&
                          validation.errors.phone ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.phone}</div>
                            </FormFeedback>
                          ) : null}
                        </div>
                        <div className="mb-3">
                          <Label htmlFor="username" className="form-label">
                            Username <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="userName"
                            type="text"
                            placeholder="Enter username"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.userName || ""}
                            invalid={
                              validation.touched.userName &&
                              validation.errors.userName
                                ? true
                                : false
                            }
                          />
                          {validation.touched.userName &&
                          validation.errors.userName ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.userName}</div>
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-3">
                          <Label htmlFor="userpassword" className="form-label">
                            Password <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="password"
                            type="password"
                            placeholder="Enter Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.password || ""}
                            invalid={
                              validation.touched.password &&
                              validation.errors.password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.password &&
                          validation.errors.password ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.password}</div>
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mb-2">
                          <Label
                            htmlFor="confirmPassword"
                            className="form-label"
                          >
                            Confirm Password{" "}
                            <span className="text-danger">*</span>
                          </Label>
                          <Input
                            name="confirm_password"
                            type="password"
                            placeholder="Confirm Password"
                            onChange={validation.handleChange}
                            onBlur={validation.handleBlur}
                            value={validation.values.confirm_password || ""}
                            invalid={
                              validation.touched.confirm_password &&
                              validation.errors.confirm_password
                                ? true
                                : false
                            }
                          />
                          {validation.touched.confirm_password &&
                          validation.errors.confirm_password ? (
                            <FormFeedback type="invalid">
                              <div>{validation.errors.confirm_password}</div>
                            </FormFeedback>
                          ) : null}
                        </div>

                        <div className="mt-4">
                          <button
                            className="btn btn-success w-100"
                            type="submit"
                          >
                            Sign Up
                          </button>
                        </div>
                      </Form>
                    </div>
                  </CardBody>
                </Card>
                <div className="mt-4 text-center">
                  <p className="mb-0">
                    Already have an account ?{" "}
                    <Link
                      to="/login"
                      className="fw-semibold text-primary text-decoration-underline"
                    >
                      {" "}
                      Signin{" "}
                    </Link>{" "}
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default Register;
