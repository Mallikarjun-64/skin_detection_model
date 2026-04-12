import { Activity, Instagram, Twitter, Linkedin, Facebook } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="bg-primary-600 p-2 rounded-xl">
                <Activity className="text-white w-5 h-5" />
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-accent-600">
                SkinAI
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed">
              Empowering individuals with AI-driven early detection of skin conditions for better health outcomes.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><Link to="/" className="hover:text-primary-600">Home</Link></li>
              <li><Link to="/#about" className="hover:text-primary-600">About System</Link></li>
              <li><Link to="/upload" className="hover:text-primary-600">Analyze Image</Link></li>
              <li><Link to="/#faq" className="hover:text-primary-600">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-6">Legal</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-primary-600">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-primary-600">Terms of Service</a></li>
              <li><a href="#" className="hover:text-primary-600">Medical Disclaimer</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-slate-900 mb-6">Connect</h4>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-primary-600 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-primary-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-primary-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-primary-600 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-slate-50 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400">
          <p>© 2026 SkinAI Detection System. All rights reserved.</p>
          <p className="mt-4 md:mt-0 italic">Designed with care for a healthier tomorrow.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
