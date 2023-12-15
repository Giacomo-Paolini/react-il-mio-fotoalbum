import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';
import { useEffect, useState } from 'react';

export default function Navbar() {
	const { isLoggedIn, logout } = useAuth();
	const [loggedIn, setLoggedIn] = useState(isLoggedIn);

	useEffect(() => {
		setLoggedIn(isLoggedIn);
	}, [isLoggedIn]);

	function handleLogout() {
		logout();
	}

	return (
		<nav>
			<div className="">
				<Link className="p-4" to="/">
					Home
				</Link>
				<Link className="p-4" to="/dashboard">
					Dashboard
				</Link>
				{loggedIn && (
					<Link onClick={handleLogout} className="p-4" to="/">
						Logout
					</Link>
				)}
			</div>
		</nav>
	);
}
