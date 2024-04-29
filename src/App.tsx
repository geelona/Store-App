import { Outlet } from "react-router-dom";
import Header from "./components/header/header";
import "./App.scss";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function App() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/");
    }, []);

    return (
        <div className="flex flex-col h-screen">
            <Header />
            <div className="body-margin-box flex flex-col h-full">
                <Outlet />
            </div>
        </div>
    );
}

export default App;
