const userInfo = require("./getuserinfo.json");

const release = {
  ["GET /mock/api/author"]: (req, res) => {
    return res.json(userInfo);
  }
};

module.exports = release;
