# mint_tool

## Project setup

1. Install npm & Node

2. Install the dependency packages:

```
npm install
```

## Available functions
1. Deploy smart contracts

2. Mint NFT

## Deploy smart contracts
1. Input your own Alchemy-API-Key and Private-key in the 'hardhat.config.js' file

2. Create a new. sol file to replace the default file in the 'contracts' directory 

3. Input this line in the terminal: 
```
npx hardhat --network goerli run scripts/deploy.js
```
4. check the new smart contract address in the terminal

## Mint NFT

1. Get your contract-abi.json file(When use this software to deploy a new smart contract, the contract-abi.json file can be created Automatically)

2. Input your Alchemy-API-Key and contract address in the 'Interact.js' file in the 'api' directory

3. Input your Pinata key and Pinata Secret Key in the 'upload.js' file  in the 'api' directory

4. Upload your NFT Image and related nft-metadata.json file to Pinata

5. Input this line in the terminal: 
```
npm run serve
```
6. When the page loaded, log in your wallet

7. following the instructions to input the information needed, and click the 'start mint' button

8. Check the transaction by clicking the given URL


