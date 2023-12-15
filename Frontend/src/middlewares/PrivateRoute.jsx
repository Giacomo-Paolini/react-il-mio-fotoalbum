import { Route, Routes, Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function PrivateRoute({ element, ...rest }) {
	const token = localStorage.getItem('token');

	return (
		<Routes>
			<Route {...rest} element={token ? element : <Navigate to="/login" />} />
		</Routes>
	);
}

PrivateRoute.propTypes = {
	element: PropTypes.element.isRequired,
};

export default PrivateRoute;
