const request = require('request');
const readline = require('readline');
const {constants, access, writeFile} = require('fs');


const server = process.argv[2] || 'http://www.example.edu/';
const path = process.argv[3] || './output.html';

request(server
  , (error, response, content) => {
    error && console.log(`error: ${error}`);
    console.log(`statusCode: ${response.statusCode}`);

    access(path, constants.F_OK, () => {
      
    });

    writeFile(path, content, error => {
      if (error) {
        console.error(error);
        return;
      }
      console.log(`Downloaded and saved ${content.length} bytes to ${path}`);
      //file written successfully
    });
      

  });


