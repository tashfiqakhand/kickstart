import React, { Component } from "react";
import factory from '../ethereum/factory';
import { Card, Button } from 'semantic-ui-react';
import Layout from '../components/Layout';
import {Link} from '../routes';

//functional component 
// export default () => {
//     return <h1> This is the campaign list page!!!</h1>;
// };

//class based component
class CampaignIndex extends Component{
    static async getInitialProps(){
        /*static defines a class function, so this function is assigned to the class itself, 
        not instances of the class, so we can do variable.getInitialProps and dont have to make 
        instances of the class. THIS IS REQUIRED BY NEXT FOR INITIAL DATA.
        */
        const campaigns = await factory.methods.getDeployedCampaigns().call();

        return {campaigns}; //{campaigns: campaigns}

    }
    // async componentDidMount() {
        
    //     const campaigns = await factory.methods.getDeployedCampaigns().call();
    // }

    renderCampaigns(){
       const items = this.props.campaigns.map(address => { //loop
            return{
                header: address,
                description: (
                    <Link route={`campaigns/${address}`}>
                        <a>View Campaign</a>
                    </Link>
                ),
                fluid: true //card will stretch to the entier width of the container
            };
       });

       return <Card.Group items={items} />
    }

    render(){ //what will be shown on the main page itself
        return (
            <Layout>
            <div>
                <h3>Open Campaigns</h3>
                <Link route="campaigns/new">
                    <a>
                        <Button floated="right"
                            content="Create Campaign"
                            icon="add circle"//will make a plus signal with a circle on it
                            primary //primary={true} //adds blue color in the button 
                        />
                    </a>
                </Link>
                {this.renderCampaigns()}
            </div>
            </Layout>
        );
    }
}

export default CampaignIndex;