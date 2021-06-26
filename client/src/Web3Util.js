import Web3 from 'web3';
export const getWeb3 = () =>
    new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
        await window.ethereum.enable();
        resolve(web3);
        } catch (error) {
        reject(error);
        }
    } else if (window.web3) {
        // load metamask provider
        const web3 = window.web3;
        console.log("Injected web3 detected.");
        resolve(web3);
    } else {
        const provider = new Web3.providers.HttpProvider("http://127.0.0.1:8545");
        const web3 = new Web3(provider);
        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
    }
    });
});

/**
 * @Util get contract instance by name 
 * @author christopher chavez
 */
export const getContractInstance = async (web3, contractName) => {
    const networkId = await web3.eth.net.getId();
    const contract = require(`./abi/${contractName}.json`); 

    const deployedNetwork = contract.networks[networkId];
    return new web3.eth.Contract(
        contract.abi,
        deployedNetwork && deployedNetwork.address,
    );
}