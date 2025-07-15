import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '@/api/services';
import { ordersAPI } from '@/api/services';

const ProfilePage = () => {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [editProfile, setEditProfile] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ old_password: '', new_password: '', confirm_new_password: '' });
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [showOrders, setShowOrders] = useState(false);
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    if (!token) {
      navigate('/');
      return;
    }
    authAPI.getProfile()
      .then(res => setProfile(res.data))
      .catch(() => setError('Failed to load profile'))
      .finally(() => setLoading(false));
  }, [navigate]);

  const handleShowOrders = async () => {
    setShowOrders(true);
    setOrdersLoading(true);
    setOrdersError(null);
    try {
      const res = await ordersAPI.getMyOrders();
      setOrders(res.data);
    } catch {
      setOrdersError('Failed to load orders');
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    try {
      await authAPI.updateProfile(profile);
      setSuccess('Profile updated!');
      setEditProfile(false);
      setTimeout(() => setSuccess(null), 1500);
    } catch {
      setError('Failed to update profile');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    navigate('/');
    window.location.reload();
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);
    if (passwordForm.new_password !== passwordForm.confirm_new_password) {
      setPasswordError('New passwords do not match');
      return;
    }
    try {
      await authAPI.changePassword({ old_password: passwordForm.old_password, new_password: passwordForm.new_password });
      setPasswordSuccess('Password changed successfully!');
      setPasswordForm({ old_password: '', new_password: '', confirm_new_password: '' });
      setTimeout(() => setPasswordSuccess(null), 1500);
    } catch (err: any) {
      setPasswordError(err?.response?.data?.error || 'Failed to change password');
    }
  };

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg p-6 flex flex-col gap-4">
        <div className="mb-6">
          <div className="font-bold text-lg text-primary">My Account</div>
        </div>
        <nav className="flex flex-col gap-2">
          <button className="text-left px-3 py-2 rounded hover:bg-primary/10 font-medium bg-primary/10 text-primary">Profile</button>
          <button className={`text-left px-3 py-2 rounded hover:bg-primary/10 font-medium ${showOrders ? 'bg-primary/10 text-primary' : 'text-gray-700 dark:text-gray-200'}`} onClick={handleShowOrders}>My Orders</button>
          <button className="text-left px-3 py-2 rounded hover:bg-primary/10 font-medium text-gray-700 dark:text-gray-200" disabled>My Reviews</button>
          <button className="text-left px-3 py-2 rounded hover:bg-primary/10 font-medium text-gray-700 dark:text-gray-200" disabled>My Wishlist</button>
          <button className="text-left px-3 py-2 rounded hover:bg-primary/10 font-medium text-gray-700 dark:text-gray-200" disabled>My Returns</button>
          <button className="text-left px-3 py-2 rounded hover:bg-red-100 text-red-600 font-medium mt-8" onClick={handleLogout}>Logout</button>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8">
        <h2 className="text-3xl font-bold mb-6">Manage My Account</h2>
        {showOrders ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-8">
            <div className="font-semibold text-lg mb-4">My Orders</div>
            {ordersLoading ? (
              <div>Loading orders...</div>
            ) : ordersError ? (
              <div className="text-red-500">{ordersError}</div>
            ) : orders.length === 0 ? (
              <div className="text-gray-500">No orders found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr>
                      <th className="px-4 py-2">Order #</th>
                      <th className="px-4 py-2">Date</th>
                      <th className="px-4 py-2">Status</th>
                      <th className="px-4 py-2">Total</th>
                      <th className="px-4 py-2">Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} className="border-t">
                        <td className="px-4 py-2 font-semibold">{order.id}</td>
                        <td className="px-4 py-2">{new Date(order.created_at).toLocaleDateString()}</td>
                        <td className="px-4 py-2">{order.status}</td>
                        <td className="px-4 py-2">₹{order.total_price}</td>
                        <td className="px-4 py-2">
                          <ul>
                            {order.items.map((item: any) => (
                              <li key={item.id}>{item.product?.name} x {item.quantity}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Personal Profile */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-lg">Personal Profile</div>
              <button className="text-primary underline" onClick={() => setEditProfile(v => !v)}>{editProfile ? 'Cancel' : 'Edit'}</button>
            </div>
            {success && <div className="mb-2 text-green-600">{success}</div>}
            {editProfile ? (
              <form onSubmit={handleSave} className="flex flex-col gap-3">
                <input type="text" name="username" value={profile?.username || ''} disabled className="px-3 py-2 border rounded bg-gray-100" />
                <input type="email" name="email" value={profile?.email || ''} onChange={handleChange} className="px-3 py-2 border rounded" required />
                <input type="text" name="first_name" placeholder="First Name" value={profile?.first_name || ''} onChange={handleChange} className="px-3 py-2 border rounded" />
                <input type="text" name="last_name" placeholder="Last Name" value={profile?.last_name || ''} onChange={handleChange} className="px-3 py-2 border rounded" />
                <button type="submit" className="bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90 transition">Save</button>
              </form>
            ) : (
              <div className="flex flex-col gap-2">
                <div><span className="font-medium">Username:</span> {profile?.username}</div>
                <div><span className="font-medium">Email:</span> {profile?.email}</div>
                <div><span className="font-medium">First Name:</span> {profile?.first_name || '-'}</div>
                <div><span className="font-medium">Last Name:</span> {profile?.last_name || '-'}</div>
              </div>
            )}
          </div>
          {/* Address Book */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-2">
              <div className="font-semibold text-lg">Address Book</div>
              <button className="text-primary underline" disabled>Edit</button>
            </div>
            <div className="text-gray-500">No address on file.</div>
          </div>
        </div>
        {/* Recent Orders (placeholder) */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="font-semibold text-lg mb-4">Recent Orders</div>
          <div className="text-gray-500">No recent orders.</div>
        </div>
        {/* Password Change Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mt-8 max-w-lg">
          <h3 className="text-xl font-semibold mb-2">Change Password</h3>
          {passwordError && <div className="mb-2 text-red-500 text-center">{passwordError}</div>}
          {passwordSuccess && <div className="mb-2 text-green-600 text-center">{passwordSuccess}</div>}
          <form onSubmit={handlePasswordSubmit}>
            <input
              type="password"
              name="old_password"
              placeholder="Old Password"
              value={passwordForm.old_password}
              onChange={handlePasswordChange}
              className="w-full mb-3 px-3 py-2 border rounded"
              required
            />
            <input
              type="password"
              name="new_password"
              placeholder="New Password"
              value={passwordForm.new_password}
              onChange={handlePasswordChange}
              className="w-full mb-3 px-3 py-2 border rounded"
              required
            />
            <input
              type="password"
              name="confirm_new_password"
              placeholder="Confirm New Password"
              value={passwordForm.confirm_new_password}
              onChange={handlePasswordChange}
              className="w-full mb-6 px-3 py-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90 transition"
            >
              Change Password
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage; 