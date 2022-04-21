import { Button, Tooltip } from "@nextui-org/react";
import { useState } from "react";

export default function Popup() {
	const [open, setOpen] = useState(true);
	if (open) {
		return (
			<div className="popup">
				<div
					onClick={() => setOpen(false)}
					style={{
						position: "absolute",
						top: "1em",
						cursor: "pointer",
						right: "1em",
					}}
				>
					<h1
						style={{
							fontSize: "2.5rem",
							textAlign: "left",
						}}
					>
						X
					</h1>
				</div>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
						justifyContent: "center",
						width: "100%",
						height: "100%",
					}}
				>
					<div
						style={{
							width: "50%",
						}}
					>
						<h1
							style={{
								textAlign: "center",
							}}
						>
							15% off your first purchase!
						</h1>
					</div>
					<div
						style={{
							width: "50%",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<h2
							style={{
								fontSize: "1.5em",
								textAlign: "center",
							}}
						>
							With the code:
						</h2>
						<Tooltip content="click to coppy code">
							<pre
								onClick={() => {
									navigator.clipboard.writeText("15OFF");
								}}
								style={{
									cursor: "pointer",
									fontSize: "2em",
									textAlign: "center",
									backgroundColor: "rgba(0,0,0,0.5)",
									color: "white",
									marginTop: "1em",
									width: "100%",
									borderRadius: "5px",
								}}
							>
								15OFF
							</pre>
						</Tooltip>
					</div>
				</div>
			</div>
		);
	} else return null;
}
