import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';
import loginBg from '../assets/login_bg.png';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(formData.email, formData.password);
      toast.success('Successfully logged in!');
      
      // In AuthContext, we already fetch the user data.
      // We check the role from the context later, but here we can just wait for the update
      // or directly check the role if we want immediate navigation.
      // Since AuthContext.login returns the user, but might not have the role merged yet
      // if we're not careful, we should rely on the fact that AuthContext.login 
      // now fetches and merges the role.
      
      // I'll fetch the role again here or just use a small delay if needed, 
      // but the updated login function in AuthContext should handle it.
      
      // Wait for auth context to update? Actually, it's safer to check the role in a useEffect 
      // or just trust the context. I'll navigate based on the user object returned.
      
      // Let's re-fetch the role to be 100% sure before navigating
      const { doc, getDoc } = await import('firebase/firestore');
      const { db } = await import('../firebase');
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const role = userDoc.exists() ? userDoc.data().role : 'patient';

      if (role === 'doctor') {
        navigate('/doctor-panel');
      } else {
        navigate('/upload');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Login failed');
    }
  };

  return (
    <div 
      className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 relative overflow-hidden"
      style={{
        backgroundImage: `url(${loginBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]" />
      
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-white shadow-soft rounded-2xl mb-4">
            <Activity className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Login</h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-glass"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="input-field-sm pl-10"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-slate-500 ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="input-field-sm pl-10"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs text-primary-600 font-semibold hover:underline">
                Forgot Password?
              </button>
            </div>

            <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-all shadow-md mt-4">
              Login
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-slate-500">
              Don't have an account? 
              <Link to="/signup" className="ml-2 text-primary-600 font-bold hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
