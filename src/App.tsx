import { useState, useEffect } from 'react'
import Nav from './components/Nav'
import Header from './components/Header'
import ApplicationForm from './components/ApplicationForm'
import StatusTracker from './components/StatusTracker'
import type { FormData, ApplicationStatus } from './lib/types'

export default function VoltStreamApp() {
  const [status, setStatus] = useState<ApplicationStatus>('idle');
  const [error, setError] = useState<string>('');

  // Local state for the form UI
  const [formData, setFormData] = useState<FormData>({
    email: '',
    meterType: '',
    address: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (error) setError(''); 
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Basic Validation
    if (!formData.email || !formData.meterType || !formData.address) {
      setError('Please fill out all fields before submitting.');
      return;
    }

    // 2. Trigger the State Machine
    setStatus('processing');
  };


  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (status === 'processing') {
      timer = setTimeout(() => {
        setStatus('ready');
      }, 5000); // 15-second simulated wait
    }
    return () => clearTimeout(timer); // Cleanup if component unmounts
  }, [status]);

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-25 px-4 font-sans text-gray-800">
      
      {/* Container */}
      <div className="w-full max-w-4xl shadow-2xl rounded-3xl overflow-hidden border border-green-100">
        
        {/* Navigation Bar */}
        <Nav />

        {/* Main Content Area */}
        <div className="bg-white p-8 md:p-12">
          
          {/* Header */}
          <Header />

          {/* Form Section */}
          <ApplicationForm 
            formData={formData} 
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
          />

          {/* Status Tracker Section */}
          <StatusTracker 
            status={status}
          />

        </div>
      </div>
    </div>
  );
}