export default function AdminPanel() {
  return (
    <main className="main">
      <div className="main__header">
        <h1>Панель адміністратора</h1>
      </div>

      <div className="main__content">
        <div className="card">
          <h2>Користувачі</h2>
          <button>Керувати</button>
        </div>

        <div className="card">
          <h2>Журнали</h2>
          <button>Відкрити</button>
        </div>

        <div className="card">
          <h2>Класи</h2>
          <button>Редагувати</button>
        </div>
      </div>
    </main>
  );
}
