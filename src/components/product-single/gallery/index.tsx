const Gallery = ({ images }) => {
	const featImage = images[0];

	return (
		<section className="product-gallery">
			<div className="product-gallery__thumbs">
				{images.map(image => (
					<div key={image} className="product-gallery__thumb">
						<img
							src={image}
							alt=""
							style={{
								objectFit: "contain",
							}}
						/>
					</div>
				))}
			</div>

			<div className="product-gallery__image">
				<img
					src={featImage}
					alt=""
					style={{
						objectFit: "contain",
					}}
				/>
			</div>
		</section>
	);
};

export default Gallery;
