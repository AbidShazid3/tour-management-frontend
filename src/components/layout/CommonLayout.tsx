import type { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./NavBar";

interface IProps {
    children: ReactNode
}

const CommonLayout = ({children}: IProps) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
            <Footer></Footer>
        </div>
    );
};

export default CommonLayout;