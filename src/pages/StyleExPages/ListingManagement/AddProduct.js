import React, { useEffect, useState } from 'react';
import { Button, Card, CardBody, CardHeader, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import CategorySelect from '../components/CategorySelect';
import { useDispatch, useSelector } from 'react-redux';
import { allCategories, getOneProduct, postProduct, updateProduct } from '../../../slices/product/thunk';
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { resetpostedProduct } from '../../../slices/product/reducer';
import { useNavigate, useParams } from 'react-router-dom';

registerPlugin(FilePondPluginImagePreview);

const AddProduct = () => {
    const [levelOneCategory, setLevelOneCategory] = useState("");
    const [levelTwoCategory, setLevelTwoCategory] = useState("");
    const [levelThreeCategory, setLevelThreeCategory] = useState("");
    const [files, setFiles] = useState([]);
    const [productData, setProductData] = useState({
        parentCategories_Id: "",
        subCategories_Id: '',
        sub_sub_categories_ID: '',
        title: "",
        description: "",
        condition: "",
        brand: "",
        size: "",
        color: "",
        fabric: "",
        longitude: "",
        latitude: "",
        fit: "",
        occasion: "",
        sell_price: "",
        purchase_price: "",
        rent_price: "",
        rent_depositAmount: "",
        address: "",
        city: "",
        state: "",
        status: "",
        active_status: "",
        available_status: "",
        tags: "",
        views_count: "",
        favorite_count: "",
        imageUrl: [],
    });

    const [parentCategory, setParentCategory] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [subSubCategories, setSubSubCategories] = useState([]);
    const [subSubSubCategories, setSubSubSubCategories] = useState([]);

    const dispatch = useDispatch();
    const params = useParams();
    const navigate = useNavigate();
    const allCategoriesRes = useSelector(state => state.ProductSlice.categories);
    const postProductRes = useSelector(state => state.ProductSlice.postedProduct);
    const getOneProductRes = useSelector(state => state.ProductSlice.product);

    useEffect(() => {
        if (postProductRes && postProductRes.success) {
            // {
            //     toast(postProductRes.message, {
            //         position: "top-right",
            //         hideProgressBar: false,
            //         className: "bg-success text-white",
            //         progress: undefined,
            //         toastId: "",
            //     })
            // }
            dispatch(resetpostedProduct())
            setTimeout(() => {
                navigate('/listing-management/all-products')
            }, 1000)
        }
    }, [postProductRes])

    useEffect(() => {
        if (params && params.id) {
            dispatch(getOneProduct(params.id))
        }
    }, [params])

    useEffect(() => {
        if (getOneProductRes && getOneProductRes.success) {
            const product = getOneProductRes.data;
            setProductData({
                ...product,
                longitude: product.location.coordinates[0],
                latitude: product.location.coordinates[1],
                parentCategories_Id: product.parentCategories_Id._id,
                subCategories_Id: product.subCategories_Id._id,
                sub_sub_categories_ID: product.sub_sub_categories_ID._id,
                imageUrl: product.imageUrl
            });
            setLevelOneCategory(product.parentCategories_Id._id);
            setLevelTwoCategory(product.subCategories_Id._id);
            setLevelThreeCategory(product.sub_sub_categories_ID._id);
            setFiles(
                (product.imageUrl || []).map((media) => ({
                    source: media,
                    options: { type: "local" },
                }))
            );
        }
    }, [getOneProductRes]);

    const onChangeParantCategory = (selectedOption) => {
        setLevelOneCategory(selectedOption ? selectedOption.value : "");
        setSubCategories(selectedOption ? selectedOption.children : []);
        setProductData(prevState => ({
            ...prevState,
            parentCategories_Id: selectedOption ? selectedOption.value : ""
        }));
    };

    const onChangeSubCategory = (selectedOption) => {
        setLevelTwoCategory(selectedOption ? selectedOption.value : "");
        setSubSubCategories(selectedOption ? selectedOption.children : []);
        setProductData(prevState => ({
            ...prevState,
            subCategories_Id: selectedOption ? selectedOption.value : ""
        }));
    };

    const onChangeSubSubCategory = (selectedOption) => {
        setLevelThreeCategory(selectedOption ? selectedOption.value : "");
        setSubSubSubCategories(selectedOption ? selectedOption.children : []);
        setProductData(prevState => ({
            ...prevState,
            sub_sub_categories_ID: selectedOption ? selectedOption.value : ""
        }));
    };

    useEffect(() => {
        if (allCategoriesRes && allCategoriesRes.success) {
            setParentCategory(allCategoriesRes?.data);
        }
    }, [allCategoriesRes]);

    useEffect(() => {
        fetchCategoriesOption();
    }, []);

    const fetchCategoriesOption = () => {
        dispatch(allCategories());
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProductData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleDropdownChange = (name, value) => {
        setProductData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSaveChanges = () => {
        const formData = new FormData();

        // Add the product_id if params.id is available
        if (params.id) {
            formData.append('product_id', params.id);
        }

        // Append all fields from productData to formData
        Object.keys(productData).forEach(key => {
            // Handle array fields separately (e.g., imageUrl)
            if (Array.isArray(productData[key])) {
                productData[key].forEach(item => {
                    formData.append(`${key}[]`, item);
                });
            } else {
                formData.append(key, productData[key]);
            }
        });

        // Append files to formData, using the file object itself
        files.forEach(file => {
            formData.append('imageUrl', file.file);
        });

        // Dispatch appropriate action based on if params.id is available
        if (params.id) {
            dispatch(updateProduct(formData));
        } else {
            console.log('formData....',formData)
            dispatch(postProduct(formData));
        }
    };


    console.log('files', files)

    return (
        <div className='page-content'>
            <ToastContainer autoClose={2000} limit={1} />
            <Card>
                <CardHeader>
                    <h4 className='card-title mb-0'>Add Product</h4>
                </CardHeader>
                <CardBody>
                    <Row>
                        <Col lg={4}>
                            <FormGroup>
                                <Label for="parentCategory">Select Parent Category</Label>
                                <CategorySelect
                                    value={levelOneCategory}
                                    onChange={onChangeParantCategory}
                                    placeholder="Select Parent Category..."
                                    data={parentCategory}
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    {levelOneCategory && subCategories.length > 0 && (
                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label for="subCategory">Select Sub Category</Label>
                                    <CategorySelect
                                        value={levelTwoCategory}
                                        onChange={onChangeSubCategory}
                                        placeholder="Select Sub Category..."
                                        data={subCategories}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    )}
                    {levelTwoCategory && subSubCategories.length > 0 && (
                        <Row>
                            <Col lg={4}>
                                <FormGroup>
                                    <Label for="subSubCategory">Select Sub Sub Category</Label>
                                    <CategorySelect
                                        value={levelThreeCategory}
                                        onChange={onChangeSubSubCategory}
                                        placeholder="Select Sub Sub Category..."
                                        data={subSubCategories}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                    )}
                    <Row>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="title">Product Title*</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    value={productData.title}
                                    onChange={handleInputChange}
                                    placeholder="Enter Product title"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="description">Description*</Label>
                                <Input
                                    type="textarea"
                                    name="description"
                                    value={productData.description}
                                    onChange={handleInputChange}
                                    placeholder="Enter Description"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="condition">Condition*</Label>
                                <Input
                                    type="text"
                                    name="condition"
                                    value={productData.condition}
                                    onChange={handleInputChange}
                                    placeholder="Enter condition"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="longitude">Longitude*</Label>
                                <Input
                                    type="text"
                                    name="longitude"
                                    value={productData.longitude}
                                    onChange={handleInputChange}
                                    placeholder="Enter longitude"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="latitude">Latitude*</Label>
                                <Input
                                    type="text"
                                    name="latitude"
                                    value={productData.latitude}
                                    onChange={handleInputChange}
                                    placeholder="Enter latitude"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="brand">Brand*</Label>
                                <Input
                                    type="text"
                                    name="brand"
                                    value={productData.brand}
                                    onChange={handleInputChange}
                                    placeholder="Enter brand"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="size">Size*</Label>
                                <Input
                                    type="select"
                                    name="size"
                                    value={productData.size}
                                    onChange={(e) => handleDropdownChange('size', e.target.value)}
                                >
                                    <option value="">Select Size</option>
                                    <option value="S">S</option>
                                    <option value="M">M</option>
                                    <option value="L">L</option>
                                    <option value="XL">XL</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="color">Color*</Label>
                                <Input
                                    type="text"
                                    name="color"
                                    value={productData.color}
                                    onChange={handleInputChange}
                                    placeholder="Enter color"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="fabric">Fabric*</Label>
                                <Input
                                    type="text"
                                    name="fabric"
                                    value={productData.fabric}
                                    onChange={handleInputChange}
                                    placeholder="Enter fabric"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="fit">Fit*</Label>
                                <Input
                                    type="text"
                                    name="fit"
                                    value={productData.fit}
                                    onChange={handleInputChange}
                                    placeholder="Enter fit"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="occasion">Occasion*</Label>
                                <Input
                                    type="text"
                                    name="occasion"
                                    value={productData.occasion}
                                    onChange={handleInputChange}
                                    placeholder="Enter occasion"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="sell_price">Sell Price*</Label>
                                <Input
                                    type="text"
                                    name="sell_price"
                                    value={productData.sell_price}
                                    onChange={handleInputChange}
                                    placeholder="Enter sell_price"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="purchase_price">Purchase Price*</Label>
                                <Input
                                    type="text"
                                    name="purchase_price"
                                    value={productData.purchase_price}
                                    onChange={handleInputChange}
                                    placeholder="Enter purchase_price"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="rent_price">Rent Price*</Label>
                                <Input
                                    type="text"
                                    name="rent_price"
                                    value={productData.rent_price}
                                    onChange={handleInputChange}
                                    placeholder="Enter rent_price"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="rent_depositAmount">Rent Deposit Amount*</Label>
                                <Input
                                    type="text"
                                    name="rent_depositAmount"
                                    value={productData.rent_depositAmount}
                                    onChange={handleInputChange}
                                    placeholder="Enter rent_depositAmount"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="address">Address*</Label>
                                <Input
                                    type="text"
                                    name="address"
                                    value={productData.address}
                                    onChange={handleInputChange}
                                    placeholder="Enter address"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="city">City*</Label>
                                <Input
                                    type="text"
                                    name="city"
                                    value={productData.city}
                                    onChange={handleInputChange}
                                    placeholder="Enter city"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="state">State*</Label>
                                <Input
                                    type="text"
                                    name="state"
                                    value={productData.state}
                                    onChange={handleInputChange}
                                    placeholder="Enter state"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="active_status">Active Status*</Label>
                                <Input
                                    type="select"
                                    name="active_status"
                                    value={productData.active_status}
                                    onChange={(e) => handleDropdownChange('active_status', e.target.value)}
                                >
                                    <option value="">Select Active Status</option>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </Input>
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="available_status">Available Status*</Label>
                                <Input
                                    type="text"
                                    name="available_status"
                                    value={productData.available_status}
                                    onChange={handleInputChange}
                                    placeholder="Enter available_status"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="tags">Tags*</Label>
                                <Input
                                    type="text"
                                    name="tags"
                                    value={productData.tags}
                                    onChange={handleInputChange}
                                    placeholder="Enter tags"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="views_count">Views Count*</Label>
                                <Input
                                    type="text"
                                    name="views_count"
                                    value={productData.views_count}
                                    onChange={handleInputChange}
                                    placeholder="Enter views_count"
                                />
                            </FormGroup>
                        </Col>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="favorite_count">Favorite Count*</Label>
                                <Input
                                    type="text"
                                    name="favorite_count"
                                    value={productData.favorite_count}
                                    onChange={handleInputChange}
                                    placeholder="Enter favorite_count"
                                />
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="status">Status*</Label>
                                <Input
                                    type="select"
                                    name="status"
                                    value={productData.status}
                                    onChange={(e) => handleDropdownChange('status', e.target.value)}
                                >
                                    <option value="">Select Status</option>
                                    <option value="sell">Sell</option>
                                    <option value="rent">Rent</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}>
                            <FormGroup>
                                <Label for="productImages">Add Product Images</Label>
                                <div className="filepond-wrapper">
                                    <FilePond
                                        files={files}
                                        onupdatefiles={setFiles}
                                        allowMultiple={true}
                                        maxFiles={5}
                                        name="imageUrl"
                                        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
                                        // onremovefile={(error, file) => {
                                        //     if (error) {
                                        //         console.error('Error removing file:', error);
                                        //         return;
                                        //     }
                                        //     setFiles(prevFiles => prevFiles.filter(f => f.id !== file.id));
                                        // }}
                                        server={{
                                            load: (source, load, error, progress, abort, headers) => {
                                                fetch(new Request(source))
                                                    .then((response) => response.blob())
                                                    .then(load)
                                                    .catch((err) => {
                                                        console.error("Image loading failed: ", err);
                                                        abort();
                                                    });
                                            },
                                        }}
                                    />
                                </div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Button
                        color="primary"
                        className="btn btn-primary"
                        onClick={handleSaveChanges}
                    >
                        Submit
                    </Button>
                </CardBody>
            </Card>
        </div>
    );
};

export default AddProduct;
