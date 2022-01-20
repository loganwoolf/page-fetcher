const request = require('request');
const {constants, access, writeFile, read} = require('fs');

//enable readline
const readline = require('readline');
const {stdin: input, stdout: output} = require('process');
const rl = readline.createInterface({input, output});

// process cmd line args
const server = process.argv[2] || 'http://www.example.edu/';
const path = process.argv[3] || './output.html';


// initial request to server
request(server, (error, response, content) => {
  if (error) {
    console.log(`error: ${error}`);
    if (response) {
      console.log(`statusCode: ${response.statusCode}`);
    }
    process.exit();
  }

  // check if file already exists
  access(path, constants.F_OK, (pathClear) => {

    //if file does not exist
    if (pathClear) {
      writeFile(path, content, (error) => {
        if (error) {
          console.error(error);
          process.exit();
        }
        console.log(`Downloaded and saved ${content.length} bytes to ${path}`);
        //file written successfully
      });
    }

    // file does exist
    if (!pathClear) {
      // console.log('File already exists, specify an different path');
      // prompt to overwrite file
      rl.question(`File at ${path} already exists. Overwrite? [y/N]`, (answer) => {

        if (answer === 'y' || answer === 'Y') {
          writeFile(path, content, (error) => {
            if (error) {
              console.log(`Error: ${error}`);
              process.exit();
            }
            console.log(`Downloaded and saved ${content.length} bytes to ${path}`);
            process.exit();
          });
        } else {
          console.log('Choose a different path name');
          process.exit();
        }
      });



    }
  });
});


