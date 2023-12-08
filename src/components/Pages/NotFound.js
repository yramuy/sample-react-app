import React from "react";
import { NavLink } from "react-router-dom";
import { useSession } from "../auth/SessionContext";
import AutoNavigate from "./AutoNavigate";

const NotFound = () => {

    const { userId } = useSession();
    const loginId = sessionStorage.getItem('userId');

    const id = loginId === 0 ? userId : loginId;

    return (
        <div style={{ marginTop: '40vh' }}>
            <h1>404 NotFound</h1>
            <h2>Auto Navigate Page</h2>
            {
                id === "0" ?
                    (<div>
                        
                        <p>This page will automatically navigate to the login page after 5 seconds.</p>
                    </div>) :
                    (
                        <div>
                            
                            <p>This page will automatically navigate to the home page after 5 seconds.</p>
                        </div>
                    )
            }

            <AutoNavigate />

        </div>
    );
};

export default NotFound;