import { useState, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { useLocation } from 'react-router-dom';
import { Button, Modal } from 'antd';  // Import Modal
import "./ContentInfo.css";

function ContentInfo() {
    const location = useLocation();
    const { orchid } = location.state;
    const { theme } = useContext(ThemeContext);
    const [modal, contextHolder] = Modal.useModal(); // Ant Design modal hook

    return (
        <div className="ContainerInfo" style={{ backgroundImage: theme.backgroundImage, color: theme.color }}>
            <div className="popup">
                <div className="popup-info">
                    <h2 style={{ color: theme.color }}>{orchid.name}</h2>
                    <img src={orchid.image} alt={orchid.name} />
                    <div className="info">
                        <p style={{ color: theme.color }}>Origin: {orchid.origin}</p>
                        <p style={{ color: theme.color }}>Color: {orchid.color}</p>
                        <p style={{ color: theme.color }}>Category: {orchid.category}</p>
                        <p style={{ color: theme.color }}>Rating: {orchid.rating}</p>
                    </div>
                    <div className='btn'>
                        <Button
                            onClick={() => {
                                modal.info({
                                    title: orchid.name, // Use orchid name dynamically
                                    content: (
                                        <>
                                            <p>
                                                {orchid.description}
                                            </p>
                                            <br />
                                            <iframe
                                                width="550"
                                                height="300"
                                                src={`${orchid.videoUrl}?autoplay=1&mute=1`}
                                                allowFullScreen
                                            ></iframe>
                                        </>
                                    ),
                                });


                            }}
                            style={{ backgroundColor: theme.backgroundColor, color: 'grey' }}
                        >
                            Info
                        </Button>
                    </div>
                </div>
            </div>
            {contextHolder} {/* Context holder for the modal */}
        </div>
    );
}

export default ContentInfo;
