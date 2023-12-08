// AutoNavigate.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSession } from '../auth/SessionContext';

const AutoNavigate = () => {
    const navigate = useNavigate();
    const { userId } = useSession();
    const loginId = sessionStorage.getItem('userId');

    const id = loginId === 0 ? userId : loginId;


    useEffect(() => {
        PageNavigate();
    }, []);

    const PageNavigate = () => {

        if (id === "0") {

            const timeoutId = setTimeout(() => {
                // Navigate to the login page after 3 seconds
                navigate('/');
            }, 5000);

            return () => clearTimeout(timeoutId);
        } else {

            const timeoutId = setTimeout(() => {
                // Navigate to the home page after 3 seconds
                navigate('/home');
            }, 5000);

            // Clear the timeout on component unmount
            return () => clearTimeout(timeoutId);
        }

    }
    

};

export default AutoNavigate;
