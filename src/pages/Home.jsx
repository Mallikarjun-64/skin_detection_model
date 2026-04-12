import Hero from '../components/Hero';
import About from '../components/About';
import { motion } from 'framer-motion';

const Home = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <About />
      
      {/* FAQ or Contact Section could go here */}
      <section id="contact" className="py-24 bg-primary-900 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary-800 skew-x-12 transform origin-top-right"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Have concerns or questions?</h2>
              <p className="text-primary-100 text-lg mb-10">
                Our team of dermatologists and AI experts are here to help you understand your results and provide guidance on next steps.
              </p>
              <button className="btn bg-white text-primary-900 hover:bg-primary-50 px-10 py-4 font-bold">
                Contact Specialist
              </button>
            </div>
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-lg p-8 rounded-[2rem] border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-accent-400 flex items-center justify-center font-bold text-primary-900">JS</div>
                    <div>
                      <p className="font-bold">Dr. Jane Smith</p>
                      <p className="text-sm text-primary-200">Chief Dermatologist</p>
                    </div>
                  </div>
                  <p className="italic text-primary-100">
                    "AI is not here to replace doctors, but to provide them with powerful tools for earlier and more accurate diagnosis."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
