import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';

import ApplicantList from './ApplicantList';
import RoleList from './RoleList';
import LandingPage from './LandingPage';
import ApplicantDetails from './ApplicantDetails';
import ApplicantForm from './ApplicantForm';

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/applicants' element={<ApplicantList />} />
				<Route path='/roles' element={<RoleList />} />
				<Route path='/applicants/:id' element={<ApplicantDetails />} />
				<Route path='/applicants/new' element={<ApplicantForm />} />
				<Route path='*' element={<Navigate to='/' />} />
				{/* Add more routes as needed */}
			</Routes>
		</Router>
	);
}

export default App;
