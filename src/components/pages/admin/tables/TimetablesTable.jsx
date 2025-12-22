import React from 'react';
import DataTable from '../../../common/DataTable';
import { useTimetables } from '../../../../hooks/timetables/queries/useTimetables';
import { useAdminPermissions } from '../../../../hooks/useAdminPermissions';

export default function TimetablesTable() {
  const { data: timetables, isLoading } = useTimetables();
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
      title="Timetables"
      data={timetables}
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
