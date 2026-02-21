import React, { useState, useEffect } from 'react';

// --- Type Definitions ---
type ApplicationStatus = 'idle' | 'processing' | 'ready';

interface FormData {
  accountNumber: string;
  propertyType: string;
  address: string;
}

export default function VoltStreamApp() {
  const [formData, setFormData] = useState<FormData>({
    accountNumber: '',
    propertyType: '',
    address: '',
  });

  const [status, setStatus] = useState<ApplicationStatus>('idle');
  const [error, setError] = useState<string>('');

  // --- The "Mock Backend" Effect ---
  // This watches the status. If it hits 'processing', it simulates a 
  // server delay (e.g., 5 seconds) before approving the meter.
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (status === 'processing') {
      timer = setTimeout(() => {
        setStatus('ready');
      }, 5000); // 5-second simulated wait
    }
    return () => clearTimeout(timer); // Cleanup if component unmounts
  }, [status]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing again
    if (error) setError(''); 
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 1. Basic Validation
    if (!formData.accountNumber || !formData.propertyType || !formData.address) {
      setError('Please fill out all fields before submitting.');
      return;
    }

    // 2. Trigger the State Machine
    setStatus('processing');
  };

  // --- Helper variables for dynamic UI ---
  const isIdle = status === 'idle';
  const isProcessing = status === 'processing';
  const isReady = status === 'ready';

  // Calculate progress bar width based on state
  const progressWidth = isIdle ? '0%' : isProcessing ? '50%' : '100%';

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-12 px-4 font-sans text-gray-800">
      
      <div className="w-full max-w-4xl shadow-2xl rounded-2xl overflow-hidden border border-green-100">
        
        {/* Navigation Bar (Unchanged) */}
        <nav className="bg-green-800 text-white px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
             <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
            </svg>
            <span className="text-xl font-bold tracking-wide">[ VoltStream ]</span>
          </div>
          {/* ... nav links ... */}
        </nav>

        <div className="bg-white p-8 md:p-12">
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-green-900 mb-2">Upgrade to Smart Metering</h1>
            <p className="text-gray-500 font-medium">[ Please fill in your property details below ]</p>
          </div>

          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm font-medium border border-red-200">
                {error}
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="sr-only" htmlFor="accountNumber">Account Number</label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleInputChange}
                  disabled={!isIdle} // Disable inputs while processing/ready
                  placeholder="Account Number"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all disabled:bg-gray-100 disabled:text-gray-400"
                />
              </div>

              <div>
                <label className="sr-only" htmlFor="propertyType">Property Type</label>
                <select
                  id="propertyType"
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleInputChange}
                  disabled={!isIdle}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all bg-white text-gray-600 disabled:bg-gray-100 disabled:text-gray-400"
                >
                  <option value="" disabled>Property Type (Dropdown)</option>
                  <option value="residential">Residential</option>
                  <option value="commercial">Commercial</option>
                  <option value="industrial">Industrial</option>
                </select>
              </div>
            </div>

            <div>
              <label className="sr-only" htmlFor="address">Installation Address</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                disabled={!isIdle}
                placeholder="Installation Address"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 outline-none transition-all disabled:bg-gray-100 disabled:text-gray-400"
              />
            </div>

            <button
              type="submit"
              disabled={!isIdle}
              className={`w-full font-bold py-4 rounded-lg shadow-md transition-all mt-4 
                ${isIdle 
                  ? 'bg-green-600 hover:bg-green-700 text-white active:scale-[0.99]' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              {isIdle ? '[ SUBMIT APPLICATION ]' : '[ APPLICATION SUBMITTED ]'}
            </button>
          </form>

          {/* Status Tracker Section - Only show if not idle */}
          {!isIdle && (
            <div className="mt-12 bg-green-50/50 rounded-xl border border-green-100 p-6 md:p-8 shadow-inner animate-fade-in-up">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
                  Application Status:
                </h3>
                
                {/* Dynamic Status Badge */}
                {isProcessing ? (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mr-2"></span>
                    Processing
                  </span>
                ) : (
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    Meter Ready
                  </span>
                )}
              </div>

              {/* Stepper Timeline */}
              <div className="relative">
                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 rounded-full"></div>
                
                {/* Dynamic Progress Line */}
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 z-0 rounded-full transition-all duration-1000 ease-in-out"
                  style={{ width: progressWidth }}
                ></div>

                <div className="relative z-10 flex justify-between">
                  
                  {/* Step 1: Request Sent (Always complete when tracker is visible) */}
                  <div className="flex flex-col items-center bg-green-50/50 px-2">
                    <div className="w-8 h-8 rounded-full bg-green-500 border-4 border-white flex items-center justify-center shadow-sm">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="mt-2 text-xs font-semibold text-green-700">Request Sent</span>
                  </div>

                  {/* Step 2: Tech Assessment (Pulsing if processing, checkmark if ready) */}
                  <div className="flex flex-col items-center bg-green-50/50 px-2">
                    <div className={`w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-sm transition-colors duration-500 ${isProcessing ? 'bg-yellow-400 ring-4 ring-yellow-100' : 'bg-green-500'}`}>
                       {isProcessing ? (
                         <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
                       ) : (
                         <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                       )}
                    </div>
                    <span className={`mt-2 text-xs font-semibold ${isProcessing ? 'text-gray-800' : 'text-green-700'}`}>Tech Assessment</span>
                  </div>

                  {/* Step 3: Meter Ready (Gray if processing, green checkmark if ready) */}
                  <div className="flex flex-col items-center bg-green-50/50 px-2">
                    <div className={`w-8 h-8 rounded-full border-4 border-white flex items-center justify-center shadow-sm transition-colors duration-500 delay-300 ${isReady ? 'bg-green-500 ring-4 ring-green-100' : 'bg-gray-200'}`}>
                       {isReady && (
                         <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                       )}
                    </div>
                    <span className={`mt-2 text-xs font-medium ${isReady ? 'text-green-700 font-bold' : 'text-gray-400'}`}>Meter Ready</span>
                  </div>

                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}