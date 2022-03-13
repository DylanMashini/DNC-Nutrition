import Link from "next/link";
const Breadcrumb = ({ page = 1 }) => (
	<section className="breadcrumb">
		<div className="container">
			<Link href={`/products/${page}`} id={"clickable"}>
				<ul className="breadcrumb-list" id={"clickable"}>
					<li id={"clickable"}>
						<a id={"clickable"}>
							<i className="icon-home" id={"clickable"}></i>
						</a>
					</li>
					<li id={"clickable"}>All Products</li>
				</ul>
			</Link>
		</div>
	</section>
);

export default Breadcrumb;
