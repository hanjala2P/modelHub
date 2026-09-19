import { Outlet } from "react-router";
import Navbar from "./Navbar/Navbar";
import Footer from "./Footer/Footer";


const Root = () => {
    return (
        <div>
            <Navbar></Navbar>
            <main className="min-h-screen mx-6 ">
            <Outlet></Outlet>
            </main>
            <Footer></Footer>

        </div>
    );
};

export default Root;