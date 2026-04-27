import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, FileText, Trash2, Calendar, ClipboardList } from 'lucide-react';
import toast from 'react-hot-toast';
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';

const DoctorPanel = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    // Real-time listener for bookings
    const q = query(collection(db, 'bookings'), orderBy('timestamp', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const bookingData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setBookings(bookingData);
    });

    return () => unsubscribe();
  }, []);

  const clearBooking = async (id) => {
    try {
      await deleteDoc(doc(db, 'bookings', id));
      toast.success('Consultation cleared');
    } catch (error) {
      console.error(error);
      toast.error('Failed to clear consultation');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-4 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h2 className="text-4xl font-extrabold text-slate-900 mb-2">Doctor Dashboard</h2>
            <p className="text-slate-500">Manage incoming patient consultation requests</p>
          </div>
          <div className="bg-white p-4 rounded-3xl shadow-soft flex items-center space-x-3 border border-slate-100">
            <div className="bg-primary-100 p-2 rounded-xl">
              <ClipboardList className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">{bookings.length}</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">Requests</div>
            </div>
          </div>
        </div>

        {bookings.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-[2.5rem] p-20 text-center border-2 border-dashed border-slate-200"
          >
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Calendar className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No pending requests</h3>
            <p className="text-slate-400">New patient bookings will appear here</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.map((booking) => (
              <motion.div
                key={booking.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-[2rem] p-6 shadow-soft hover:shadow-premium transition-all border border-slate-100 relative group"
              >
                <button 
                  onClick={() => clearBooking(booking.id)}
                  className="absolute top-4 right-4 p-2 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                >
                  <Trash2 className="w-5 h-5" />
                </button>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 bg-primary-100 rounded-2xl flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{booking.name}</h4>
                    <span className="text-xs text-slate-400">{booking.date}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center space-x-3 text-sm text-slate-600">
                    <Phone className="w-4 h-4 text-primary-400" />
                    <span>{booking.phone}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-600">
                    <Mail className="w-4 h-4 text-primary-400" />
                    <span className="truncate">{booking.email}</span>
                  </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <div className="flex items-start space-x-2">
                    <FileText className="w-4 h-4 text-slate-400 mt-1" />
                    <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
                      {booking.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPanel;
