export default function ParentOverview() {
  return (
    <main className="main">
      <div className="main__header">
        <h1>Кабінет батьків</h1>
      </div>

      <div className="card">
        <h2>Дитина: Петренко Андрій</h2>
        <p>Клас: 7-Б</p>
        <p>Середній бал: 9.1</p>
        <p>Відвідуваність: 95%</p>
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
              <td>Математика</td>
              <td>10</td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}
