import type { StatusTrackerProps } from "../lib/types"

const StatusTracker = ({ status }: StatusTrackerProps) => {

  return (
    <div className="mt-12 bg-green-50/50 rounded-xl border border-green-100 p-6 md:p-8 shadow-inner">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
          Application Status:
        </h3>
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold">
          <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mr-2"></span>
          Processing
        </span>
      </div>

      {/* Stepper Timeline */}
      <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 rounded-full"></div>
        {/* Active Line (Dynamic width based on state) */}
        <div className="absolute top-1/2 left-0 w-1/2 h-1 bg-green-500 -translate-y-1/2 z-0 rounded-full transition-all duration-500"></div>

        <div className="relative z-10 flex justify-between">
          
          {/* Step 1: Request Sent (Completed) */}
          <div className="flex flex-col items-center bg-green-50/50 px-2">
            <div className="w-8 h-8 rounded-full bg-green-500 border-4 border-white flex items-center justify-center shadow-sm">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="mt-2 text-xs font-semibold text-green-700">Request Sent</span>
          </div>

          {/* Step 2: Tech Assessment (Current) */}
          <div className="flex flex-col items-center bg-green-50/50 px-2">
            <div className="w-8 h-8 rounded-full bg-yellow-400 border-4 border-white flex items-center justify-center shadow-sm ring-4 ring-yellow-100">
              <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
            </div>
            <span className="mt-2 text-xs font-semibold text-gray-800">Tech Assessment</span>
          </div>

          {/* Step 3: Meter Ready (Pending) */}
          {status === 'processing' && (
            <div className="flex flex-col items-center bg-green-50/50 px-2">
              <div className="w-8 h-8 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center shadow-sm"></div>
              <span className="mt-2 text-xs font-medium text-gray-400">Meter Ready</span>
            </div>
          )}

          {/* Step 4: Meter Ready (Ready) */}
          {status === 'ready' && (
            <div className="flex flex-col items-center bg-green-50/50 px-2">
              <div className="w-8 h-8 rounded-full bg-green-500 border-4 border-white flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="mt-2 text-xs font-semibold text-green-700">Meter Ready</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default StatusTracker