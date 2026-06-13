import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');


    if (!email || !password) {
      setErrorMsg("Barcha maydonlarni toldiring!");
      return;
    }

   
    if (password === '4321') {
     
      localStorage.setItem('accessToken', 'junior-fake-token-4321');
      
   
      navigate('/');
    } else {
      
      setErrorMsg("Email yoki parol notogri! (Parol: 4321)");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-70px)] bg-[#0a0a0a] font-sans px-4">
      <div className="w-full max-w-md p-8 rounded-2xl bg-[#141414] border border-[#222] shadow-[0_8px_32px_rgba(168,85,247,0.15)] text-white">
        <h2 className="text-2xl font-semibold text-center mb-6">Tizimga kirish</h2>
        
        {errorMsg && (
          <p className="text-red-400 bg-red-500/10 p-3 rounded-lg text-sm text-center mb-4 border border-red-500/20">
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-lg border border-[#333] bg-[#1a1a1a] text-white text-base outline-none focus:border-purple-500 transition-colors"
              placeholder="muslima@gmail.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm text-gray-400">Parol</label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-20 rounded-lg border border-[#333] bg-[#1a1a1a] text-white text-base outline-none focus:border-purple-500 transition-colors"
                placeholder="****"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 bg-none border-none text-xs text-purple-400 hover:text-purple-300 cursor-pointer select-none"
              >
                {showPassword ? 'Close' : "open"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="p-3 mt-2 rounded-lg bg-purple-600 hover:bg-purple-500 text-white font-medium text-base cursor-pointer transition-all shadow-[0_4px_12px_rgba(168,85,247,0.2)]"
          >
            Kirish
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-400">
          Hisobingiz yoqmi?{' '}
          <Link to="/register" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">
            Royxatdan oting
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;