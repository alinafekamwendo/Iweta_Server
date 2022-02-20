import Sidebar from "../sidebar/Sidebar";
import Topbar from "../topbar/Topbar";
import './navbar.css'
import Home from '../../pages/Home';



function Navbar() {
  return (
    <div>
      <Topbar />
      <div className="Navcontainer">
        <Sidebar />
        <div className="NavcontainerWidgets">
          others
        </div>
      </div> 
      </div>
  );
}

export default Navbar;
