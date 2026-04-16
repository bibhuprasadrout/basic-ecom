import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "././components";

function App() {
  return (
    <div className='min-h-screen bg-base-100 selection:bg-primary selection:text-primary-content'>
      {/* 1. Changed to a standard max-width with responsive utility.
          2. Added overflow-x-hidden to prevent accidental side-scrolling.
      */}
      <div className='w-full max-w-480 mx-auto overflow-x-hidden flex flex-col'>
        <Navbar />
        {/* 1. Added responsive padding (px-4 for mobile, px-8 for desktop).
            2. flex-grow ensures Footer stays at the bottom even on empty pages.
        */}
        <main className='grow min-h-[calc(100vh-200px)] px-4 sm:px-6 md:px-8 lg:px-12'>
          <div className='container mx-auto'>
            <Outlet />
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
