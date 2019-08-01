//模拟数据的json
const userInfo = require("./menuList.json");
const saveData = require("./saveData.json");

const release = {
  [`GET /mock/api/getList`]: (req, res) => {
    return res.json(userInfo);
  },
  "POST /mock/api/zuoyebang/saveData": (req, res) => {
    const { password, username } = req.body;
    if (password === "888888" && username === "admin") {
      return res.json(saveData);
    } else {
      return res.status(403).json({
        status: "error",
        code: 403
      });
    }
  }
};

module.exports = release;
