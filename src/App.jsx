import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Footer from "./components/layouts/Footer";

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
