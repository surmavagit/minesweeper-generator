import express from 'express';

const port = 8000;
const app = express();

app.get('/', (req, res) => {
	res.send(generateMineMap());
});

app.listen(port, () => {
	console.log('Listening on port ' + port);
});

function generateMineMap() {
	const height = 16;
	const width = 16;
	const fields = height * width;
	const mines = 40;

	const mineMap = [];
	for (let i = 0; i < height; i++) {
		const row = [];
		for (let j = 0; j < width; j++) {
			row[j] = 0;
		};
		mineMap.push(row);
	};

	const possibleMines = [];
	for (let i = 0; i < fields; i++) {
		possibleMines[i] = i;
	};
	for (let i = 0; i < mines; i++) {
		const choice = Math.floor(Math.random() * possibleMines.length);
		const mineIdx = possibleMines.splice(choice, 1)[0];

		const column = mineIdx % width;
		const row = (mineIdx - column) / width;
		mineMap[row][column] = 9;
	};

	function getAdjacentCoords(row, column) {
		const coords = [];
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				if (i == 0 && j == 0) continue;
				if (row + i < 0 || column + j < 0) continue;
				if (row + i >= height || column + j >= width) continue;
				coords.push([row + i, column + j]);
			};
		};
		return coords;
	};

	for (let i = 0; i < height; i++) {
		for (let j = 0; j < width; j++) {
			if (mineMap[i][j] === 9) {
				getAdjacentCoords(i, j).forEach(c => {
					let value = mineMap[c[0]][c[1]];
					if (value == 9) return;
					mineMap[c[0]][c[1]] = value + 1;
				});
			};
		};
	};
	return mineMap;
};

