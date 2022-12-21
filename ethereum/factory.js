/*
This will allow us to to get access of our deployed instance from anywhere inside our application,
so that we wont have to go through the entier process or importin gweb3 and the interface and to get the 
address and all this stuff. 
Instead, all we have to do to get a handle on our instance is import this factory.js file. 
*/

import web3 from "./web3";
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0x3c1719E021a59C3D849dae5Fe6f215aFbAB35eb7'
);

export default instance; 