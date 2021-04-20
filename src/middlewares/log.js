/**
 * CODE
 */
const logMiddleware = (req, res, next) => {
    console.log('received request: ', req.method, req.url);
    next();
};

/**
 * EXPORTS
 */
module.exports = logMiddleware;