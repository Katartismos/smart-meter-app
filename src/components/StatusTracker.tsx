import type { StatusTrackerProps } from "../lib/types"

const StatusTracker = ({ status }: StatusTrackerProps) => {

  return (
    <div className="mt-12 bg-green-50/50 rounded-xl border border-green-100 p-6 md:p-8 shadow-inner">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-sm font-bold text-gray-700 uppercase tracking-wider">
          Application Status:
        </h3>
        {status === 'idle' ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-semibold">
            <span className="w-2 h-2 bg-gray-500 rounded-full mr-2"></span>
            Idle
          </span>
        ) : status === 'processing' ? (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm font-semibold">
            <span className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mr-2"></span>
            Processing
          </span>
        ) : (
          <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-semibold">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            Ready
          </span>
        )}
      </div>

      {/* Stepper Timeline */}
      {status !== 'idle' && (
        <div className="relative">
        {/* Connecting Line */}
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 rounded-full"></div>
        {/* Active Line (Dynamic width based on state) */}
        <div className={"absolute top-1/2 left-0 h-1 bg-green-500 -translate-y-1/2 z-0 rounded-full transition-all duration-500 " + (status === 'processing' ? 'w-1/2' : 'w-full')}></div>

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

          {/* Step 2: Tech Assessment (Current or Completed) */}
          <div className="flex flex-col items-center bg-green-50/50 px-2">
            {status === 'processing' ? (
              <div className="w-8 h-8 rounded-full bg-yellow-400 border-4 border-white flex items-center justify-center shadow-sm ring-4 ring-yellow-100">
                <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
              </div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-green-500 border-4 border-white flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            <span className={"mt-2 text-xs font-semibold " + (status === 'processing' ? 'text-gray-800' : 'text-green-700')}>Tech Assessment</span>
          </div>

          {/* Step 3: Meter Ready (Pending or Ready) */}
          <div className="flex flex-col items-center bg-green-50/50 px-2">
            {status === 'processing' ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 border-4 border-white flex items-center justify-center shadow-sm"></div>
            ) : (
              <div className="w-8 h-8 rounded-full bg-green-500 border-4 border-white flex items-center justify-center shadow-sm">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            )}
            <span className={"mt-2 text-xs font-medium " + (status === 'processing' ? 'text-gray-400' : 'text-green-700')}>Meter Ready</span>
          </div>
        </div>
        </div>
      )}
    </div>
  )
}

export default StatusTracker