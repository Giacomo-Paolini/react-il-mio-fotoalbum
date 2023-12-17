import { useState, useEffect } from 'react';
import axios from 'axios';

export default function PhotoList() {
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		axios
			.get('http://localhost:3000/photos')
			.then((res) => {
				console.log('ecco le foto: ', res.data);
				setPhotos(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	return (
		<div className="w-full grid grid-cols-1 gap-4 p-4">
			{photos.map((photo, index) => (
				<div key={index}>
					<img
						src={`http://localhost:3000/uploads/${photo.image}`}
						alt={photo.title}
					/>
					<h3>{photo.title}</h3>
					<p>{photo.description}</p>
				</div>
			))}
		</div>
	);
}
