var tunnel = require('tunnel');
var fs = require('fs');

var tunnelingAgent = tunnel.httpsOverHttp({
    
    // CA for origin server if necessary 
    ca: [ fs.readFileSync('/Users/user_name/Documents/certs/proxy.pem'),  // Just assuming the certs are in this path
          fs.readFileSync('/Users/user_name/Documents/certs/issuer.pem'),
          fs.readFileSync('/Users/user_name/Documents/certs/root.pem')
        ],
   
    // Client certification for origin server if necessary 
    // key: fs.readFileSync('origin-server-key.pem'),
    // cert: fs.readFileSync('origin-server-cert.pem'), 
   
    proxy: { // Proxy settings 
      host: 'proxy-url', // Defaults to 'localhost'  
      proxyAuth: 'user:password',
      // Header fields for proxy server if necessary 
    //   headers: {
    //     'User-Agent': 'Node'
    //   },
    }
  });


var certs = []

module.exports = {
    region: 'us-east-1',
    //endpoint: 'http://localhost:8000' #use this is using local dynamodb 
    endpoint: 'https://dynamodb.us-east-1.amazonaws.com',
    httpOptions: {
        agent: tunnelingAgent
    }
}