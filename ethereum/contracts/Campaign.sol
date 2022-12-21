pragma solidity ^0.4.17;

contract CampaignFactory{
    address[] public deployedCampaigns;

    function createCampaign(uint minimum) public{ //minimum is the minimum contribution to enter into this new campaign
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    function getDeployedCampaigns() public view returns (address[]){ //view means no data inside the contract is modified by this function (READ-ONLY)
        return deployedCampaigns;
    }
}

contract Campaign{
    struct Request{ //a struct definition, cant make an instance of a request, so a varible can be a type of a struct(Request for this example)
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager; // dont care if people know the address for the manager (public)
    uint public minimumContribution;
    //address[] public approvers; //arrays will take too much gas
    mapping(address => bool) public approvers; //address is the type of key, and book is the type of value
    Request[] public requests; //type struct
    uint public approversCount; //count of people that exists inside the mapping of approvers

    modifier restricted(){ //only manager 
        require(msg.sender == manager);
        _; //pasting this function something else so that means that this will play thyen which function it was called in will play after
    }

    function Campaign(uint minimum, address creator) public{
        manager = creator;
        minimumContribution = minimum; 
    }

    function contribute() public payable{ //able to receive some amount of money
        require(msg.value > minimumContribution); //if statement

        //approvers.push(msg.sender); //for arrays
        approvers[msg.sender] = true; //for mappings
        approversCount++; //number of people that have joined in and contributed to this contract
    }

    function createRequest(string description, uint value, address recipient) public restricted{
        Request memory newRequest = Request({ //has to be in memory, cant be storage since it doesnt exist in storage
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
            //dont have to put mappings
        });
        requests.push(newRequest);
    }

    function approveRequest(uint index) public{
        Request storage request = requests[index];

        require(approvers[msg.sender]); //true
        require(!request.approvals[msg.sender]);//if this person has already vited on this contract and their address exists inside this mapping, then kick that user at of this functin for a request
        
        request.approvals[msg.sender] = true; //so if the user tries to vite again, then it will kick the out due to the second require if statement
        request.approvalCount++;
    }

    function finalizeRequest(uint index) public restricted{
        Request storage request = requests[index];

        require(request.approvalCount > (approversCount/2)); //so atleast more than half needs to approve for this request to be released
        require(!request.complete);

        request.recipient.transfer(request.value);
        request.complete = true;
    }

    function getSummary() public view returns (uint, uint, uint, uint, address){
        return (
            minimumContribution,
            this.balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    } 

} 