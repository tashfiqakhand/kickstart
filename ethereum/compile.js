const path = require('path');
const solc = require('solc');
const fs = require('fs-extra'); //extra for extra functionality(imporved version of file system module)

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignePath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignePath, 'utf8');
const output = solc.compile(source, 1).contracts; 

fs.ensureDirSync(buildPath); //checks if directory exist, if not, it will create it for us

for (let contract in output){ //for nested contracts 
    fs.outputJSONSync( //writing a json file in build directory name contract key (which starts with : in a loop) and place .json, 
                       //with all the contract info in it in terms of output
        path.resolve(buildPath, contract.replace(':','') + '.json'),
        output[contract]
    );
}