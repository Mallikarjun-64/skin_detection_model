import { motion } from 'framer-motion';
import { Activity, Shield } from 'lucide-react';

const LoadingAnalysis = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="relative mb-12">
        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
          className="w-32 h-32 bg-primary-100 rounded-[2.5rem] flex items-center justify-center"
        >
          <Activity className="w-16 h-16 text-primary-600" />
        </motion.div>
        
        {/* Scanning beam effect */}
        <motion.div 
          animate={{ top: ['0%', '100%', '0%'] }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary-500 to-transparent z-10 opacity-50"
        />
      </div>

      <h3 className="text-2xl font-bold text-slate-900 mb-4">Analyzing Dermatological Patterns</h3>
      <div className="space-y-3">
        <p className="text-slate-500 flex items-center justify-center space-x-2">
          <Shield className="w-4 h-4 text-accent-500" />
          <span>Processing through neural networks...</span>
        </p>
        <div className="w-64 h-1.5 bg-slate-100 rounded-full mx-auto overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 3 }}
            className="h-full bg-primary-600"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingAnalysis;
