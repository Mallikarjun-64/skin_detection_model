import { useState } from 'react';
import UploadBox from '../components/UploadBox';
import LoadingAnalysis from '../components/LoadingAnalysis';
import ResultDisplay from '../components/ResultDisplay';
import { motion, AnimatePresence } from 'framer-motion';

const UploadPage = () => {
  const [step, setStep] = useState('upload'); // 'upload' | 'loading' | 'result'
  const [selectedImage, setSelectedImage] = useState(null);

  const handleUpload = (image) => {
    setSelectedImage(image);
    setStep('loading');
    
    // Simulate API delay
    setTimeout(() => {
      setStep('result');
    }, 3500);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setStep('upload');
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          {step === 'upload' && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl font-extrabold text-slate-900 mb-4">Start Your Analysis</h2>
              <p className="text-slate-500 text-lg">Upload a clear photo for high-accuracy detection</p>
            </motion.div>
          )}
          {step === 'loading' && (
            <h2 className="text-4xl font-extrabold text-slate-900">Analysis in Progress</h2>
          )}
          {step === 'result' && (
            <h2 className="text-4xl font-extrabold text-slate-900">Analysis Results</h2>
          )}
        </div>

        <div className="card min-h-[400px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {step === 'upload' && (
              <motion.div
                key="upload-box"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <UploadBox onUpload={handleUpload} />
              </motion.div>
            )}

            {step === 'loading' && (
              <motion.div
                key="loading-box"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <LoadingAnalysis />
              </motion.div>
            )}

            {step === 'result' && (
              <motion.div
                key="result-box"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <ResultDisplay image={selectedImage} onReset={handleReset} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Security / Privacy Trust Markers */}
        {step === 'upload' && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3 text-slate-400">
              <div className="w-2 h-2 rounded-full bg-accent-400"></div>
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-400">
              <div className="w-2 h-2 rounded-full bg-accent-400"></div>
              <span className="text-sm font-medium">End-to-End Encryption</span>
            </div>
            <div className="flex items-center space-x-3 text-slate-400">
              <div className="w-2 h-2 rounded-full bg-accent-400"></div>
              <span className="text-sm font-medium">Private & Secure</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
