const { response } = require("express");
const nodeRequest = require("request");
const { nodeHost } = require("../../mfspa.config");

const DEFAULT_HEADERS = {
  "content-type": "application/json",
};

const post = async (
  url,
  params,
  { headers } = { headers: DEFAULT_HEADERS }
) => {
  return new Promise((resolve, reject) => {
    url = `${nodeHost}${url}`;
    let body = params;
    if (headers["content-type"] === "application/json") {
      body = JSON.stringify(params);
    }
    nodeRequest(
      url,
      { method: "POST", headers, body },
      (error, response, body) => {
        if (!!error) {
          reject(error);
          return;
        }
        resolve(response);
      }
    );
  });
};

const request = { post };

module.exports = request;
