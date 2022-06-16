const apiKeys = [
    '7BTxHCyHhzIME5TI',
    'ngfeNG1iaq9Q2PJK',
    'zaCmZA74PLKCrD8Y',
    'KwOi5vm2TYNmi8Dd',
    'edVCa1E6zDZRztaq'
];

function auth (request, response, next) {
    const apiKey = request.headers['api-key'];

    if (apiKey && apiKeys.includes(apiKey)) {
        next();
    } else {
        const resObj = {
            error: 'Access denied'
        }

        response.json(resObj);
    }
};

module.exports = {auth};