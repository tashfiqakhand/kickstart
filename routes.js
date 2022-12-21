//routes with custom tokens, will use this file to set up all the dynamic routes inside our application 

const routes = require('next-routes')(); 
//this object conatienrs different helpers that allow us to automatically navigate users around our application and also helps us generate link tags to display inside React components 

//whener users go into a route with dynamic tags
routes
    .add('/campaigns/new', '/campaigns/new')
    .add('/campaigns/:address', '/campaigns/show') //defining a new route maping, the : is a wildcard hence the addresses of campaigns, then show page of /campaigns/show.js
    .add('/campaigns/:address/requests', '/campaigns/requests/index')
    .add('/campaigns/:address/requests/new', '/campaigns/requests/new');
module.exports = routes; 

