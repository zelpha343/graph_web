import axios from 'axios';

//URLs
const urlForVertexIDs = 'http://127.0.0.1:5000/getVertexIDs';
const urlForVertexValues = 'http://127.0.0.1:5000/getVertexValues';
const urlForVertexPaths = 'http://127.0.0.1:5000/getVertexPaths';

const getVertexIDs = async () => {
	try {
		const response = await axios({
			method: 'GET',
			url: urlForVertexIDs
		});
		return response.data; // Extract and return the response data
	} catch (error) {
		console.log(error);
		throw new Error('Could not fetch vertex IDs');
	}
};

const getVertexValues = async () => {
	try {
		const response = await axios({
			method: 'GET',
			url: urlForVertexValues
		});
		return response.data; // Extract and return the response data
	} catch (error) {
		console.log(error);
		throw new Error('Could not fetch vertex Values');
	}
};

const getVertexPaths = async () => {
	try {
		const response = await axios({
			method: 'GET',
			url: urlForVertexPaths
		});
		return response.data; // Extract and return the response data
	} catch (error) {
		console.log(error);
		throw new Error('Could not fetch vertex paths');
	}
};

export { getVertexIDs, getVertexValues, getVertexPaths };
