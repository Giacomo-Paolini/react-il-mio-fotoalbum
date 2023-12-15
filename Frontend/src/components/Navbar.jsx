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
			<div className="p-4 flex justify-between items-center">
				<Link className="" to="/">
					Home
				</Link>
				<div>
					<Link className="" to="/dashboard">
						Dashboard
					</Link>
					{loggedIn && (
						<Link onClick={handleLogout} className="ml-4" to="/">
							Logout
						</Link>
					)}
				</div>
			</div>
		</nav>
	);
}
