import loadingImg from "../assets/black-oop.svg";
import {useEffect, useState} from "react";
import "./MainPageLoading.css"

export default function MainPageLoading  ({ loading }) {
    const [loadingTextIndex, setLoadingTextIndex] = useState(0);
    const loadingTexts = [
        "Fetching data...",
        "Finding information...",
        "Loading the page...",
        "Painting the system..."
    ];

    useEffect(() => {
        let intervalId;
        if (loading) {
            intervalId = setInterval(() => {
                setLoadingTextIndex(prevIndex =>
                    (prevIndex + 1) % loadingTexts.length
                );
            }, 700);
        } else {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [loading, loadingTexts.length]);

    if (loading) {
        return (
            <div className="no-chosen-chat-wrapper">
                <div className="no-tools-message-wrapper">
                    <img src={loadingImg} alt="loading"/>
                    <span className="no-tools-message-title">
            {loadingTexts[loadingTextIndex]}
          </span>
                </div>
            </div>

        );
    }
}