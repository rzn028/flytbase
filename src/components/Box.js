import React from 'react';

const Box = ({ id, zIndex, marginTop, marginLeft, handleBoxClick, selectedBox }) => {
	return (
		<div
			style={{
				zIndex: `${zIndex}`,
				marginLeft: `${marginLeft}px`,
                marginTop: `${marginTop}px`,
                boxShadow: selectedBox === id ? '0px 0px 20px #aeaeae': 'none'
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
