import './mainPage.css'
import { Link, Outlet } from "react-router-dom";
import logo from './../../assets/live-chat.png'
import { useContext, useRef, useState } from 'react';

export default function MainPage() {
    return (
        <div className="main-page">
            <ul>
                <li>
                    <Link to = "profile"></Link>
                </li>
            </ul>
        </div>
    )
}