import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  Input,
  Label,
  Tooltip,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane,
  Button,
} from "reactstrap";

//Simple bar
import SimpleBar from "simplebar-react";

import BreadCrumb from "../../../Components/Common/BreadCrumb";

import { Swiper, SwiperSlide } from "swiper/react";
import classnames from "classnames";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import SwiperCore from "swiper";

import { Link, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getOneProduct } from "../../../slices/product/thunk";

SwiperCore.use([FreeMode, Navigation, Thumbs]);

const ProductReview = (props) => {
  return (
    <React.Fragment>
      <li className="py-2">
        <div className="border border-dashed rounded p-3">
          <div className="d-flex align-items-start mb-3">
            <div className="hstack gap-3">
              <div className="badge rounded-pill bg-success mb-0">
                <i className="mdi mdi-star"></i> {props.rating}
              </div>
              <div className="vr"></div>
              <div className="flex-grow-1">
                <p className="text-muted mb-0">{props.comment}</p>
              </div>
            </div>
          </div>
          {props.review.subitem && (
            <React.Fragment>
              <div className="d-flex flex-grow-1 gap-2 mb-3">
                {props.review?.subitem?.map((subItem, key) => (
                  <React.Fragment key={key}>
                    <Link to="#" className="d-block">
                      <img
                        src={subItem.img}
                        alt=""
                        className="avatar-sm rounded object-fit-cover material-shadow"
                      />
                    </Link>
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          )}

          <div className="d-flex align-items-end">
            <div className="flex-grow-1">
              <h5 className="fs-14 mb-0">{props.review.name}</h5>
            </div>

            <div className="flex-shrink-0">
              <p className="text-muted fs-13 mb-0">{props.review.date}</p>
            </div>
          </div>
        </div>
      </li>
    </React.Fragment>
  );
};

function Product(props) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [productData, setProductData] = useState(null);

  const [customActiveTab, setcustomActiveTab] = useState("1");
  const [selectedStatus, setSelectedStatus] = useState("");

  const params = useParams();
  const dispatch = useDispatch();

  const Product = useSelector((state) => state.ProductSlice.product);
  //   const ProductStatusRes = useSelector((state) => state.Products.updateProductStatusState);

  const toggleCustom = (tab) => {
    if (customActiveTab !== tab) {
      setcustomActiveTab(tab);
    }
  };
  // console.log("Product",Product)
  const fetchData = () => {
    dispatch(getOneProduct(params.id));
  };

  useEffect(() => {
    if (params.id) {
      fetchData();
    }
  }, [params]);

  useEffect(() => {
    if (Product && Product.success) {
      setProductData(Product.data);
      // setSelectedStatus(Product.data.approved_status);
    }
  }, [Product]);

  //   useEffect(() => {
  //      if (ProductStatusRes && ProductStatusRes.success) {
  //       setSelectedStatus(ProductStatusRes?.data?.status);
  //     }
  //   }, [ProductStatusRes]);

  // const updateStatus = async (data) => {
  //   dispatch(updateProductStatus(data));
  // };

  const formattedDate = (timestamp) => {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleDateString();
    return formattedDate;
  };

  // const handleStatusChange = async (e) => {
  //   const status = e.target.value;
  //   const message = `Are You Sure You Want To ${status}?`;

  //   if (window.confirm(message)) {
  //     const data = {
  //       status: e.target.value,
  //       productId: params._id,
  //     };
  //     updateStatus(data);
  //   } else {
  //     if (status === "rejected") {
  //       e.target.value = "approved";
  //     } else {
  //       e.target.value = "rejected";
  //     }
  //   }
  // };


  document.title = "Product Details | StyleExchange";

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Product Details" pageTitle="Product" />

        <Row>
          <Col lg={12}>
            <Card>
              <CardBody>
                <Row className="gx-lg-5">
                  <Col xl={4} md={8} className="mx-auto">
                    <div className="product-img-slider sticky-side-div">
                      <Swiper
                        navigation={true}
                        thumbs={{ swiper: thumbsSwiper }}
                        className="swiper product-thumbnail-slider p-2 rounded bg-light"
                      >
                        {productData?.imageUrl?.map((url, index) => (
                          <div className="swiper-wrapper" key={index}>
                            <SwiperSlide>
                              <img
                                src={url}
                                alt="image"
                                className="img-fluid d-block"
                              />
                            </SwiperSlide>
                          </div>
                        ))}
                      </Swiper>

                      <div className="product-nav-slider mt-2">
                        <Swiper
                          onSwiper={setThumbsSwiper}
                          slidesPerView={4}
                          freeMode={true}
                          watchSlidesProgress={true}
                          spaceBetween={10}
                          className="swiper product-nav-slider mt-2 overflow-hidden"
                        >
                          {productData?.imageUrl?.map((url, index) => (
                            <div className="swiper-wrapper" key={index}>
                              <SwiperSlide className="rounded">
                                <div className="nav-slide-item">
                                  <img
                                    src={url}
                                    alt="image"
                                    className="img-fluid d-block rounded"
                                  />
                                </div>
                              </SwiperSlide>
                            </div>
                          ))}
                        </Swiper>
                      </div>
                    </div>
                  </Col>

                  <Col xl={8}>
                    <div className="mt-xl-0 mt-5">
                      <div className="d-flex">
                        <div className="flex-grow-1">
                          <div className="d-flex justify-content-between">
                            <h4>{productData?.title}</h4>
                            <Link
                              to={`/listing-management/add-product/${params.id}`}
                              style={{ textDecoration: 'underline', fontWeight: 'bold' }}
                            >
                              Edit
                            </Link>
                          </div>
                          <div className="hstack gap-2 flex-wrap">
                            <div className="vr"></div>
                            <div className="text-muted">
                              User Name :
                              <span className="text-body fw-medium">
                                {productData?.userName}
                              </span>
                            </div>
                            <div className="vr"></div>
                            <div className="text-muted">
                              Published :
                              <span className="text-body fw-medium">
                                {formattedDate(productData?.createdAt)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="d-flex align-items-center justify-content-between mt-3">
                        <div className="d-flex">
                          <div className="text-muted fs-16">
                            <span className="mdi mdi-star text-warning"></span>
                            <span className="mdi mdi-star text-warning"></span>
                            <span className="mdi mdi-star text-warning"></span>
                            <span className="mdi mdi-star text-warning"></span>
                            <span className="mdi mdi-star text-warning"></span>
                          </div>
                          <div className="text-muted">
                            ({" "}
                            {productData?.ratingCount
                              ? productData?.ratingCount
                              : 0}{" "}
                            Customer Review )
                          </div>
                        </div>
                        {/* <div className="d-flex align-items-center gap-3">
                          <div className="">Status</div>

                          <select
                            className="form-select"
                            id="t-status"
                            data-choices
                            data-choices-search-false
                            aria-label="Default select example"
                            onChange={(e) => {
                              handleStatusChange(e);
                            }}
                            value={selectedStatus}
                          >
                            <option
                              selected={
                                props?.singleTicketDetails?.status ===
                                  "rejected"
                                  ? true
                                  : false
                              }
                              value="rejected"
                            >
                              Rejected
                            </option>
                            <option
                              selected={
                                props?.singleTicketDetails?.status ===
                                  "approved"
                                  ? true
                                  : false
                              }
                              value="approved"
                            >
                              Approved
                            </option>
                            <option
                              selected={
                                props?.singleTicketDetails?.status ===
                                  "pending_review"
                                  ? true
                                  : false
                              }
                              value="pending_review"
                            >
                              Pending Review
                            </option>

                            <option
                              selected={
                                props?.singleTicketDetails?.status === "paused"
                                  ? true
                                  : false
                              }
                              value="paused"
                            >
                              Paused
                            </option>
                            <option
                              selected={
                                props?.singleTicketDetails?.status === "hidden"
                                  ? true
                                  : false
                              }
                              value="hidden"
                            >
                              Hidden
                            </option>
                          </select>
                        </div> */}
                      </div>

                      <Row className="mt-4">
                        <Col lg={3} sm={6}>
                          <div className="p-2 border border-dashed rounded">
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm me-2">
                                <div className="avatar-title rounded bg-transparent text-success fs-24">
                                  <i className="ri-money-rupee-circle-line"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <p className="text-muted mb-1">Sell Price :</p>
                                <h5 className="mb-0">
                                  {productData?.sell_price}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={3} sm={6}>
                          <div className="p-2 border border-dashed rounded">
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm me-2">
                                <div className="avatar-title rounded bg-transparent text-success fs-24">
                                  <i className="ri-file-copy-2-fill"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <p className="text-muted mb-1">
                                  Total Orders :
                                </p>
                                <h5 className="mb-0">
                                  {productData?.totalOrders}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={3} sm={6}>
                          <div className="p-2 border border-dashed rounded">
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm me-2">
                                <div className="avatar-title rounded bg-transparent text-success fs-24">
                                  <i className="ri-stack-fill"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <p className="text-muted mb-1">Stock :</p>
                                <h5 className="mb-0">{productData?.stock}</h5>
                              </div>
                            </div>
                          </div>
                        </Col>
                        <Col lg={3} sm={6}>
                          <div className="p-2 border border-dashed rounded">
                            <div className="d-flex align-items-center">
                              <div className="avatar-sm me-2">
                                <div className="avatar-title rounded bg-transparent text-success fs-24">
                                  <i className="ri-stack-fill"></i>
                                </div>
                              </div>
                              <div className="flex-grow-1">
                                <p className="text-muted mb-1">
                                  Total Revenue :
                                </p>
                                <h5 className="mb-0">
                                  {productData?.totalRevenue}
                                </h5>
                              </div>
                            </div>
                          </div>
                        </Col>
                        {/* ))} */}
                      </Row>

                      <div className="mt-4 text-muted">
                        <h5 className="fs-14">Address :</h5>
                        <p>{productData?.address}</p>
                      </div>

                      {/* <Row>
                        <Col sm={6}>
                          <div className="mt-3">
                            <h5 className="fs-14">Features :</h5>
                            <ul className="list-unstyled">
                              <li className="py-1">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                Full Sleeve
                              </li>
                              <li className="py-1">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                Cotton
                              </li>
                              <li className="py-1">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                All Sizes available
                              </li>
                              <li className="py-1">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                4 Different Color
                              </li>
                            </ul>
                          </div>
                        </Col>
                        <Col sm={6}>
                          <div className="mt-3">
                            <h5 className="fs-14">Services :</h5>
                            <ul className="list-unstyled product-desc-list">
                              <li className="py-1">10 Days Replacement</li>
                              <li className="py-1">
                                Cash on Delivery available
                              </li>
                            </ul>
                          </div>
                        </Col>
                      </Row> */}

                      <div className="product-content mt-5">
                        <h5 className="fs-14 mb-3">Product Description :</h5>
                        <Nav tabs className="nav-tabs-custom nav-success">
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: customActiveTab === "2",
                              })}
                              onClick={() => {
                                toggleCustom("2");
                              }}
                            >
                              Details
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              style={{ cursor: "pointer" }}
                              className={classnames({
                                active: customActiveTab === "1",
                              })}
                              onClick={() => {
                                toggleCustom("1");
                              }}
                            >
                              Specification
                            </NavLink>
                          </NavItem>
                        </Nav>

                        <TabContent
                          activeTab={customActiveTab}
                          className="border border-top-0 p-4"
                          id="nav-tabContent"
                        >
                          <TabPane id="nav-speci" tabId="1">
                            <div className="table-responsive">
                              <p className="mb-2">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                Address: {productData?.address}
                              </p>
                              <p className="mb-2">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                Availability: {productData?.available_status}
                              </p>
                              <p className="mb-2">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                Size: {productData?.size}
                              </p>
                              <p className="mb-2">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                Color: {productData?.color}
                              </p>
                              <p className="mb-2">
                                <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                Status: {productData?.status}
                              </p>
                            </div>
                          </TabPane>
                          <TabPane id="nav-detail" tabId="2">
                            <div>
                              <h5 className="font-size-16 mb-3">
                                {productData?.name}
                              </h5>
                              <p>{productData?.short_description}</p>
                              <div>
                                <p className="mb-2">
                                  <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                  Stock: {productData?.stock}
                                </p>
                                <p className="mb-2">
                                  <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                  Rating Count: {productData?.ratingCount}
                                </p>
                                <p className="mb-2">
                                  <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                  Purcahase Price: ₹
                                  {productData?.purchase_price}
                                </p>
                                <p className="mb-2">
                                  <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                  Deposited Amount: ₹
                                  {productData?.rent_depositAmount}
                                </p>
                                <p className="mb-2">
                                  <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                  Sale price: ₹{productData?.sell_price}
                                </p>
                                <p className="mb-2">
                                  <i className="mdi mdi-circle-medium me-1 text-muted align-middle"></i>{" "}
                                  Rent price: ₹{productData?.rent_price}
                                </p>
                              </div>
                            </div>
                          </TabPane>
                        </TabContent>
                      </div>

                      <div className="mt-5">
                        <div>
                          <h5 className="fs-14 mb-3">Ratings & Reviews</h5>
                        </div>
                        <Row className="gy-4 gx-0">
                          <Col lg={4}>
                            <div>
                              <div className="pb-3">
                                <div className="bg-light px-3 py-2 rounded-2 mb-2">
                                  <div className="d-flex align-items-center">
                                    <div className="flex-grow-1">
                                      <div className="fs-16 align-middle text-warning">
                                        <i className="ri-star-fill"></i>{" "}
                                        <i className="ri-star-fill"></i>{" "}
                                        <i className="ri-star-fill"></i>{" "}
                                        <i className="ri-star-fill"></i>{" "}
                                        <i className="ri-star-half-fill"></i>
                                      </div>
                                    </div>
                                    <div className="flex-shrink-0">
                                      <h6 className="mb-0">
                                        {Product?.data?.averageRating
                                          ? Product?.data?.averageRating
                                          : 0}
                                        out of 5
                                      </h6>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <div className="text-muted">
                                    Total reviews :
                                    <span className="fw-medium">
                                      {Product?.data?.ratingCount
                                        ? Product?.data?.ratingCount
                                        : 0}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <div className="mt-3">
                                {Product?.data?.ratingSummary?.map(
                                  (data, index) => (
                                    <Row
                                      className="align-items-center g-2"
                                      key={index}
                                    >
                                      <div className="col-auto">
                                        <div className="p-2">
                                          <h6 className="mb-0">
                                            {data?.rating} star
                                          </h6>
                                        </div>
                                      </div>
                                      <div className="col">
                                        <div className="p-2">
                                          <div className="progress animated-progess progress-sm">
                                            <div
                                              className="progress-bar bg-success"
                                              role="progressbar"
                                              style={{ width: "50.16%" }}
                                              aria-valuenow="50.16"
                                              aria-valuemin="0"
                                              aria-valuemax="100"
                                            ></div>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-auto">
                                        <div className="p-2">
                                          <h6 className="mb-0 text-muted">
                                            {data.count}
                                          </h6>
                                        </div>
                                      </div>
                                    </Row>
                                  )
                                )}
                              </div>
                            </div>
                          </Col>

                          <Col lg={8}>
                            <div className="ps-lg-4">
                              <div className="d-flex flex-wrap align-items-start gap-3">
                                <h5 className="fs-14">Reviews: </h5>
                              </div>

                              <SimpleBar
                                className="me-lg-n3 pe-lg-4"
                                style={{ maxHeight: "225px" }}
                              >
                                <ul className="list-unstyled mb-0">
                                  {Product?.data?.latestReviews?.map(
                                    (review, index) => (
                                      <React.Fragment key={index}>
                                        <ProductReview review={review} />
                                      </React.Fragment>
                                    )
                                  )}
                                </ul>
                              </SimpleBar>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Product;
