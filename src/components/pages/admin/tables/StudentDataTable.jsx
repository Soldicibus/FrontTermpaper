import React from 'react';
import DataTable from '../../../common/DataTable';
import { useStudentData } from '../../../../hooks/studentdata/queries/useStudentData';
import { useAdminPermissions } from '../../../../hooks/useAdminPermissions';

export default function StudentDataTable() {
  const { data: studentData, isLoading } = useStudentData();
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
      title="Student Data"
      data={studentData}
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
