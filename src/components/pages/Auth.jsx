import React, { useEffect } from "react";
import "./css/Auth.css";

export default function Auth() {
    useEffect(() => {
        // Any side effects for the Auth page can be handled here
    }, []);
    return (
        <main className="auth">
            <div className="auth__header">
                <h1>Авторизація</h1>
                <form className="auth__content">
                    <label htmlFor="username">Ім'я користувача чи електронна пошта:</label>
                    <input type="text" id="username" name="username" required />
                    <label htmlFor="password">Пароль:</label>
                    <input type="password" id="password" name="password" required />
                    <br />
                    <button type="submit">Увійти</button>
                </form>
            </div>
        </main>
    );
}