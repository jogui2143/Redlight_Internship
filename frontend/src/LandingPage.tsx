// LandingPage.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';


function LandingPage() {
  return (
    <div className="container-fluid" style={{ backgroundImage: `url('./banner2x.jpg')`,  backgroundSize: 'cover', backgroundPosition: 'center', minHeight: '100vh' }}>
      {/* <h1>Welcome to our Internship Application Manager</h1> */}
        <div className='d-flex justify-content-center align-items-center' style={{height: '100vh', gap: '10rem'}}>
            <button type="button" className="btn btn-outline-dark btn-lg">
                <Link to="/applicants" className='custom-link'>Applicants</Link>
            </button>
            <img src='./redlight_logo.png' alt='banner' className='custom-image rounded' style={{border: '2px solid black'}}/>
            <button type="button" className="btn btn-outline-dark btn-lg">
                <Link to="/roles" className="custom-link">Roles</Link>
            </button>
        </div>
      {/* <nav>
        <ul>
          <li>
            <Link to="/applicants">Applicants Page</Link>
          </li>
          <li>
            <Link to="/roles">Roles Page</Link>
          </li>
        </ul>
      </nav> */}
    </div>
  );
}

export default LandingPage;
