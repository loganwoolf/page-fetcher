const request = require('request');

const fs = require('fs');

const server = process.argv[2] || 'http://www.example.edu/';
const path = process.argv[3] || './output.html';

request(server
  , (error, response, content) => {
    error && console.log(`error: ${error}`);
    console.log(`statusCode: ${response.statusCode}`);

    fs.writeFile(path, content, error => {
      if (error) {
        console.error(error);
        return;
      }

    //file written successfully
    });

  });


