const users = require('./../components/cart/cart-data/cart');

// authorization middleware for users
module.exports = {
    isAuth(req, res, next) {
        try {
            if (!req.headers.authorization)
                return res
                    .status(401)
                    .json({ message: 'Not Authorized User not allowed to access', error: 'Set userID in Authorization header' });

            if (!Object.keys(users).includes(req.headers.authorization))
                return res
                    .status(401)
                    .json({ message: 'Not Authorized User not allowed to access' });
            req.userInfo = { id: req.headers.authorization };
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized user' })
        }
    },
};