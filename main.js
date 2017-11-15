const httpProxy = require("http-proxy");
const http = require("http");
const HOST1 = "https://app1.eastus.cloudapp.azure.com";
const HOST2 = "https://app2.westus2.cloudapp.azure.com";

const proxy = httpProxy.createProxy();

http
  .createServer(function(req, res) {
    let remote = HOST1;
    if (req.url.startsWith("/waittime")) {
      remote = HOST2;
    }
    proxy.web(req, res, {
      target: remote,
      secure: false
    });
  })
  .listen(process.env.PORT || 3000);
