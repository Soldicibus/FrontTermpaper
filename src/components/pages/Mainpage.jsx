import React, { useEffect } from "react";
import "./css/Mainpage.css";
import { Link } from "react-router-dom";

export default function Mainpage() {
    return (
        <main className="main">
            <div className="main__header">
                <h1 className="main__title">Навчасно</h1>
                <p className="main__subtitle">Освітня екосистема для учнів, вчителів та батьків</p>
                <p className="main__subtitle">Підтримка школи у цифровому форматі. Ні бюрократії!</p>
                <p className="main__subtitle">Натхнення для навчання кожного дня</p>
                <p className="main__subtitle">Щоб почати — увійдіть до системи.</p>
            </div>

            <section className="main__content">
                <div className="cardy student">
                    <h2>Учням</h2>
                    <p>Оцінки, розклад, домашні завдання</p>
                    <Link to="/auth"><button>Увійти</button></Link>
                </div>

                <div className="cardy teacher">
                    <h2>Вчителям</h2>
                    <p>Журнали, класи, навчальні матеріали</p>
                    <Link to="/auth"><button>Увійти</button></Link>
                </div>

                <div className="cardy parent">
                    <h2>Батькам</h2>
                    <p>Успішність та відвідування</p>
                    <Link to="/auth"><button>Увійти</button></Link>
                </div>
            </section>

            <section className="features">
                <h2 className="features__title">Що ми пропонуємо</h2>
                <div className="features__grid">
                    <article className="feature reveal reveal-left" data-delay="0s">
                        <img src="/logo.avif" alt="Швидкий доступ" />
                        <h3>Швидкий доступ</h3>
                        <p>Всі потрібні дані завжди під рукою: розклад, оцінки та сповіщення.</p>
                    </article>

                    <article className="feature reveal" data-delay="150ms">
                        <img src="/logo.avif" alt="Інтерактивні журнали" />
                        <h3>Інтерактивні журнали</h3>
                        <p>Вчителі можуть швидко вести журнал та ділитися матеріалами.</p>
                    </article>

                    <article className="feature reveal reveal-right" data-delay="300ms">
                        <img src="/logo.avif" alt="Аналітика успішності" />
                        <h3>Аналітика успішності</h3>
                        <p>Батьки й вчителі бачать прогрес учня та ключові показники.</p>
                    </article>
                </div>
            </section>

        </main>
    );
}
