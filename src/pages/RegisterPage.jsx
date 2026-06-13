import React, { useState } from 'react';
import { useRegister } from '../hooks/useAuth';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const registerMutation = useRegister();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name || !email || !password || !confirmPassword) {
      setErrorMsg("Barcha maydonlarni toldiring!");
      return;
    }

    if (name.length < 2) {
      setErrorMsg("Ism kamida 2 ta belgidan iborat bolishi kerak!");
      return;
    }

    if (password.length < 6) {
      setErrorMsg("Parol kamida 6 ta belgi bolishi kerak!");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Parol mos kelmadi!');
      return;
    }

    registerMutation.mutate(
      { name, email, password },
      {
        onSuccess: () => {
          navigate('/');
        },
        onError: () => {
          setErrorMsg('Bu email allaqachon band yoki serverda xato!');
        },
      }
    );
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-70px)] bg-[#0a0a0a] font-sans px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#141414] border border-[#222] shadow-[0_8px_32px_rgba(168,85,247,0.15)] text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Royxatdan otish</h2>
        
        {errorMsg && (
          <p className="text-red-400 bg-red-500/10 p-3 rounded-lg text-sm text-center mb-4 border border-red-500/20">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-400">Ismingiz</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-lg border border-[#333] bg-[#1a1a1a] text-white text-base outline-none focus:border-purple-500 transition-colors"
              placeholder="John Doe"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-lg border border-[#333] bg-[#1a1a1a] text-white text-base outline-none focus:border-purple-500 transition-colors"
              placeholder="example@test.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-400">Parol</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-lg border border-[#333] bg-[#1a1a1a] text-white text-base outline-none focus:border-purple-500 transition-colors"
              placeholder="Kamida 6 ta belgi"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-400">Parolni tasdiqlash</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="p-3 rounded-lg border border-[#333] bg-[#1a1a1a] text-white text-base outline-none focus:border-purple-500 transition-colors"
              placeholder="Parolni qayta kiriting"
            />
          </div>

          <button
            type="submit"
            disabled={registerMutation.isPending}
            className="p-3 mt-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-base cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_4px_12px_rgba(168,85,247,0.2)]"
          >
            {registerMutation.isPending ? 'Yaratilmoqda...' : "Royxatdan otish"}
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          Hisobingiz bormi?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Kiring
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;