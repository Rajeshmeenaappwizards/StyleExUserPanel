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
import { loginApi } from "../../slices/thunks";

import { createSelector } from "reselect";
// import WarningAlert from "../SwipePages/components/WarningAlert";
import { resetError } from "../../slices/auth/login/reducer";
//import images

const Login = (props) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const selectLayoutState = (state) => state;

    const loginpageData = createSelector(selectLayoutState, (state) => ({
        user: state.Account.user,
        error: state.Login.error,
        loading: state.Login.loading,
        errorMsg: state.Login.errorMsg,
        loginData: state.Login.loginData,
    }));
    // Inside your component
    const { user, error, loading, errorMsg, loginData } =
        useSelector(loginpageData);

    const errorRes = useSelector((state) => state.Login.error);
    const [userLogin, setUserLogin] = useState([]);

    useEffect(() => {
        // let auth = localStorage.getItem("authUser");
        // console.log('auth',auth)
        // let authData = JSON.parse(auth);
        // console.log('authData',authData)

        if (loginData && loginData?.success) {
            // localStorage.setItem("authUser", JSON.stringify(loginData));
            // dispatch(loginSuccess(loginData));
            navigate("/otp");
        }
        // else if (authData && authData.success) {
        //     dispatch(loginSuccess(authData));
        //     navigate('/otp')
        // }
    }, [loginData]);

    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            phoneNumber: userLogin.phoneNumber || "",
        },
        validationSchema: Yup.object({
            phoneNumber: Yup.string().required("Please Enter Your phoneNumber"),
        }),
        onSubmit: (values) => {
            dispatch(loginApi(values));
        },
    });

    useEffect(() => {
        return () => {
            dispatch(resetError());
        };
    }, []);
    document.title = "Basic SignIn | Style Exchange";
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
                                    <p className="mt-3 fs-15 fw-medium">Style Exchange Pannel</p>
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
                                                Sign in to continue to StyleExchange.
                                            </p>
                                        </div>
                                        {errorRes && errorRes ? (
                                            <WarningAlert msg={errorRes} />
                                        ) : null}
                                        <div className="p-2 mt-2">
                                            <Form
                                                onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}
                                                action="#"
                                            >
                                                <div className="mb-3">
                                                    <Label htmlFor="phoneNumber" className="form-label">
                                                        Phon Number
                                                    </Label>
                                                    <Input
                                                        name="phoneNumber"
                                                        className="form-control"
                                                        placeholder="Enter phoneNumber"
                                                        type="number"
                                                        onChange={validation.handleChange}
                                                        onBlur={validation.handleBlur}
                                                        value={validation.values.phoneNumber || ""}
                                                        invalid={
                                                            validation.touched.phoneNumber &&
                                                                validation.errors.phoneNumber
                                                                ? true
                                                                : false
                                                        }
                                                    />
                                                    {validation.touched.phoneNumber &&
                                                        validation.errors.phoneNumber ? (
                                                        <FormFeedback type="invalid">
                                                            {validation.errors.phoneNumber}
                                                        </FormFeedback>
                                                    ) : null}
                                                </div>

                                                {/* <div className="form-check">
                                                    <Input className="form-check-input" type="checkbox" value="" id="auth-remember-check" />
                                                    <Label className="form-check-label" htmlFor="auth-remember-check">Remember me</Label>
                                                </div> */}

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

                                <div className="mt-4 text-center">
                                    <p className="mb-0">
                                        Don't have an account ?{" "}
                                        <Link
                                            to="/register"
                                            className="fw-semibold text-primary text-decoration-underline"
                                        >
                                            {" "}
                                            SignUp{" "}
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

export default withRouter(Login);
