import React from 'react';
import CountUp from "react-countup";
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
import { useSelector } from 'react-redux';

const Widgets = () => {

    const dashboardRes = useSelector((state) => state.DashboardEcommerce.widgetsData)

    return (
        <React.Fragment>
            {/* {dashboardRes && dashboardRes.success && dashboardRes.data && dashboardRes.data.widgets && dashboardRes.data.widgets.map((item, key) => ( */}
                <Col xl={3} md={6} >
                    <Card className="card-animate">
                        <CardBody>
                            <div className="d-flex align-items-center">
                                <div className="flex-grow-1 overflow-hidden">
                                    {/* <p className="text-uppercase fw-medium text-muted text-truncate mb-0">{item.label}</p> */}
                                </div>
                                {/* <div className="flex-shrink-0">
                                    <h5 className={"fs-14 mb-0 text-" + item.badgeClass}>
                                        {item.badge ? <i className={"fs-13 align-middle " + item.badge}></i> : null} {item.percentage} %
                                    </h5>
                                </div> */}
                            </div>
                            <div className="d-flex align-items-end justify-content-between mt-4">
                                <div>
                                    <h4 className="fs-22 fw-semibold ff-secondary mb-4"><span className="counter-value" data-target="559.25">
                                        <CountUp
                                            start={0}
                                            // prefix={item.prefix}
                                            // suffix={item.suffix}
                                            // separator={item.separator}
                                            // end={item.value}
                                            // decimals={item.decimals}
                                            // duration={4}
                                        />
                                    </span></h4>
                                    {/* <Link to={item.url} className="text-decoration-underline">{item.link}</Link> */}
                                </div>
                                <div className="avatar-sm flex-shrink-0">
                                    {/* <span className={"avatar-title rounded fs-3 bg-" + item.bgcolor + "-subtle"}>
                                        <i className={`text-${item.bgcolor} ${item.icon}`}></i>
                                    </span> */}
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            {/* ))} */}
        </React.Fragment>
    );
};

export default Widgets;