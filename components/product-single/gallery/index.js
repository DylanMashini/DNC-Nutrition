import Image from "next/image";

const Gallery = ({ images }) => {
	const featImage = images[0];

	return (
		<section className="product-gallery">
			<div className="product-gallery__thumbs">
				{images.map(image => (
					<div key={image} className="product-gallery__thumb">
						<Image src={image} alt="" />
					</div>
				))}
			</div>

			<div className="product-gallery__image">
				<Image src={featImage} alt="" />
			</div>
		</section>
	);
};

export default Gallery;
