import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Card } from "antd";
import "./Content.css";
import { ThemeContext } from './ThemeContext';
import { useNavigate } from "react-router-dom";

const { Meta } = Card;

export default function Content() {
  const [orchids, setOrchids] = useState([]); // State to store fetched orchids
  const [selectedOrchid, setSelectedOrchid] = useState(null);
  const { theme, toggle, dark } = useContext(ThemeContext);
  const navigate = useNavigate();

  // Fetch data from the API
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
  }, []); // Empty dependency array means this will run only once on mount

  // Open modal when clicking on a card and navigate to ContentInfo
  const openModal = (orchid) => {
    setSelectedOrchid(orchid);
    navigate('/contentinfo', { state: { orchid } }); // Navigate to ContentInfo and pass selected orchid
  };

  return (
    <div className="containercontent" style={{ backgroundImage: theme.backgroundImage, color: theme.color }}>
      <div className="orchids-grid">
        {orchids.map((orchid) => (
          <div key={orchid.id} className="Card2" onClick={() => openModal(orchid)}>
            {orchid.isSpecial && <span className="special-badge">Special</span>}
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
                    <p style={{ color: theme.color }}>Origin: {orchid.origin}</p>
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
