import Image from "next/image";
export default function Named({ src, alt = "" }) {
	return (
		<div id={"Image"}>
			<Image alt={alt} src={src} object-fit="contain" />
		</div>
	);
}
