import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Activity, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -z-10 w-1/2 h-full bg-gradient-to-l from-primary-50 to-transparent opacity-70"></div>
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-accent-100 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center space-x-2 bg-primary-50 text-primary-700 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-primary-100">
              <ShieldCheck className="w-4 h-4" />
              <span>99% Accuracy in Clinical Trials</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6">
              AI-Based <span className="text-primary-600">Skin Disease</span> Detection
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              Upload a clear photo of your skin concern and let our advanced machine learning algorithms provide an instant preliminary analysis.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/upload" className="btn btn-primary px-10 py-4 text-lg flex items-center justify-center space-x-2">
                <span>Analyze Now</span>
                <Zap className="w-5 h-5 fill-current" />
              </Link>
              <a href="#about" className="btn btn-outline px-10 py-4 text-lg flex items-center justify-center">
                Learn More
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="/hero.png" 
                alt="AI Skin Analysis Illustration" 
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-900/40 to-transparent"></div>
            </div>
            
            {/* Stats Cards */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-premium z-20"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-accent-100 p-3 rounded-2xl">
                  <Activity className="w-6 h-6 text-accent-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">50K+</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">Checks Daily</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
