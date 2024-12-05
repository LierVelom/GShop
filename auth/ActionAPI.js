import { getToken } from './AuthToken';

const API_URL = '192.168.1.116:8000';

const postAPI = async (endpoint, payload) => {
	try {
		const token = await getToken();

		const response = await fetch(`http://${API_URL}/api/${endpoint}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(payload),
		});

		const data = await response.json();

		if (response.ok) {
			console.log('Data posted:', data);
			return data;
		} else {
			console.error('Error posting data:', data.message);
			return null;
		}
	} catch (error) {
		console.error('Network error:', error);
		return null;
	}
};

const fetchAPI = async (endpoint) => {
	try {
		const token = await getToken();

		const response = await fetch(`http://${API_URL}/api/${endpoint}`, {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${token}`, // Gửi token trong header
			},
		});

		const data = await response.json();

		if (response.ok) {
			// console.log('Data fetched:', data);
			return data;
		} else {
			console.error('Error fetching data:', data.message);
			return null;
		}
	} catch (error) {
		console.error('Network error:', error);
		return null;
	}
}

const putAPI = async (endpoint, payload) => {
	try {
		const token = await getToken();

		const response = await fetch(`http://${API_URL}/api/${endpoint}`, {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`, // Gửi token trong header
			},
			body: JSON.stringify(payload),
		});

		const data = await response.json();

		if (response.ok) {
			console.log('Data put:', data);
			return data;
		} else {
			console.error('Error putting data:', data.message);
			return null;
		}
	} catch (error) {
		console.error('Network error:', error);
		return null;
	}
}

const deleteAPI = async (endpoint) => {
	try {
		const token = await getToken();

		const response = await fetch(`http://${API_URL}/api/${endpoint}`, {
			method: 'DELETE',
			headers: {
				Authorization: `Bearer ${token}`, // Gửi token trong header
			},
		});

		const data = await response.json();

		if (response.ok) {
			console.log('Data deleted:', data);
			return data;
		} else {
			console.error('Error deleting data:', data.message);
			return null;
		}
	} catch (error) {
		console.error('Network error:', error);
		return null;
	}
}

const deleteAPIWithStatus = async (endpoint, payload) => {
	try {
		const token = await getToken();

		const response = await fetch(`http://${API_URL}/api/${endpoint}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`, // Gửi token trong header
			},
			body: JSON.stringify(payload),
		});

		const data = await response.json();

		if (response.ok) {
			console.log('Data deleted:', data);
			return response;
		} else {
			console.error('Error deleting data:', data.message);
			return response;
		}
	} catch (error) {
		console.error('Network error:', error);
		return null;
	}
}


export { postAPI, fetchAPI, putAPI, deleteAPI, deleteAPIWithStatus };