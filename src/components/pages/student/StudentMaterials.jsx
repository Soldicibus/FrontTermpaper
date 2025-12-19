import React from "react";
import { useMaterials } from "../../../hooks/materials/queries/useMaterials";
import { getCurrentUserClass } from "../../../utils/auth";

export default function StudentMaterials({ studentClass: propStudentClass }) {
  const { data: materials, isLoading } = useMaterials();
  const studentClass = propStudentClass || getCurrentUserClass();
  let list = Array.isArray(materials) && materials.length ? materials : [];

  return (
    <div>
      <div className="materials-grid">
       {isLoading && <div>Завантаження матеріалів...</div>}
       {!isLoading && list.length === 0 && <div className="empty-state">Немає доступних матеріалів</div>}
       {!isLoading && list.map(m => (
         <article key={m.material_id ?? m.id ?? Math.random()} className="material-card small">
           <h3>{m.material_name || m.name || m.title}</h3>
           {m.material_desc && <p style={{ marginTop: 6, color: '#bbbbbbff' }}>{m.material_desc}</p>}
           <div style={{marginTop:8}}>
             <a className="btn btn-ghost" href={m.material_link || m.link || '#'} target="_blank" rel="noopener noreferrer">Відкрити</a>
           </div>
         </article>
       ))}
     </div>
    </div>
   );
 }
