import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { authAPI } from '@/api/services';

const ResetPasswordConfirmPage = () => {
  const { uidb64, token } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({ new_password: '', confirm_new_password: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/login');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [success, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    if (form.new_password !== form.confirm_new_password) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await authAPI.resetPasswordConfirm({ uid: uidb64, token, new_password: form.new_password });
      setSuccess('Password reset successful! Redirecting to login...');
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to reset password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Set New Password</h2>
        {error && <div className="mb-2 text-red-500 text-center">{error}</div>}
        {success && <div className="mb-2 text-green-600 text-center">{success}</div>}
        {!success && (
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            name="new_password"
            placeholder="New Password"
            value={form.new_password}
            onChange={handleChange}
            className="w-full mb-3 px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            name="confirm_new_password"
            placeholder="Confirm New Password"
            value={form.confirm_new_password}
            onChange={handleChange}
            className="w-full mb-6 px-3 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90 transition"
            disabled={loading}
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
        )}
        <div className="text-center mt-2">
          <Link to="/login" className="text-primary underline">Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordConfirmPage; 