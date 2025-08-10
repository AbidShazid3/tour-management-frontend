import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";


const Verify = () => {
    const location = useLocation();
    const [email] = useState(location.state);
    const navigate = useNavigate();

    useEffect(() => {
        if (!email) {
            navigate('/')
        }
    }, [email, navigate]); 

    return (
        <div>
            <h1>this is verify page</h1>
        </div>
    );
};

export default Verify;