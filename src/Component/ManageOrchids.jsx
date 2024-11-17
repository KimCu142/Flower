import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form, Input, Modal, message, Upload, Checkbox, Image, Rate } from "antd";
import { storage } from "../firebase"; // Import Firebase Storage
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UploadOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { uploadImageFile, uploadVideoFile } from "../firebaseUtils"; // Use the utility functions
import { TbFlowerOff, TbFlower } from "react-icons/tb";
import "./ManageOrchids.css"
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

import { GoVerified, GoUnverified } from "react-icons/go";
const apiUrl = "https://671b642d2c842d92c37fb1ec.mockapi.io/Orchid";

export default function ManageOrchids() {
    const [orchids, setOrchids] = useState([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingOrchid, setEditingOrchid] = useState(null);
    const [form] = Form.useForm();
    const [imageUrl, setImageUrl] = useState("");
    const [videoUrl, setVideoUrl] = useState("");
    const [fileList, setFileList] = useState([]);
    const [videoFileList, setVideoFileList] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewVideo, setPreviewVideo] = useState("");
    const [loading, setLoading] = useState(false);
    const [isLoadingSubmit, setIsLoadingSubmit] = useState(false);

    // Fetch all orchids
    useEffect(() => {
        fetchOrchids();
    }, []);

    const fetchOrchids = async () => {
        try {
            const response = await axios.get(apiUrl);
            setOrchids(response.data);
        } catch (error) {
            console.error("Error fetching orchids:", error);
        }
    };

    // Show modal for adding/editing
    const showModal = (orchid = null) => {
        setEditingOrchid(orchid);
        setIsModalVisible(true);
        setIsEdit(!!orchid);
        if (orchid) {
            form.setFieldsValue(orchid);
            setImageUrl(orchid.image || ""); // Set initial image URL if editing
            setVideoUrl(orchid.videoUrl || ""); // Set initial video URL if editing
            setPreviewImage(orchid.image || "");
            setPreviewVideo(orchid.videoUrl || "");
        } else {
            form.resetFields();
            setImageUrl("");
            setVideoUrl("");
            setPreviewImage("");
            setPreviewVideo("");
            setFileList([]);
            setVideoFileList([]);
        }
    };

    // Hide modal
    const handleCancel = () => {
        setIsModalVisible(false);
        setEditingOrchid(null);
        setImageUrl("");
        setVideoUrl("");
        setFileList([]);
        setVideoFileList([]);
        setPreviewImage("");
        setPreviewVideo("");
        setIsLoadingSubmit(false);
    };

    // Submit form for POST or PUT
    const handleSubmit = async () => {
        try {
            setIsLoadingSubmit(true);
            await form.validateFields();
            let updatedData = form.getFieldsValue();

            // Kiểm tra nếu có file trong fileList để upload avatar
            if (fileList.length > 0) {
                const file = fileList[0];
                if (file.originFileObj) {
                    // Nếu file là mới (từ input), upload logo mới
                    try {
                        const url = await uploadImageFile(file.originFileObj);
                        updatedData = { ...updatedData, image: url }; // Thêm URL mới vào data
                        setPreviewImage(url);
                    } catch (uploadError) {
                        console.error("Error uploading avatar", uploadError);
                        message.error("Error uploading avatar. Please try again!");
                        setIsLoadingSubmit(false);
                        return;
                    }
                } else {
                    // Nếu file không có originFileObj (tức là ảnh cũ), giữ nguyên URL cũ
                    updatedData = { ...updatedData, image: file.url };
                }
            } else {
                updatedData = { ...updatedData, image: imageUrl }; // Giữ nguyên URL ảnh nếu không có file mới
            }

            // Kiểm tra nếu có file trong videoFileList để upload video
            if (videoFileList.length > 0) {
                const file = videoFileList[0];
                if (file.originFileObj) {
                    // Nếu file là mới (từ input), upload video mới
                    try {
                        const url = await uploadVideoFile(file.originFileObj);
                        updatedData = { ...updatedData, videoUrl: url }; // Thêm URL mới vào data
                        setPreviewVideo(url);
                    } catch (uploadError) {
                        console.error("Error uploading video", uploadError);
                        message.error("Error uploading video. Please try again!");
                        setIsLoadingSubmit(false);
                        return;
                    }
                } else {
                    // Nếu file không có originFileObj (tức là video cũ), giữ nguyên URL cũ
                    updatedData = { ...updatedData, videoUrl: file.url };
                }
            } else {
                updatedData = { ...updatedData, videoUrl }; // Giữ nguyên URL video nếu không có file mới
            }

            if (editingOrchid) {
                // Update (PUT)
                await axios.put(`${apiUrl}/${editingOrchid.id}`, updatedData);
                message.success("Orchid updated successfully!");
            } else {
                // Create (POST)
                await axios.post(apiUrl, updatedData);
                message.success("Orchid added successfully!");
            }
            await fetchOrchids();
            handleCancel();
        } catch (error) {
            message.error("Error while saving orchid!");
            console.error("Error:", error);
            setIsLoadingSubmit(false);
        }
    };

    // Upload Image Handler
    const handleImageUpload = async ({ file }) => {
        try {
            const url = await uploadImageFile(file);
            setImageUrl(url);
            message.success("Image uploaded successfully!");
        } catch (error) {
            message.error("Error uploading image!");
        }
    };

    // Upload Video Handler
    const handleVideoUpload = async ({ file }) => {
        try {
            const url = await uploadVideoFile(file);
            setVideoUrl(url);
            message.success("Video uploaded successfully!");
        } catch (error) {
            message.error("Error uploading video!");
        }
    };

    // Handle file change for image upload
    const handleChange = ({ fileList }) => {
        setFileList(fileList);
    };

    // Handle file change for video upload
    const handleVideoChange = ({ fileList }) => {
        setVideoFileList(fileList);
    };

    // Handle preview for uploaded image
    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getDownloadURL(ref(storage, `images/${file.name}`));
        }
        setPreviewImage(file.url || file.preview);
    };

    const handlePreviewVideo = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getDownloadURL(ref(storage, `videos/${file.name}`));
        }
        setPreviewVideo(file.url || file.preview);
    };

    // Upload button
    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none',
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </button>
    );

    // Handle delete orchid
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${apiUrl}/${id}`);
            message.success("Orchid deleted successfully!");
            fetchOrchids();
        } catch (error) {
            message.error("Error deleting orchid!");
            console.error("Error:", error);
        }
    };

    // Table columns definition
    const columns = [
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Origin",
            dataIndex: "origin",
            key: "origin",
        },
        {
            title: "Color",
            dataIndex: "color",
            key: "color",
        },
        {
            title: "Category",
            dataIndex: "category",
            key: "category",
        },
        {
            title: "Rating",
            dataIndex: "rating",
            key: "rating",
            render: (rating) => <Rate disabled defaultValue={rating} />, // Hiển thị số sao với component Rate
        },
        {
            title: "Special",
            dataIndex: "isSpecial",
            key: "isSpecial",
            render: (isSpecial) => (
                isSpecial ? (
                    <GoVerified size={32} style={{ color: "green", fontWeight: "700" }} />
                ) : (
                    <GoUnverified size={32} style={{ color: "red", fontWeight: "700" }} />
                )
            ),
        },
        {
            title: "Attractive",
            dataIndex: "isAttractive",
            key: "isAttractive",
            render: (isAttractive) => (
                isAttractive ? (
                    <TbFlower size={32} style={{ color: "green", fontWeight: "bold" }} />
                ) : (
                    <TbFlowerOff size={32} style={{ color: "red", fontWeight: "bold" }} />
                )
            ),
        },
        {
            title: "Actions",
            key: "actions",
            render: (text, record) => (
                <>
                    <Button
                        icon={<AiFillEdit />}
                        onClick={() => showModal(record)}
                        style={{ marginRight: 16 }}
                    />
                    <Button
                        icon={<AiFillDelete />}
                        onClick={() => {
                            if (window.confirm("Do you want to delete?")) {
                                handleDelete(record.id);
                            }
                        }}
                        danger
                    />
                </>
            ),
        }
    ];

    return (
        <div style={{ padding: "40px" }}>
            <h1>Manage Orchids</h1>
            <Button type="primary" onClick={() => showModal()} style={{ marginBottom: "20px" }}>
                Add New Orchid
            </Button>
            <Table dataSource={orchids} columns={columns} rowKey="id" />

            <Modal
                title={editingOrchid ? "Edit Orchid" : "Add Orchid"}
                visible={isModalVisible}
                onCancel={handleCancel}
                onOk={handleSubmit}
                confirmLoading={isLoadingSubmit}
                className="custom-modal"
            >
                <Form form={form} className="modal-form" labelCol={{ span: 24 }} >
                    {/* Cột điền thông tin */}
                    <div className="form-column">
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                { required: true, message: "Please input the name!" },
                                { pattern: /^[a-zA-Z\s]+$/, message: "Name should not contain numbers or special characters!" },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="origin"
                            label="Origin"
                            rules={[
                                { required: true, message: "Please input the origin!" },
                                { pattern: /^[a-zA-Z\s]+$/, message: "Origin should not contain numbers or special characters!" },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="color"
                            label="Color"
                            rules={[
                                { required: true, message: "Please input the color!" },
                                { pattern: /^[a-zA-Z\s]+$/, message: "Color should not contain numbers or special characters!" },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="category"
                            label="Category"
                            rules={[
                                { required: true, message: "Please input the category!" },
                                { pattern: /^[a-zA-Z\s]+$/, message: "Category should not contain numbers or special characters!" },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            name="rating"
                            label="Rating"
                            rules={[{ required: true, message: "Please input the rating!" }]}
                        >
                            <Rate count={5} />
                        </Form.Item>
                        <Form.Item name="description" label="Description">
                            <Input.TextArea />
                        </Form.Item>
                    </div>
                    {/* Cột upload hình ảnh, video */}
                    <div className="upload-column">
                        <Form.Item name="isSpecial" label="Special" valuePropName="checked">
                            <Checkbox>Is Special</Checkbox>
                        </Form.Item>
                        <Form.Item name="isAttractive" label="Attractive" valuePropName="checked">
                            <Checkbox>Is Attractive</Checkbox>
                        </Form.Item>
                        <div className="upload-section">
                            {/* Upload Image */}
                            <Form.Item name="avatar">
                                <label>Orchid Image</label>
                                {previewImage && (
                                    <img
                                        className="preview-image"
                                        src={previewImage}
                                    />
                                )}
                                <Upload
                                    listType="picture-card"
                                    fileList={fileList}
                                    onPreview={handlePreview}
                                    onChange={handleChange}
                                    beforeUpload={() => false}
                                    customRequest={handleImageUpload}
                                >
                                    {fileList.length === 0 ? uploadButton : null}
                                </Upload>
                                <div>Allowed JPG, GIF or PNG.</div>
                            </Form.Item>

                            {/* Upload Video */}
                            <Form.Item name="video">
                                <label>Upload Video</label>
                                {previewVideo && (
                                    <video
                                        className="preview-video"
                                        src={previewVideo}
                                        controls
                                    />
                                )}
                                <Upload
                                    listType="picture-card"
                                    fileList={videoFileList}
                                    onPreview={handlePreviewVideo}
                                    onChange={handleVideoChange}
                                    beforeUpload={() => false}
                                    customRequest={handleVideoUpload}
                                >
                                    {videoFileList.length === 0 ? uploadButton : null}
                                </Upload>
                                <div>Allowed MP4, AVI, MOV.</div>
                            </Form.Item>
                        </div>
                    </div>
                </Form>
            </Modal>
        </div>
    );
}
