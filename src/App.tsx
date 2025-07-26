import { Outlet } from "react-router";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <div>
        <Navbar />
        <div className="max-w-[1440px] m-auto min-h-[calc(100vh-360px)] mt-[40px] md:mt-[60px] px-5">
          <Outlet />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
