const express = require('express');
const { fetchNumbers, calculateAverage } = require('./utils');

const app = express();
const PORT = 9876;
const WINDOW_SIZE = 10;

const windows = {
    'p': [],
    'f': [],
    'e': [],
    'r': []
};

const API_ENDPOINTS = {
    'p': 'http://20.244.56.144/test/primes',
    'f': 'http://20.244.56.144/test/fibo',
    'e': 'http://20.244.56.144/test/even',
    'r': 'http://20.244.56.144/test/rand'
};

app.get('/numbers/:numberid', async (req, res) => {
    const { numberid } = req.params;

    if (!API_ENDPOINTS[numberid]) {
        return res.status(400).json({ error: 'Invalid number ID' });
    }

    const numbers = await fetchNumbers(API_ENDPOINTS[numberid]);
    const windowPrevState = [...windows[numberid]];

    // Add new unique numbers to the window
    numbers.forEach(num => {
        if (!windows[numberid].includes(num)) {
            if (windows[numberid].length >= WINDOW_SIZE) {
                windows[numberid].shift(); // Remove the oldest number
            }
            windows[numberid].push(num); // Add the new number
        }
    });

    const windowCurrState = [...windows[numberid]];
    const avg = calculateAverage(windowCurrState);

    const response = {
        numbers,
        windowPrevState,
        windowCurrState,
        avg
    };

    res.status(200).json(response);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
