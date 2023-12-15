import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/useAuth';

export default function Login() {
	const navigate = useNavigate();
	const { login } = useAuth();

	function handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);
		const formObject = Array.from(data.entries()).reduce(
			(obj, [key, value]) => {
				obj[key] = value;
				return obj;
			},
			{}
		);

		axios
			.post('http://localhost:3000/login', formObject)
			.then((response) => {
				console.log(response);
				localStorage.setItem('token', response.data.token);
				login();
				navigate('/dashboard');
			})
			.catch((error) => {
				console.error(error);
			});
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleSubmit}>
				<label htmlFor="email">Email</label>
				<input type="email" name="email" id="email" />
				<label htmlFor="password">Password</label>
				<input type="password" name="password" id="password" />
				<button type="submit">Login</button>
			</form>
		</div>
	);
}
