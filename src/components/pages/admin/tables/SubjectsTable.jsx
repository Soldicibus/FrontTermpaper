import React from 'react';
import DataTable from '../../../common/DataTable';
import { useSubjects } from '../../../../hooks/subjects/queries/useSubjects';
import { useAdminPermissions } from '../../../../hooks/useAdminPermissions';

export default function SubjectsTable() {
  const { data: subjects, isLoading } = useSubjects();
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
      title="Subjects"
      data={subjects}
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
