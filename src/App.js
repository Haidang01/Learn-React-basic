import "./App.scss";
import { Link, Outlet } from "react-router-dom";
import Header from "./Components/Header/Header";
import SimpleBar from 'simplebar-react';
import PerfectScrollbar from 'react-perfect-scrollbar';

const App = () => {
  return (
    <div className="app-container">
      <div className="header-container">
        <Header />
      </div>
      <div className="main-container">
        <div className="sidenav-container"></div>
        <div className="app-content" >
          <SimpleBar style={{ maxHeight: 400 }}>
            <Outlet />
          </SimpleBar>
        </div>
      </div>
    </div>
  );
};

export default App;
