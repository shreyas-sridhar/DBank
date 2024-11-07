import Web3 from 'web3';

// Initialize Web3 with MetaMask's Provider
const web3 = new Web3(window.ethereum);

let selectedAccount;

const contractABI = [
    abi.json
];

const contractAddress = '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4'; // Your deployed contract address

const contract = new web3.eth.Contract(contractABI, contractAddress);

async function connectWallet() {
    try {
        // Request access to MetaMask accounts
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        selectedAccount = accounts[0];
        console.log('Connected to MetaMask:', selectedAccount);
    } catch (error) {
        console.error('Failed to connect to MetaMask:', error);
    }
}

async function createUser() {
    const userName = document.getElementById('newUserName').value;
    const userPin = document.getElementById('newUserPin').value;
    
    try {
        const response = await contract.methods.createUser(userName, parseInt(userPin)).send({from: selectedAccount});
        console.log('User created:', response);
    } catch (error) {
        console.error('Error creating user:', error);
    }
}

async function performTransaction() {
    const fromAddress = selectedAccount; // Use selectedAccount to ensure the connected account is used
    const toUserName = document.getElementById('toUserName').value;
    const amount = document.getElementById('transferAmount').value;
    const pin = document.getElementById('userPin').value; // Assuming you also need to enter a PIN

    try {
        const response = await contract.methods.performTransaction(fromAddress, toUserName, amount, pin).send({from: fromAddress, value: web3.utils.toWei(amount, 'ether')});
        console.log('Transaction successful:', response);
    } catch (error) {
        console.error('Transaction failed:', error);
    }
}

// Other functions for deposit, check balance, etc.

// Example function for checking balance
async function checkBalance() {
    try {
        const balance = await contract.methods.getBankBalance().call({from: selectedAccount});
        console.log('Bank Balance:', balance);
    } catch (error) {
        console.error('Error checking balance:', error);
    }
}