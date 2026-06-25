import AdminDashboardLayout from '../components/admin/AdminDashboardLayout';
import MembersGrid from '../components/admin/MembersGrid';
import '../styles/admin.css';

export default function AdminPanelPage() {
  return (
    <AdminDashboardLayout>
      <MembersGrid />
    </AdminDashboardLayout>
  );
}
