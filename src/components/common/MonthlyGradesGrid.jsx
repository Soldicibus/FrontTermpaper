import React, { useState, useMemo } from "react";
import { useStudentMonthlyMarks } from "../../hooks/students/queries/useStudentMonthlyMarks";
import { useUpdateStudentData } from "../../hooks/studentdata/mutations/useUpdateStudentData"; 

export default function MonthlyGradesGrid({ studentId, isEditable = false }) {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });

  const { data: marksData, isLoading, error } = useStudentMonthlyMarks(studentId, selectedMonth + "-01");
  const updateStudentData = useUpdateStudentData();

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const daysInMonth = useMemo(() => {
    const [year, month] = selectedMonth.split('-');
    return new Date(year, month, 0).getDate();
  }, [selectedMonth]);

  const daysArray = useMemo(() => {
    const arr = [];
    for (let i = 1; i <= daysInMonth; i++) {
        arr.push(i);
    }
    return arr;
  }, [daysInMonth]);

  const gridData = useMemo(() => {
    if (!marksData) return {};
    
    // Group by Subject
    // row: subject -> col: day -> value: formatted mark/item
    const grouped = {};
    
    marksData.forEach(item => {
        if (!item.subject_name) return;
        if (!grouped[item.subject_name]) {
            grouped[item.subject_name] = {};
        }
        
        const date = new Date(item.lesson_date);
        const day = date.getDate();
        
        // Handle multiple marks per day? Usually array. For now assume one or overwrite.
        // Let's store an array to be safe
        if (!grouped[item.subject_name][day]) {
            grouped[item.subject_name][day] = [];
        }
        grouped[item.subject_name][day].push(item);
    });
    
    return grouped;
  }, [marksData]);

  const subjects = useMemo(() => Object.keys(gridData).sort(), [gridData]);

  const handleMarkClick = (item) => {
    if (!isEditable) return;
    
    const newMark = prompt("Редагувати оцінку:", item.mark);
    if (newMark !== null && newMark !== item.mark) {
        // Validation could go here
        updateStudentData.mutate({
            id: item.data_id,
            mark: newMark,
            // Preserve other fields if needed, but update usually takes ID and changes
            student_id: item.student_id, // often needed for validation or cache invalidation context
            lesson_id: item.lesson_id
        }, {
           onSuccess: () => {
             // Query invalidation handles refresh
           }
        });
    }
  };

  if (!studentId) return null;

  return (
    <div className="card" style={{ marginTop: 20, overflowX: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
        <h3>Місячні оцінки</h3>
        <input 
            type="month" 
            value={selectedMonth} 
            onChange={handleMonthChange}
            style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
      </div>

      {isLoading && <div>Завантаження...</div>}
      {error && <div style={{color: 'red'}}>Помилка завантаження: {error.message}</div>}

      {!isLoading && !error && (
          <table className="monthly-grades-table" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
            <thead>
                <tr>
                    <th style={{ textAlign: 'left', padding: '8px', borderBottom: '1px solid #eee', minWidth: '150px' }}>Предмет</th>
                    {daysArray.map(d => (
                        <th key={d} style={{ padding: '8px', borderBottom: '1px solid #eee', minWidth: '30px', textAlign: 'center' }}>{d}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {subjects.length === 0 ? (
                    <tr>
                        <td colSpan={daysInMonth + 1} style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
                            Немає оцінок за цей місяць
                        </td>
                    </tr>
                ) : (
                    subjects.map(subject => (
                        <tr key={subject} style={{ borderBottom: '1px solid #f9f9f9' }}>
                            <td style={{ padding: '8px', fontWeight: '500' }}>{subject}</td>
                            {daysArray.map(d => {
                                const items = gridData[subject][d] || [];
                                return (
                                    <td key={d} style={{ padding: '4px', textAlign: 'center', verticalAlign: 'middle' }}>
                                        {items.map((item, idx) => {
                                            const color = ["П", "Присутній"].includes(item.status) ? "limegreen" :
                                                          ["Н", "Не присутній"].includes(item.status) ? "red" : "inherit";
                                            return (
                                                <div 
                                                    key={idx}
                                                    onClick={() => handleMarkClick(item)}
                                                    style={{ 
                                                        color: color, 
                                                        fontWeight: 'bold', 
                                                        cursor: isEditable ? 'pointer' : 'default',
                                                        display: 'inline-block',
                                                        margin: '0 2px'
                                                    }}
                                                    title={item.note || undefined}
                                                >
                                                    {item.mark}
                                                </div>
                                            );
                                        })}
                                    </td>
                                );
                            })}
                        </tr>
                    ))
                )}
            </tbody>
          </table>
      )}
    </div>
  );
}
