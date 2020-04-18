import jwt from "jsonwebtoken";
import apolloServerExpress from "apollo-server-express";

const { AuthenticationError } = apolloServerExpress;

class Util {
  static async generateToken(user) {
    const token = await jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: Math.floor(Date.now() / 1000) + 60 * 60,
      }
    );

    return token;
  }

  static async verifyToken(authToken) {
    const tokenWithBearer = authToken || "";
    const token = tokenWithBearer.split(" ")[1];

    try {
      if (token) {
        return jwt.verify(token, process.env.JWT_SECRET_KEY);
      }
      return null;
    } catch (err) {
      return null;
    }
  }

  static authenticated = (next) => (root, args, context, info) => {
    if (!context.currentUser) {
      const error = new AuthenticationError("You must login to continue");
      return {
        errors: [{
          type: 'ERROR',
          message: error.message
        }],
        success: false
      }
    }

    return next(root, args, context, info);
  };
}

export default Util;
