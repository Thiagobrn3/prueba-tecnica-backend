const axios = require('axios');
const server = require('./server');

test('should fetch latest exchange rates', async () => {
    const response = await axios.get('http://localhost:3000/api/latest');
    expect(response.status).toBe(200);
    expect(response.data).toHaveProperty('rates');
});
