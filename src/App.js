import './styles/App.css';
import React, { useEffect, useState } from 'react';
import Box from './components/Box';

const App = () => {
	const [ zIndex, setZIndex ] = useState(1);
	const [ boxes, setBoxes ] = useState([]);
	const [ selectedBox, setSelectedBox ] = useState();

	const handleBoxClick = (boxId) => {
		console.log(boxId);
		setSelectedBox(boxId);
	};

	const addNewBox = () => {
		const box = {
			id: zIndex,
			marginLeft: 100,
			marginTop: 100,
			zIndex: zIndex
		};
		setZIndex((old) => old + 1);
		setBoxes((old) => [ ...old, box ]);
	};


	return (
		<div className="App">
			<div>
				<button onClick={addNewBox}>Add box</button>
			</div>
				{boxes.map((item) => {
					if (!item) return '';
					return (
						<Box
							key={item.id}
							id={item.id}
							zIndex={item.zIndex}
							marginLeft={item.marginLeft}
							marginTop={item.marginTop}
							handleBoxClick={handleBoxClick}
							selectedBox={selectedBox}
						/>
					);
				})}
		</div>
	);
};

export default App;

