import React, { useEffect } from "react";
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";
import ParticlesAuth from "../AuthenticationInner/ParticlesAuth";
import { Link, useParams } from "react-router-dom";

const WelcomeAdmin = () => {
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      // Save the token in local storage under the key "authUser"
      localStorage.setItem("authUser", JSON.stringify({ token }));
    }
  }, [token]);

  return (
    <React.Fragment>
      <ParticlesAuth>
        <div className="auth-page-content mt-lg-2">
          <Container>
            <Row>
              <Col lg={12}>
                <div className="text-center mb-2 text-white-50">
                  <img
                    style={{ width: "100px", height: "auto" }}
                    className="object-fit-contain"
                    src="/swiplogo.png"
                    alt="Icon"
                  />
                </div>
              </Col>
            </Row>

            <Row className="justify-content-center">
              <Col md={8} lg={6} xl={5}>
                <Card className="mt-4 card-bg-fill">
                  <CardBody className="p-4">
                    <div className="text-center mt-2">
                      <h2 className="text-success">Welcome Admin</h2>
                      <h2>🎉🎉🎉🎉🎉 </h2>
                      <h4 className="mt-3 text-success">Go to Dashboard</h4>
                      <Link to={`/dashboard?token=${token}`}>
                        <Button
                          color="secondary"
                          variant="outline"
                          className="edit-icon-button px-3 py-1 mb-1 blue-button"
                        >
                          Dashboard
                        </Button>
                      </Link>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </ParticlesAuth>
    </React.Fragment>
  );
};

export default WelcomeAdmin;
