import React from 'react';
import DataTable from '../../../common/DataTable';
import { useClasses } from '../../../../hooks/classes/queries/useClasses';
import { useAdminPermissions } from '../../../../hooks/useAdminPermissions';

export default function ClassesTable() {
  const { data: classes, isLoading } = useClasses();
  const { permissions } = useAdminPermissions();

  const handleEdit = (item) => {
    console.log('Edit class', item);
  };

  const handleDelete = (item) => {
    if (window.confirm(`Delete class ${item.name}?`)) {
      console.log('Delete class', item);
    }
  };

  const handleCreate = () => {
    console.log('Create class');
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Name', accessor: 'name' },
    { header: 'Journal ID', accessor: 'journal_id' },
    { header: 'Main Teacher ID', accessor: 'main_teacher_id' },
  ];

  return (
    <DataTable
      title="Classes"
      data={classes}
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
