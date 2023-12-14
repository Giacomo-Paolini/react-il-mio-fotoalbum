import Sidebar from '../components/Sidebar';
import PhotoList from '../components/PhotoList';

export default function Home() {
	return (
		<div className="flex">
			<Sidebar />
			<PhotoList />
		</div>
	);
}
