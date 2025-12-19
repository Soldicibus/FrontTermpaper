import React from "react";
import { useUsers } from "../../../hooks/users/queries/useUsers";
import { useClasses } from "../../../hooks/classes/queries/useClasses";

export default function AdminPanel() {
  const { data: users, isLoading } = useUsers();
  const { data: classes } = useClasses();

  return (
    <main className="main">
      <div className="main__header">
        <h1>Панель адміністратора</h1>
      </div>

      <div className="main__content">
        <div className="card">
          <h2>Користувачі</h2>
          <p>{isLoading ? 'Завантаження...' : `Загалом: ${users?.length ?? 0}`}</p>
          <button>Керувати</button>
        </div>

        <div className="card">
          <h2>Журнали</h2>
          <button>Відкрити</button>
        </div>

        <div className="card">
          <h2>Класи</h2>
          <p>{`Загалом: ${classes?.length ?? 0}`}</p>
          <button>Редагувати</button>
        </div>
      </div>
    </main>
  );
}
