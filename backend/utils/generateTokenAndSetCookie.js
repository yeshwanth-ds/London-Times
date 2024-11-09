import jwt from "jsonwebtoken";

// Function to generate a JWT token and set it as a cookie in the response
export const generateTokenAndSetCookie = (res, userId) => {
    // Generate a JWT token with the userId payload and a secret key, with an expiration of 7 days
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d", // Token will expire in 7 days
    });

    // Set the generated token in a cookie with secure configurations
    res.cookie("token", token, {
        httpOnly: true, // The cookie is not accessible via JavaScript in the browser
        secure: process.env.NODE_ENV === "production", // Use secure cookies in production
        sameSite: "strict", // Ensure the cookie is sent only for same-site requests
        maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time: 7 days
    });

    return token; // Return the generated token for further use
};
