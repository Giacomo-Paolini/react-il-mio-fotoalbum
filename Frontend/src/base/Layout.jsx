import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';

export default function Layout({ children }) {
	return (
		<div className="layout">
			<Navbar />
			<div className="content">{children}</div>
		</div>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};
