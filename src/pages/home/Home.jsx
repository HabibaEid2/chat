import { Outlet } from "react-router-dom";
import MainBar from "../../components/main-bar/MainBar";

export default function Home() {
    return (
        <div className="home">
            <MainBar/>
            <Outlet/>
        </div>
    )
}