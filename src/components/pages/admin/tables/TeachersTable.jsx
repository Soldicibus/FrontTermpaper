import React from 'react';
import DataTable from '../../../common/DataTable';
import { useTeachers } from '../../../../hooks/teachers/queries/useTeachers';
import { useAdminPermissions } from '../../../../hooks/useAdminPermissions';

export default function TeachersTable() {
  const { data: teachers, isLoading } = useTeachers();
  const { permissions } = useAdminPermissions();

  const handleEdit = (item) => {
    console.log('Edit teacher', item);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Delete teacher ${item.id}?`)) {
      console.log('Delete teacher', item);
    }
  };

  const handleCreate = () => {
    console.log('Create teacher');
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'User ID', accessor: 'user_id' },
    // Add more columns as needed
  ];

  return (
    <DataTable
      title="Teachers"
      data={teachers}
      columns={columns}
      isLoading={isLoading}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
      canEdit={permissions.teachers.edit}
      canDelete={permissions.teachers.delete}
      canCreate={permissions.teachers.create}
    />
  );
}
