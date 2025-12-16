// Mock data representing DB views (for UI-only demo)
export const vw_teachers_with_classes = [
  { teacher_id: 1, teacher_name: 'Ольга', teacher_surname: 'Іванова', class_name: '10A' },
  { teacher_id: 2, teacher_name: 'Петро', teacher_surname: 'Коваль', class_name: '9B' },
  { teacher_id: 1, teacher_name: 'Ольга', teacher_surname: 'Іванова', class_name: '11C' },
];

export const vw_students_by_class = [
  { student_id: 1, student_name: 'Марія', student_surname: 'Петренко', student_class: '10A' },
  { student_id: 2, student_name: 'Іван', student_surname: 'Сидоренко', student_class: '10A' },
  { student_id: 3, student_name: 'Олег', student_surname: 'Мельник', student_class: '9B' },
];

export const vw_homework_tomorrow = [
  { homework_id: 11, homework_name: 'Математика: домашнє', homework_desc: 'Розв’язати задачі 1-10', homework_class: '10A' },
  { homework_id: 12, homework_name: 'Українська мова: вправи', homework_desc: 'С. 45, вправа 5', homework_class: '9B' },
];

export const vw_class_attendance_last_month = [
  { student_class: '10A', attendance_percent: 95.5 },
  { student_class: '9B', attendance_percent: 88.3 },
];

export const vw_homework_by_student_or_class = [
  { student_id: 1, student_name: 'Марія', homework_name: 'Математика: домашнє', homework_desc: 'Розв’язати задачі 1-10', homework_duedate: '2025-06-10' },
  { student_id: 2, student_name: 'Іван', homework_name: 'Історія: проект', homework_desc: 'Презентація', homework_duedate: '2025-06-12' },
];

export const vw_class_ranking = [
  { student_class: '10A', students_count: 28, avg_mark: 8.9, rank_position: 1 },
  { student_class: '9B', students_count: 26, avg_mark: 7.4, rank_position: 2 },
];

export const vw_student_ranking = [
  { student_id: 1, student_name: 'Марія', student_class: '10A', avg_mark: 9.4, class_rank: 1 },
  { student_id: 2, student_name: 'Іван', student_class: '10A', avg_mark: 8.6, class_rank: 3 },
  { student_id: 3, student_name: 'Олег', student_class: '9B', avg_mark: 7.8, class_rank: 2 },
];

export const students_avg_above_7 = [
  { student_id: 1, avg_mark: 9.4 },
  { student_id: 2, avg_mark: 8.6 },
];
