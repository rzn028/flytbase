import './styles/App.css';
import React, { useEffect, useState } from 'react';
import Box from './components/Box';
import {directions} from './constants/constants';

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

	const handleKeyPressEvent = (event) => {
		const boxId = selectedBox;
		if (!boxId) {
			return;
		}
		const key = event.key.toLowerCase();
		console.log(key, boxId);
		switch (key) {
			case 'w':
				moveObject(boxId, directions.UP);
				break;
			case 's':
				moveObject(boxId, directions.DOWN);
				break;
			case 'a':
				moveObject(boxId, directions.RIGHT);
				break;
			case 'd':
				moveObject(boxId, directions.LEFT);
				break;
			case 'delete':
				console.log('Here to delete', boxId);
				setBoxes((boxes) => boxes.filter((box) => box.id !== boxId));
			default:
				break;
		}
	};

	const moveObject = (boxId, direction) => {
		switch (direction) {
			case directions.UP:
				setBoxes((boxes) =>
					boxes.map((box) => {
						if (box.id === boxId) {
							const marginTop = box.marginTop - 1 > 0 ? box.marginTop - 1 : 0;
							return {
								...box,
								marginTop
							};
						}
						return { ...box };
					})
				);
				break;

			case directions.DOWN:
				setBoxes((boxes) =>
					boxes.map((box) => {
						if (box.id === boxId) {
							const marginTop =
								box.marginTop + 1 < window.innerHeight - 400
									? box.marginTop + 1
									: window.innerHeight - 400;
							return {
								...box,
								marginTop: marginTop
							};
						}
						return { ...box };
					})
				);
				break;

			case directions.LEFT:
				setBoxes((boxes) =>
					boxes.map((box) => {
						if (box.id === boxId) {
							const marginLeft = box.marginLeft - 1 > 0 ? box.marginLeft - 1 : 0;
							return {
								...box,
								marginLeft
							};
						}
						return { ...box };
					})
				);
				break;

			case directions.RIGHT:
				setBoxes((boxes) =>
					boxes.map((box) => {
						if (box.id === boxId) {
							const marginLeft =
								box.marginLeft + 1 < window.innerWidth - 400
									? box.marginLeft + 1
									: window.innerWidth - 400;
							return {
								...box,
								marginLeft
							};
						}
						return { ...box };
					})
				);
				break;
			default:
				break;
		}
	};

	useEffect(
		() => {
			document.addEventListener('keypress', handleKeyPressEvent);
			return () => {
				document.removeEventListener('keypress', handleKeyPressEvent);
			};
		},
		[ selectedBox ]
	);

	return (
		<div className="App" style={{ height: '100vh', width: '100%' }}>
			<div>
				<button onClick={addNewBox}>Add box</button>
			</div>
			<div
				style={{
          margin: 'auto',
          marginTop: '70px',
          height: '70vh',
					boxShadow: '0px 0px 20px #424242',
          border: '2px splid blue',
          width: `${window.innerWidth - 300}px`
				}}
			>
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
		</div>
	);
};

export default App;


