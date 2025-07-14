// src/pages/Signup.tsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signUp(email, password);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md relative">
        <button onClick={handleBack} className="absolute left-4 top-4 text-brand-orange hover:underline text-sm font-medium">Повернутися</button>
        <h2 className="text-2xl font-bold mb-6 text-center">Реєстрація</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Пошта</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <button type="submit" className="w-full bg-brand-orange text-white py-2 rounded-md font-semibold hover:bg-orange-600 transition-colors">Зареєструватися</button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Маєте аккаунт? <a href="/login" className="text-brand-orange hover:underline">Увійти</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
