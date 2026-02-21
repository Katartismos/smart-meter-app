const Nav = () => {
  return (
    <nav className="bg-green-800 text-white px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.381z" clipRule="evenodd" />
        </svg>
        <span className="text-xl font-bold tracking-wide"> MeterHub </span>
      </div>
      <div className="hidden space-x-8 text-sm font-medium text-green-50">
        <a href="#" className="hover:text-white transition-colors">Home</a>
        <a href="#" className="text-white border-b-2 border-green-400 pb-1">Track</a>
        <a href="#" className="hover:text-white transition-colors">Support</a>
      </div>
      <div className="w-8 h-8 rounded-full bg-green-600 border-2 border-green-400 flex items-center justify-center overflow-hidden">
        <svg className="w-5 h-5 text-white mt-1" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      </div>
    </nav>
  )
}

export default Nav