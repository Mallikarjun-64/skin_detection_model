import { useState, useRef, useEffect } from 'react';
import { Upload, X, Image as ImageIcon, AlertCircle, Camera, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const UploadBox = ({ onUpload }) => {
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isCameraMode, setIsCameraMode] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsStreaming(true);
      }
    } catch (err) {
      console.error("Camera error:", err);
      toast.error("Could not access camera. Please check permissions.");
      setIsCameraMode(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsStreaming(false);
  };

  const toggleCameraMode = () => {
    if (!isCameraMode) {
      setIsCameraMode(true);
      startCamera();
    } else {
      stopCamera();
      setIsCameraMode(false);
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setPreview(dataUrl);
      stopCamera();
      setIsCameraMode(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const validateFile = (file) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (PNG, JPG)');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image size should be less than 5MB');
      return false;
    }
    return true;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFile(file)) {
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFile(file)) {
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  const handleRemove = () => {
    setPreview(null);
  };

  return (
    <div className="w-full">
      {!preview && (
        <div className="flex justify-center mb-6">
          <div className="bg-slate-100 p-1.5 rounded-2xl flex space-x-2">
            <button 
              onClick={() => { if(isCameraMode) toggleCameraMode(); }}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl transition-all font-semibold ${!isCameraMode ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Upload className="w-4 h-4" />
              <span>Upload File</span>
            </button>
            <button 
              onClick={() => { if(!isCameraMode) toggleCameraMode(); }}
              className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl transition-all font-semibold ${isCameraMode ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Camera className="w-4 h-4" />
              <span>Live Camera</span>
            </button>
          </div>
        </div>
      )}

      {!preview ? (
        isCameraMode ? (
          <div className="relative w-full h-80 bg-black rounded-[2.5rem] overflow-hidden shadow-inner flex items-center justify-center">
            {!isStreaming && (
              <div className="flex flex-col items-center text-slate-400">
                <RefreshCw className="w-8 h-8 animate-spin mb-3" />
                <p>Starting camera...</p>
              </div>
            )}
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className={`w-full h-full object-cover ${isStreaming ? 'opacity-100' : 'opacity-0'}`}
            />
            {isStreaming && (
              <div className="absolute bottom-6 inset-x-0 flex justify-center">
                <button 
                  onClick={captureImage}
                  className="w-16 h-16 rounded-full border-4 border-white bg-primary-500 flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
                >
                  <div className="w-10 h-10 rounded-full bg-white opacity-20 animate-ping absolute"></div>
                  <div className="w-12 h-12 rounded-full border-2 border-white/50"></div>
                </button>
              </div>
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>
        ) : (
          <label 
            className={`relative flex flex-col items-center justify-center w-full h-80 border-2 border-dashed rounded-[2.5rem] cursor-pointer transition-all duration-300 ${dragActive ? 'border-primary-500 bg-primary-50' : 'border-slate-200 bg-white hover:bg-slate-50'}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className={`p-4 rounded-2xl mb-4 transition-colors ${dragActive ? 'bg-primary-200 text-primary-700' : 'bg-slate-100 text-slate-400'}`}>
              <Upload className="w-10 h-10" />
            </div>
            <p className="mb-2 text-lg font-bold text-slate-700">Drag & Drop Image</p>
            <p className="text-sm text-slate-500">or click to browse from computer</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleChange} />
        </label>
      )) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative group"
        >
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-80 object-cover rounded-[2.5rem] shadow-premium"
          />
          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.5rem] flex items-center justify-center">
            <button 
              onClick={handleRemove}
              className="p-3 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </motion.div>
      )}

      {preview && (
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 flex flex-col gap-4"
        >
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-2xl flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-700 leading-relaxed">
              Ensure the image is clear, focused on the affected area, and taken under good lighting for the most accurate results.
            </p>
          </div>
          <button 
            onClick={() => onUpload(preview)}
            className="w-full btn btn-primary py-4 text-lg font-bold"
          >
            Analyze Image
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default UploadBox;
