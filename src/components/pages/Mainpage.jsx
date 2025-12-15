import React, { useEffect } from "react";
import "./css/Mainpage.css";

export default function Mainpage() {
    useEffect(() => {
        const revealEls = document.querySelectorAll('.reveal');
        if (!revealEls.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const delay = el.dataset.delay || '0s';
                    el.style.setProperty('--delay', delay);
                    el.classList.add('in-view');
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.15 });

        revealEls.forEach(el => observer.observe(el));
        return () => observer.disconnect();
    }, []);

    return (
        <main className="main">
            <div className="main__header">
                <h1 className="main__title">Навчасно</h1>
                <p className="main__subtitle">Освітня екосистема для учнів, вчителів та батьків</p>
                <p className="main__subtitle">Підтримка школи у цифровому форматі</p>
                <p className="main__subtitle">Натхнення для навчання кожного дня</p>
            </div>

            <section className="main__content">
                <div className="card student">
                    <h2>Учням</h2>
                    <p>Оцінки, розклад, домашні завдання</p>
                    <button>Увійти</button>
                </div>

                <div className="card teacher">
                    <h2>Вчителям</h2>
                    <p>Журнали, класи, навчальні матеріали</p>
                    <button>Увійти</button>
                </div>

                <div className="card parent">
                    <h2>Батькам</h2>
                    <p>Успішність та відвідування</p>
                    <button>Увійти</button>
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
