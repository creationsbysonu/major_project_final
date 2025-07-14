import React, { useState } from 'react';
import { productsAPI } from '../api/services';

const ApiTest = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const response = await productsAPI.getAll();
      setData(response.data);
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('API Error:', error);
      setData({ error: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={testConnection}
        className="bg-blue-500 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Testing...' : 'Test API Connection'}
      </button>
      {data && (
        <pre className="mt-4 p-4 bg-gray-100 rounded">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default ApiTest;