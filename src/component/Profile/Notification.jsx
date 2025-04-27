import React from 'react'

const Notification = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 font-poppins">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center transform hover:scale-105 transition-transform duration-500">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-tr from-purple-400 to-indigo-400 flex items-center justify-center animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Notifications</h1>
        <p className="text-gray-600 mb-6 text-sm">This feature is not available in this version.</p>
        <span className="inline-block bg-yellow-400 text-white text-sm font-semibold px-5 py-2 rounded-full animate-pulse">
          Coming Soon!
        </span>
      </div>
    </div>
  )
}

export default Notification
