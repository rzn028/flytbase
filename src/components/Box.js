import React from 'react';

const Box = ({ id, zIndex, marginTop, marginLeft, handleBoxClick, selectedBox, bgColor, borderColor }) => {
	return (
		<div
			style={{
				zIndex: `${zIndex}`,
				marginLeft: `${marginLeft}px`,
				marginTop: `${marginTop}px`,
				boxShadow: selectedBox === id ? `0px 0px 20px ${borderColor}` : 'none',
				background: bgColor,
				border: `2px solid ${borderColor}`
			}}
			className="box"
			onClick={() => {
				handleBoxClick(id);
			}}
		>
			<p>id: {id}</p>
		</div>
	);
};

export default Box;
