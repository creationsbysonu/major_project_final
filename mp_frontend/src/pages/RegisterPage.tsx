import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authAPI } from '@/api/services';
import ReCAPTCHA from 'react-google-recaptcha';

const RegisterPage = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    if (!recaptchaToken) {
      setError('Please complete the reCAPTCHA.');
      setLoading(false);
      return;
    }
    try {
      await authAPI.register({ ...form, recaptcha_token: recaptchaToken });
      setSuccess('Registration successful! Please login.');
      setTimeout(() => navigate('/login'), 1200);
    } catch {
      setError('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {error && <div className="mb-2 text-red-500 text-center">{error}</div>}
        {success && <div className="mb-2 text-green-600 text-center">{success}</div>}
        <form onSubmit={handleRegister}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={form.username}
            onChange={handleChange}
            className="w-full mb-3 px-3 py-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full mb-3 px-3 py-2 border rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full mb-6 px-3 py-2 border rounded"
            required
          />
          <ReCAPTCHA
            sitekey="6LfHFYUrAAAAACVr6Xq3VHKv4VJlaYSJgQ9uWCQE"
            onChange={setRecaptchaToken}
            className="mb-4"
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded font-semibold hover:bg-primary/90 transition mb-3"
            disabled={loading || !recaptchaToken}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="text-center mt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-primary underline">Login</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage; 