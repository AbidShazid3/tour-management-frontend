import { Link } from "react-router";


const Unauthorized = () => {
    return (
        <div>
            <h1>Your are not authorized</h1>
            <Link to='/'>Home</Link>
        </div>
    );
};

export default Unauthorized;