import React from 'react';
import DataTable from '../../../common/DataTable';
import { useLessons } from '../../../../hooks/lessons/queries/useLessons';
import { useAdminPermissions } from '../../../../hooks/useAdminPermissions';

export default function LessonsTable() {
  const { data: lessons, isLoading } = useLessons();
  const { permissions } = useAdminPermissions();

  const handleEdit = (item) => { console.log('Edit', item); };
  const handleDelete = (item) => { console.log('Delete', item); };
  const handleCreate = () => { console.log('Create'); };

  const columns = [
    { header: 'ID', accessor: 'id' },
    // Add more columns
  ];

  return (
    <DataTable
      title="Lessons"
      data={lessons}
      columns={columns}
      isLoading={isLoading}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
      canEdit={permissions.others.edit}
      canDelete={permissions.others.delete}
      canCreate={permissions.others.create}
    />
  );
}
