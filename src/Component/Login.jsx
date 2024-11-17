import React, { useEffect } from 'react';
import GoogleButton from 'react-google-button';
import { UserAuth } from '../context/AuthConext';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const { googleSignIn, user } = UserAuth();
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
        } catch (error) {
            console.error('Google Sign-In Error:', error);
        }
    };

    useEffect(() => {
        if (user) {
            navigate('/dashboard');
        }
    }, [user, navigate]); // Added navigate to the dependency array

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <div>
               
                <GoogleButton onClick={handleGoogleSignIn} />
            </div>
        </div>
    );
}
