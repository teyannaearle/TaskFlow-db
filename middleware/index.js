const admin = require("../config/firebase-config");

class Middleware {
    async decodeToken(req, res, next) {
        let token = await req.headers.authorization.split(" ")[1];
        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
            if (decodeValue) {
                return next();
            } else {
                return res.json({ message: "Unauthorized" });
            }
        } catch (e) {
            return res.json({ message: "Internal Error" });
        }
    }
}

module.exports = new Middleware();