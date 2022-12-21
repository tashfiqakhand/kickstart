import React, {Component} from "react";
import {Button, Table} from 'semantic-ui-react';
import {Link} from '../../../routes';
import Layout from "../../../components/Layout";
import Campaign from "../../../ethereum/campaign";
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends Component{
    static async getInitialProps(props){ //to get our address out of the URL and pass it into our component as "props"
        const {address} = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const approversCount = await campaign.methods.approversCount().call();

        const requests = await Promise.all( //fancy javascript for iteration 
            Array(parseInt(requestCount))
            .fill() //to give a list of all the indices i needed from the campaign 
            .map((elenebt, index) => {
                return campaign.methods.requests(index).call(); //will retrieve a given individual request
            })
        );

        return {address, requests, requestCount, approversCount};
    }

    renderRows(){
        return this.props.requests.map((request, index) => {
            return <RequestRow 
                key={index} //React wants us to always pass in a key whenevr we are rendering a list of components
                id={index}
                request={request}
                address={this.props.address}
                approversCount={this.props.approversCount}
            />
        });
    }


    render() {
        const {Header, Row, HeaderCell, Body} = Table; //removes the need to type header, row, blah blah over and over again 

        return (
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{ marginBottom: 10 }}>
                            Add Request
                        </Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>Found {this.props.requestCount} requests.</div>
            </Layout>
        );
    }
}

export default RequestIndex;