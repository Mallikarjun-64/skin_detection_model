import { motion } from 'framer-motion';
import { Upload, Search, BarChart3, Pill } from 'lucide-react';

const About = () => {
  const steps = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: "Upload Photo",
      desc: "Take a clear, well-lit photo of the affected skin area and upload it safely.",
      color: "bg-blue-50 text-blue-600"
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "AI Analysis",
      desc: "Our neural networks analyze patterns and features invisible to the naked eye.",
      color: "bg-purple-50 text-purple-600"
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: "Get Results",
      desc: "Receive an instant report with predicted conditions and confidence levels.",
      color: "bg-accent-50 text-accent-600"
    },
    {
      icon: <Pill className="w-8 h-8" />,
      title: "Take Action",
      desc: "Follow suggested precautions and consult with a professional healthcare provider.",
      color: "bg-orange-50 text-orange-600"
    }
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-sm font-bold text-primary-600 uppercase tracking-[0.2em] mb-4">How it works</h2>
          <h3 className="text-4xl font-bold text-slate-900 mb-6">Simple Steps to Peace of Mind</h3>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            Our system is designed to be accessible and easy to use, providing professional-grade analysis in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-8 rounded-[2rem] border border-slate-50 bg-slate-50/30 hover:bg-white hover:shadow-premium transition-all duration-500 group"
            >
              <div className={`inline-flex p-4 rounded-2xl mb-6 transition-transform duration-500 group-hover:scale-110 ${step.color}`}>
                {step.icon}
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">{step.title}</h4>
              <p className="text-slate-500 leading-relaxed text-sm">
                {step.desc}
              </p>
              <div className="absolute top-8 right-8 text-4xl font-black text-slate-100 -z-10 transition-colors group-hover:text-slate-200">
                0{idx + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
