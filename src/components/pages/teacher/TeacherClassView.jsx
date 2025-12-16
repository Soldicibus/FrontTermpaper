import React from "react";

export default function TeacherClassView() {
  return (
    <main className="main">
      <h1>7-Б клас</h1>

      <section className="card">
        <h2>Учні</h2>
        <ul>
          <li>Петренко Андрій</li>
          <li>Іванова Марія</li>
        </ul>
      </section>

      <section className="card">
        <h2>Дії</h2>
        <button>Журнал</button>
        <button>Уроки</button>
        <button>Розклад</button>
      </section>
    </main>
  );
}
