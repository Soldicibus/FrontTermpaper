import React from 'react';
import DataTable from '../../../common/DataTable';
import { useDays } from '../../../../hooks/days/queries/useDays';
import { useAdminPermissions } from '../../../../hooks/useAdminPermissions';

export default function DaysTable() {
  const { data: days, isLoading } = useDays();
  const { permissions } = useAdminPermissions();

  const handleEdit = (item) => { console.log('Edit', item); };
  const handleDelete = (item) => { console.log('Delete', item); };
  const handleCreate = () => { console.log('Create'); };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    // Add more columns
  ];

  return (
    <DataTable
      title="Days"
      data={days}
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
