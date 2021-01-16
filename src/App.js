import './styles/App.css';
import React, { useEffect, useState } from 'react';
import Box from './components/Box';
import { directions, colors } from './constants/constants';

const App = () => {
	const [ zIndex, setZIndex ] = useState(1);
	const [ boxes, setBoxes ] = useState([]);
	const [ selectedBox, setSelectedBox ] = useState();

	const handleBoxClick = (boxId) => {
		setSelectedBox(boxId);
	};

	const addNewBox = () => {
		const color = colors[Math.floor(Math.random() * 9)];
		const box = {
			id: zIndex,
			marginLeft: 100,
			marginTop: 100,
			zIndex: zIndex,
			bgColor: color.bgColor,
			borderColor: color.borderColor
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
		switch (key) {
			case 'w':
				moveObject(boxId, directions.UP);
				break;
			case 's':
				moveObject(boxId, directions.DOWN);
				break;
			case 'a':
				moveObject(boxId, directions.LEFT);
				break;
			case 'd':
				moveObject(boxId, directions.RIGHT);
				break;
			case 'delete':
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
							const marginTop = box.marginTop - 2 > 0 ? box.marginTop - 2 : 0;
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
								box.marginTop + 2 < window.innerHeight - 300
									? box.marginTop + 2
									: window.innerHeight - 300;
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
							const marginLeft = box.marginLeft - 2 > 0 ? box.marginLeft - 2 : 0;
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
								box.marginLeft + 2 < window.innerWidth - 400
									? box.marginLeft + 2
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
				<button onClick={addNewBox} className="add-button">
					Add box
				</button>
			</div>
			<div
				style={{
					width: `${window.innerWidth - 300}px`,
					height: `${window.innerHeight - 200}px`
				}}
				className="box-area"
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
							bgColor={item.bgColor}
							borderColor={item.borderColor}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default App;
