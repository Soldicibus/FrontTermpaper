import React from 'react';
import DataTable from '../../../common/DataTable';
import { useHomework } from '../../../../hooks/homework/queries/useHomework';
import { useAdminPermissions } from '../../../../hooks/useAdminPermissions';

export default function HomeworkTable() {
  const { data: homework, isLoading } = useHomework();
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
      title="Homework"
      data={homework}
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
