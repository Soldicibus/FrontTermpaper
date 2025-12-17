import React from "react";
import { useClass } from "../../../hooks/useStudents";
import { useParams } from 'react-router-dom';

export default function TeacherClassView() {
  const { id } = useParams();
  const { data: myClass, isLoading } = useClass(id);

  return (
    <main className="main">
      <h1>{myClass ? myClass.name : 'Клас'}</h1>

      <section className="card">
        <h2>Учні</h2>
        <ul>
          {myClass && myClass.students ? myClass.students.map(s => <li key={s.id}>{s.name} {s.surname}</li>) : (
            <>
              <li>Петренко Андрій</li>
              <li>Іванова Марія</li>
            </>
          )}
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
