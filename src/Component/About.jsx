import { Card } from 'antd';
import './About.css';
import { ThemeContext } from './ThemeContext';
import  {  useContext } from "react";


const About = () => {
    const { theme, toggle, dark } = useContext(ThemeContext);

    return (
        <div className="about-container " style={{ backgroundImage: theme.backgroundImage, color: theme.color }}>
            <div>
            <h1 style={{color: theme.color}}>About Our Orchid Marketplace</h1>
            <Card className="about-card" style={{color: theme.color}}>
                <p>
                    Welcome to our Orchid Marketplace, where beauty and nature converge in perfect harmony!
                    We specialize in offering a wide variety of exquisite orchids, carefully curated from expert breeders around the world.
                </p>

                <p>
                    Our platform is designed to bring together orchid enthusiasts, hobbyists, and professional growers, providing a space to buy, sell, and auction these stunning plants.
                    Whether you're looking for a rare species or just starting your orchid collection, we have something for everyone.
                </p>

                <p>
                    We pride ourselves on delivering high-quality service and ensuring the health and beauty of every orchid sold through our marketplace. With features like real-time auctions and detailed care instructions, we aim to cultivate a community passionate about the art of orchid growing.
                </p>

                <p>
                    Thank you for being part of our growing community. We hope your experience with us is as beautiful and unique as the orchids we offer.
                </p>
            </Card>
        </div></div>
    );
};

export default About;
