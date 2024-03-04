// Spinner.js
import React from 'react';

const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full border-t-4 border-blue-500 border-opacity-50 h-16 w-16">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

export default Spinner;
