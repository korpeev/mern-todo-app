const jwt = require("jsonwebtoken");
const Token = require("../models/Token");

class TokenService {
  generateToken(payload) {
    const accesToken = jwt.sign(payload, process.env.JWT_ACCESS_TOKEN, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_TOKEN, {
      expiresIn: "30d",
    });

    return {
      accesToken,
      refreshToken,
    };
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findOne({ user: userId });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await Token.create({ user: userId, refreshToken });
    return token;
  }
  async removeToken(refreshToken) {
    const token = await Token.deleteOne({ refreshToken });
    return token;
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_TOKEN);
      return userData;
    } catch (error) {
      return null;
    }
  }
  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_TOKEN);
      return userData;
    } catch (error) {
      return null;
    }
  }
  async findToken(refreshToken) {
    const tokenData = await Token.findOne({ refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService();
