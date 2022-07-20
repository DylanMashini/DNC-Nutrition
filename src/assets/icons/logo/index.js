import React from "react";
import Image from "next/image";
const Logo = () => {
	return (
		<div
			style={{
				// height: "60px",
				// width: "208px",
				width: "100%",
				height: "100%",
				top: "0",
				left: "0",
				position: "relative",
			}}
		>
			{/* <Image width={348} height={100} src={"/dnc-logo.png"} /> */}
			<Image layout="fill" objectFit="scale-down" src={"/dnc-logo.png"} />
		</div>
	);
};

export default Logo;
