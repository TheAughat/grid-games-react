import {useState, useEffect} from "react";
import './styles/main-page.css';
import TileRotationMenu from "./tile-rotation-menu/TileRotationMenu";

const MainPage = () => {

    return (
        <div className="main-container">
            <TileRotationMenu/>
        </div>
    );
};

export default MainPage;
