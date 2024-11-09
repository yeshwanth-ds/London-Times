import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
	// Extract token from cookies or fallback to Authorization header
	const token = req.cookies.token || (req.headers.authorization && req.headers.authorization.split(" ")[1]);

	// If token is not provided, respond with an unauthorized error
	if (!token) {
		return res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
	}

	try {
		// Verify token using the JWT secret from environment variables
		const decoded = jwt.verify(token, process.env.JWT_SECRET);

		// If token is invalid, respond with an unauthorized error
		if (!decoded) {
			return res.status(401).json({ success: false, message: "Unauthorized - Invalid token" });
		}

		// Attach userId from the token payload to the request object
		req.userId = decoded.userId;

		// Proceed to the next middleware or route handler
		next();
	} catch (error) {
		// Log the error and return a server error response
		console.error("Error in verifyToken middleware:", error);
		return res.status(500).json({ success: false, message: "Server error - Unable to verify token" });
	}
};
