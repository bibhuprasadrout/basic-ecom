import { Outlet } from "react-router-dom";
import { Footer, Navbar } from "././components";

function App() {
  return (
    <>
      <div className='w-full max-w-480 mx-auto'>
        <Navbar />
        <div className='min-h-screen'>
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
