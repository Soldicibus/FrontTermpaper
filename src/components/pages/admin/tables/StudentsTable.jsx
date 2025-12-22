import React from 'react';
import DataTable from '../../../common/DataTable';
import { useStudents } from '../../../../hooks/students/queries/useStudents';
import { useAdminPermissions } from '../../../../hooks/useAdminPermissions';

export default function StudentsTable() {
  const { data: students, isLoading } = useStudents();
  const { permissions } = useAdminPermissions();

  const handleEdit = (item) => {
    console.log('Edit student', item);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Delete student ${item.id}?`)) {
      console.log('Delete student', item);
    }
  };

  const handleCreate = () => {
    console.log('Create student');
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'User ID', accessor: 'user_id' },
    { header: 'Class ID', accessor: 'class_id' },
    // Add more columns as needed
  ];

  return (
    <DataTable
      title="Students"
      data={students}
      columns={columns}
      isLoading={isLoading}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
      canEdit={permissions.students.edit}
      canDelete={permissions.students.delete}
      canCreate={permissions.students.create}
    />
  );
}
