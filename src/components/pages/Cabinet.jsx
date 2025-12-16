import React, { useEffect } from "react";
import "./css/Mainpage.css";

export default function Cabinet() {
    useEffect(() => {
        // Any side effects for the Cabinet page can be handled here
    }, []);
    return (
        <main className="main">
            <div className="main__header">
                <h1>Особистий кабінет</h1>
            </div>
            <div className="main__content">
                <div className="card cabinet-info">
                    <h2>Інформація про користувача</h2>
                    <p>Ім'я: TEMP</p>
                    <p>Прізвище: TEMP</p>
                    <p>По-батькові: TEMP</p>
                    <p>Пошта: TEMP</p>
                    <p>Телефон: TEMP</p>
                    <button>Вийти</button>
                </div>
            </div>
        </main>
    );
}