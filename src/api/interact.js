import { pinJSONToIPFS } from "./upload.js";
import ElementUI from 'element-ui'
require("dotenv").config()
const alchemyKey = 'https://eth-goerli.g.alchemy.com/v2/Lj8AthiqYuTEvL3zwuvKQJJR9UQ0Thbv'
const contractABI = require("../contract-abi.json")
const contractAddress = "0xbf1c62fdA99b852fF87Fd8d275D2AEabF994fBeC"
const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(alchemyKey)


export const mintNFT = async (url, name, description) => {
    if(!url || !name || !description){
        ElementUI.Message.error('Inputs can not be empty')
        return {
            status: false
        }
    }
    const mintData = new Object()
    mintData.name = name
    mintData.image = url
    mintData.description = description

    const IPFSres = await pinJSONToIPFS(mintData)
    if (!IPFSres.status) {
        this.$message.error('Uploading failed')
    }
    const tokenURI = IPFSres.pinataUrl
    window.contract = await new web3.eth.Contract(contractABI, contractAddress)

    const transactionParams = {
        from: window.ethereum.selectedAddress, 
        to: contractAddress, 
        data: window.contract.methods.mintNFT(window.ethereum.selectedAddress, tokenURI).encodeABI()
    }
    
    try {
        const txHash = await window.ethereum.request({
            method: "eth_sendTransaction",
            params: [transactionParams],
        });
        return {
            status: true,
            result:
            "Check out your transaction on Etherscan: https://goerli.etherscan.io/tx/" +
            txHash,
            }
        } catch (error) {
        return {
            status: false,
        }
    }
}