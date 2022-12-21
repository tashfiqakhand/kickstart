import React, {Component} from "react";
import Layout from "../../components/Layout"; //up 2 directories
import {Form, Button, Input, Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from "../../ethereum/web3";
import {Router} from '../../routes';
//Router allows us to programmatically redirect users from one page to another page inside of our app. 
//so once users create a campaign, we will automatically redirect them back to the root route of our application
class CampaignNew extends Component {
    state = { //event handler
        minimumContribution: '',
        errorMessage: '',
        loading: false
    };

    onSubmit = async (event) => { //event handler when submitting 
        event.preventDefault(); //will prevent the browser from attempting to submit the form
        this.setState({loading: true, errorMessage: ''});
        try{
            const accounts = await web3.eth.getAccounts();
            await factory.methods.createCampaign(this.state.minimumContribution).send({
                //dont need specify gas amaount, only needed with tests, metamask handles this for us in prod
                from: accounts[0]
            });
            Router.pushRoute('/');//now redirect to root page
        } catch (err) {
            this.setState({errorMessage: err.message}); //error displayed as a message in the render 
        }
        this.setState({loading: false});
    };

    render(){
        return (
            <Layout>
                <h3>Create a Campaign</h3>

                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label="wei" 
                            labelPosition="right"
                            value={this.state.minimumContribution}
                            onChange={event => this.setState({minimumContribution: event.target.value})}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Button loading={this.state.loading} primary>Create!</Button>
                </Form>
            </Layout>
        );
    }
}

export default CampaignNew;