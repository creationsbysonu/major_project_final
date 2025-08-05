import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authAPI } from '@/api/services';

const ResetPasswordRequestPage = () => {
  const [email, setEmail] = useState('');
  const [result, setResult] = useState<{ uid: string; token: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setLoading(true);
    try {
      const res = await authAPI.resetPasswordRequest({ email });
      setResult(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.error || 'Failed to request password reset');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        {error && <div className="mb-2 text-red-500 text-center">{error}</div>}
        {result ? (
          <div className="mb-4 text-green-600 text-center">
            <div>Password reset link sent! (Dev: use below)</div>
            <div className="text-xs mt-2">uid: <span className="font-mono">{result.uid}</span></div>
            <div className="text-xs">token: <span className="font-mono">{result.token}</span></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full mb-4 px-3 py-2 border rounded"
              required
            />
            <button
              type="submit"
              className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90 transition"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Reset Link'}
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

export default ResetPasswordRequestPage; 