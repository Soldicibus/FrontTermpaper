import React from 'react';
import DataTable from '../../../common/DataTable';
import { useParents } from '../../../../hooks/parents/queries/useParents';
import { useAdminPermissions } from '../../../../hooks/useAdminPermissions';

export default function ParentsTable() {
  const { data: parents, isLoading } = useParents();
  const { permissions } = useAdminPermissions();

  const handleEdit = (item) => { console.log('Edit', item); };
  const handleDelete = (item) => { console.log('Delete', item); };
  const handleCreate = () => { console.log('Create'); };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'User ID', accessor: 'user_id' },
    // Add more columns
  ];

  return (
    <DataTable
      title="Parents"
      data={parents}
      columns={columns}
      isLoading={isLoading}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
      canEdit={permissions.parents.edit}
      canDelete={permissions.parents.delete}
      canCreate={permissions.parents.create}
    />
  );
}
