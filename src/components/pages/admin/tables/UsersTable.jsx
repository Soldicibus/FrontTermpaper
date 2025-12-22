import React from 'react';
import DataTable from '../../../common/DataTable';
import { useUsers } from '../../../../hooks/users/queries/useUsers';
import { useAdminPermissions } from '../../../../hooks/useAdminPermissions';
// Import mutations if available
// import { useDeleteUser } from '../../../../hooks/users/mutations/useDeleteUser';

export default function UsersTable() {
  const { data: users, isLoading } = useUsers();
  const { permissions } = useAdminPermissions();
  
  // Placeholder handlers
  const handleEdit = (user) => {
    console.log('Edit user', user);
    alert(`Edit user ${user.username}`);
  };

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.username}?`)) {
      console.log('Delete user', user);
      alert(`Delete user ${user.username}`);
    }
  };

  const handleCreate = () => {
    console.log('Create user');
    alert('Create user');
  };

  const handleResetPassword = (user) => {
    const newPass = prompt(`Enter new password for ${user.username}:`);
    if (newPass) {
      console.log('Reset password', user, newPass);
      alert(`Password reset for ${user.username}`);
    }
  };

  const columns = [
    { header: 'ID', accessor: 'id' },
    { header: 'Username', accessor: 'username' },
    { header: 'Email', accessor: 'email' },
    { header: 'Role', accessor: 'role_name' }, // Adjust accessor based on actual data structure
  ];

  return (
    <DataTable
      title="Users"
      data={users}
      columns={columns}
      isLoading={isLoading}
      onEdit={handleEdit}
      onDelete={handleDelete}
      onCreate={handleCreate}
      onResetPassword={handleResetPassword}
      canEdit={permissions.users.edit}
      canDelete={permissions.users.delete}
      canCreate={permissions.users.create}
      canResetPassword={permissions.users.resetPassword}
    />
  );
}
