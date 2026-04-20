import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Activity, Mail, Lock } from 'lucide-react';
import toast from 'react-hot-toast';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    age: '',
    password: ''
  });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    signup({ 
      name: `${formData.firstName} ${formData.lastName}`, 
      email: formData.email,
      phone: formData.phone,
      gender: formData.gender,
      age: formData.age
    });
    toast.success('Account created successfully!');
    navigate('/upload');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex items-center justify-center px-4 bg-gradient-to-br from-green-50 via-white to-primary-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl -mr-48 -mt-48" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-100/50 rounded-full blur-3xl -ml-48 -mb-48" />
      
      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center p-3 bg-white shadow-soft rounded-2xl mb-4">
            <Activity className="w-8 h-8 text-primary-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800">User Registration</h2>
        </div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[2rem] shadow-glass"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 ml-1">First Name</label>
                <input 
                  type="text" 
                  placeholder="First Name" 
                  className="input-field-sm"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 ml-1">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Last Name" 
                  className="input-field-sm"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  required
                />
              </div>
            </div>

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
              <label className="text-xs font-semibold text-slate-500 ml-1">Phone</label>
              <input 
                type="tel" 
                placeholder="Phone" 
                className="input-field-sm"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 ml-1">Gender</label>
                <select 
                  className="input-field-sm bg-white"
                  value={formData.gender}
                  onChange={(e) => setFormData({...formData, gender: e.target.value})}
                  required
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-500 ml-1">Age</label>
                <input 
                  type="number" 
                  placeholder="Age" 
                  className="input-field-sm"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
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

            <button type="submit" className="w-full bg-primary-600 hover:bg-primary-700 text-white font-bold py-3 rounded-xl transition-all shadow-md mt-4">
              Register
            </button>
          </form>

          <div className="mt-8 text-center text-sm">
            <p className="text-slate-500">
              Already have an account? 
              <Link to="/login" className="ml-2 text-primary-600 font-bold hover:underline">
                Log In
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
