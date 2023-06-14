import axios from 'axios';

// URLs
const urlForAddVertex = 'http://127.0.0.1:5000/addVertex';

const addVertex = (vID: number, vValue: number) => {
	axios({
		method: 'POST',
		url: urlForAddVertex,
		data: {
			vID,
			vValue
		}
	})
		.then((response) => alert(response))
		.catch((error) => console.log(error));
	return 0;
};

export { addVertex };
