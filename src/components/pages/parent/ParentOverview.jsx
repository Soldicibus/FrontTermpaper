import React from "react";

export default function ParentOverview() {
  return (
    <main className="main">
      <div className="main__header">
        <h1>Кабінет батьків</h1>
      </div>

      <div className="card">
        <h2>Дитина: Чуківський Микола</h2>
        <p>Клас: 11-А</p>
        <p>Середній бал: 12</p>
        <p>Відвідуваність: 500%</p>
      </div>

      <div className="card">
        <h2>Оцінки</h2>
        <table className="data-table">
          <thead>
            <tr>
              <th>Предмет</th>
              <th>Оцінка</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Анонізм</td>
              <td>12</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
