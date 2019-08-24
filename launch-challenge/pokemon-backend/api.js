const https = require("https");

module.exports = {
  API_CALL: function(url) {
    return new Promise((resolve, reject) => {
      https
        .get(url, res => {
          res.setEncoding("utf8");
          let body = "";
          res.on("data", data => {
            body += data;
          });
          res.on("end", () => {
            body = JSON.parse(body);
            resolve(body);
          });
        })
        .on("error", err => {
          reject(err);
        });
    });
  }
};
