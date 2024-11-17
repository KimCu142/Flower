import { Card } from "antd";
import { ThemeContext } from './ThemeContext';
import "./Content.css";
import  { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios";


const { Meta } = Card;

export default function Origin() {
    const { theme } = useContext(ThemeContext);
    const [orchids, setOrchids] = useState([]); // State to store fetched orchids

    const [selectedOrchid, setSelectedOrchid] = useState(null);
    const navigate = useNavigate(); // Initialize navigate here
    const openModal = (orchid) => {
        setSelectedOrchid(orchid);
        navigate('/contentinfo', { state: { orchid } }); // Navigate to ContentInfo and pass selected orchid
    };

    useEffect(() => {
        const fetchOrchids = async () => {
          try {
            const response = await axios.get("https://671b642d2c842d92c37fb1ec.mockapi.io/Orchid");
            setOrchids(response.data); // Update the state with the fetched data
          } catch (error) {
            console.error("Error fetching orchids:", error);
          }
        };
        fetchOrchids();
      }, []);
    // Filter orchids that are special
    // eslint-disable-next-line react/prop-types
    const specialOrchids = orchids.filter(orchid => orchid.isSpecial);

    return (
        <div className="containercontent" style={{ backgroundImage: theme.backgroundImage, color: theme.color }}>
            <div className="orchids-grid">
                {specialOrchids.map((orchid) => (
                    <div key={orchid.id} className="Card2" onClick={() => openModal(orchid)}>
                        <Card
                            className="custom-card"
                            style={{ width: 300, height: "95%" }}
                            cover={
                                <img
                                    alt={orchid.name}
                                    src={orchid.image}
                                    style={{ height: "300px", objectFit: "cover" }}
                                />
                            }
                        >
                            <Meta
                                title={<span style={{ color: theme.color }}>{orchid.name}</span>}
                                description={
                                    <>
                                        <p style={{ color: theme.color }}> Origin: {orchid.origin}</p>
                                        <p style={{ color: theme.color }}>Color: {orchid.color}</p>
                                        <p style={{ color: theme.color }}>Category: {orchid.category}</p>
                                        <p style={{ color: theme.color }}>Rating: {orchid.rating}</p>
                                    </>
                                }
                            />
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}
