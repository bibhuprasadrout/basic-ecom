import { useState, useEffect } from "react";

const RenderAlert = () => {
  const [isVisible, setIsVisible] = useState(false);

  const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  useEffect(() => {
    const savedData = localStorage.getItem("render_alert_data");

    if (savedData) {
      const { timestamp } = JSON.parse(savedData);
      const now = new Date().getTime();

      // If 24 hours have passed, clear it so it shows again
      if (now - timestamp > EXPIRATION_TIME) {
        localStorage.removeItem("render_alert_data");
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    } else {
      // No record found, show the alert
      setIsVisible(true);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    const alertData = {
      dismissed: true,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem("render_alert_data", JSON.stringify(alertData));
  };

  if (!isVisible) return null;

  return (
    <div className='absolute top-20 sm:top-32 left-1/2 -translate-x-1/2 px-4 w-full max-w-4xl z-1'>
      <div
        role='alert'
        className='alert shadow-2xl border-2 border-info/50 bg-base-100/90 backdrop-blur-2xl relative p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 overflow-hidden'>
        {/* Decorative Gradient Glow (Attention Grabbing) */}
        <div className='absolute inset-0 bg-linear-to-br from-info/10 via-transparent to-primary/5 pointer-events-none' />

        {/* Larger Icon for Visual Impact */}
        <div className='bg-info/20 p-4 rounded-full'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='h-10 w-10 sm:h-14 sm:w-14 shrink-0 stroke-info'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'></path>
          </svg>
        </div>

        <div className='flex flex-col text-center md:text-left z-10'>
          <span className='text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-base-content'>
            Wait a Moment! Backend spin-up in progress.
          </span>
          <p className='mt-2 text-sm sm:text-base md:text-lg font-medium opacity-80 leading-relaxed max-w-2xl'>
            {`We use Render's free tier. If some contents are blank, please wait
            30-60 seconds for the service to wake up before refreshing.`}
          </p>
        </div>

        {/* Close Button - Larger and more prominent */}
        <button
          onClick={handleClose}
          className='btn btn-md btn-circle btn-ghost absolute right-4 top-4 hover:bg-error/20 hover:text-error transition-colors'
          aria-label='Close Alert'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-8 w-8'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default RenderAlert;
