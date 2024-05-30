const axios = require('axios');

const fetchNumbers = async (apiUrl) => {
    try {
        const startTime = Date.now();
        const response = await axios.get(apiUrl, { timeout: 500 });
        if (response.status === 200 && (Date.now() - startTime) < 500) {
            return response.data.numbers || [];
        }
        return [];
    } catch (error) {
        return [];
    }
};

const calculateAverage = (numbers) => {
    return numbers.length > 0 ? (numbers.reduce((sum, num) => sum + num, 0) / numbers.length) : 0;
};

module.exports = { fetchNumbers, calculateAverage };
