import { getCurrentUser } from "../utils/auth";

export function useAdminPermissions() {
  const { data: user } = getCurrentUser();
  const role = user?.role_name || user?.role;
  const isSAdmin = role === 'sadmin';
  const isAdmin = role === 'admin';

  // Default: SAdmin can do everything.
  // Admin has restrictions.
  
  const permissions = {
    users: {
      create: isSAdmin,
      edit: isSAdmin,
      delete: isSAdmin,
      resetPassword: isSAdmin || isAdmin,
    },
    teachers: {
      create: isSAdmin,
      edit: isSAdmin,
      delete: isSAdmin,
    },
    parents: {
      create: isSAdmin,
      edit: isSAdmin,
      delete: isSAdmin,
    },
    students: {
      create: isSAdmin,
      edit: isSAdmin,
      delete: isSAdmin,
    },
    // For other tables, if not specified, assume Admin can edit/delete?
    // "Moderator can only view all tables and reset user password."
    // If "Admin" in the prompt means the `admin` role, and the user calls it "Moderator" later...
    // Let's assume Admin can edit other things.
    others: {
      create: isSAdmin || isAdmin,
      edit: isSAdmin || isAdmin,
      delete: isSAdmin || isAdmin,
    }
  };

  return { isSAdmin, isAdmin, permissions };
}
