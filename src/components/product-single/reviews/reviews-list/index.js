import Rater from "react-rater";
import Image from "next/image";

function createMarkup(content) {
	return { __html: content };
}

const ReviewsList = ({ reviews }) => {
	return (
		<section className="reviews-list">
			{reviews.map(review, index => (
				<div className="review-item">
					<div className="review__avatar">
						<Image src={review.avatar} alt="avatar" />
					</div>

					<div className="review__content">
						<h3>{review.name}</h3>
						<Rater
							total={5}
							interactive={false}
							rating={review.punctuation}
						/>
						<div
							className="review__comment"
							dangerouslySetInnerHTML={createMarkup(
								review.description
							)}
						></div>
					</div>
				</div>
			))}
		</section>
	);
};

export default ReviewsList;
