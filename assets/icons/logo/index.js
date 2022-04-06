import React from "react";
import Image from "next/image";
const Logo = () => {
	return (
		<div
			style={{
				height: "4em",
				width: "auto",
			}}
		>
			<Image width={348} height={100} src={"/dnc-logo.png"} />
		</div>
	);
};

export default Logo;
