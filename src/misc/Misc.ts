function getNumberOfDigits(number: number) {
	let numberOfDigits = 0;
	let remainingNumber = Math.abs(number);

	if (remainingNumber === 0) {
		return 1;
	}

	while (remainingNumber >= 1) {
		remainingNumber /= 10;
		numberOfDigits++;
	}

	return numberOfDigits;
}

function getRandomNumber(low: number, high: number): number {
	return Math.floor(Math.random() * (high - low + 1)) + low;
}

function getIndexFromID(positions: any, ID: number) {
	for (let i = 0; i < positions.length; i++) {
		if (positions[i][0] == ID) {
			return i;
		}
	}
	return 1;
}

export { getNumberOfDigits, getRandomNumber, getIndexFromID };
