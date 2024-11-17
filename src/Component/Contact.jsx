import React, { useState } from "react";
import { Form, Input, Button } from "antd";
import "./Contact.css"; // You can style this page separately

export default function Contact() {
    const [form] = Form.useForm();
    const [formSubmitted, setFormSubmitted] = useState(false);

    // Handle form submission
    const onFinish = (values) => {
        console.log("Form data: ", values);
        setFormSubmitted(true); // Set state to show success message
        form.resetFields(); // Reset form fields
    };

    // Handle form submission failure
    const onFinishFailed = (errorInfo) => {
        console.log("Failed:", errorInfo);
    };

    return (
        <div className="contact-container">
            <div className="contact">
                <h1>Contact Us</h1>
                {formSubmitted ? (
                    <p>Thank you for contacting us! We'll get back to you soon.</p>
                ) : (
                    <Form
                        form={form}
                        name="contact"
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                    >
                        {/* Name Input */}
                        <Form.Item
                            label="Your Name"
                            name="name"
                            rules={[{ required: true, message: "Please input your name!" }]}
                        >
                            <Input placeholder="Enter your name" />
                        </Form.Item>

                        {/* Email Input */}
                        <Form.Item
                            label="Your Email"
                            name="email"
                            rules={[
                                { required: true, message: "Please input your email!" },
                                { type: "email", message: "Please enter a valid email!" },
                            ]}
                        >
                            <Input placeholder="Enter your email" />
                        </Form.Item>

                        {/* Message Input */}
                        <Form.Item
                            label="Message"
                            name="message"
                            rules={[{ required: true, message: "Please input your message!" }]}
                        >
                            <Input.TextArea rows={4} placeholder="Write your message here" />
                        </Form.Item>

                        {/* Submit Button */}
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                )}
            </div>
            <div>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.1638897334087!2d106.79814837355335!3d10.875136457368269!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174d8a6b19d6763%3A0x143c54525028b2e!2zTmjDoCBWxINuIGjDs2EgU2luaCB2acOqbiBUUC5IQ00!5e0!3m2!1svi!2s!4v1728111537233!5m2!1svi!2s" width="600" height="450" ></iframe>
            </div>
        </div>
    );
}
