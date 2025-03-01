import React from "react";

const ErrorModal = ({ message, onClose }) => {
  return (
    <div className='fixed inset-0 flex items-center justify-center bg-transperant'>
      <div className='fixed inset-0 flex items-center justify-center bg-gray-100 opacity-30'></div>
      <div className='fixed inset-0 flex items-center justify-center bg-transperant'>
        <div className='bg-white p-6 rounded-lg shadow-lg max-w-sm text-center'>
          <h2 className='text-xl font-semibold text-red-600'>Error</h2>
          <p className='mt-2 text-gray-700'>{message}</p>
          <button
            onClick={onClose}
            className='mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
