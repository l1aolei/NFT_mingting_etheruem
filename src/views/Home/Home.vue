<template>
    <div class="home">
        <div class="title">
            <span>Welcome to the simplest NFT minting tool</span>
            <div v-if="!loginStatus">
                <img src="../../assets/wallet.png" alt="" @click="connectEthereum">
                <span class="hasNotLoginHint">👈click here to connect wallet !</span>
            </div>
            <span v-else class="hasLoginHint">Connected: {{ this.accounts[0] }}</span>
        </div>
        <div class="box" v-if="mintingNumberReceived">
            <form>
                <h1>Please inputting the information for your No. {{ this.count }} NFT</h1>
                <h2>Asset URL: </h2>
                <el-input
                    type="text"
                    placeholder="e.g. https://gateway.pinata.cloud/ipfs/<hash>"
                    v-model="url"
                ></el-input>
                <h2>NFT Name: </h2>
                <el-input
                    type="text"
                    placeholder="e.g. My first NFT!"
                    v-model="name"
                ></el-input>
                <h2>Description: </h2>
                <el-input
                    type="text"
                    placeholder="e.g. This a cat !"
                    v-model="description"
                ></el-input>
            </form>
            <div class="confirmButton" v-if="(this.count < this.mintingNumber) && !showResult">
                <el-button type="primary" style="width: 120px" @click="handleSaveNftInfor">Next</el-button>
            </div>
            <div class="confirmButton" v-if="(this.count == this.mintingNumber) && !showResult">
                <el-button type="primary" style="width: 120px" @click="handleMintNft">Start minting</el-button>
            </div>
            <div class="result" v-if="showResult">
                <ul v-for="item in resultLinkBox" :key="item">
                    <li>{{ item }}</li>
                </ul>
            </div>
        </div>
        <div class="box" v-else>
            <form action="">
                <h2>How many NFTs would you like to mint?</h2>
                <el-input-number v-model="mintingNumber" :min="1" :max="10"></el-input-number>
            </form>
            <div class="confirmButton">
                <el-button type="primary" style="width: 120px" @click="handleReceiveMintingNumber">Confirm</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import { mintNFT } from '../../api/interact.js'
export default{
    data() {
        return {
            mintingNumberReceived: false,
            mintingNumber: 0,
            count: 1,
            nftInformationBox: [],
            resultLinkBox: [],
            url: '',
            name: '',
            description: '',
            showResult: false,
            resultUrl: '',
            loginStatus: false,
            accounts: []
        }   
    },

    async mounted() {
        if (window.ethereum) {
            console.log('MetaMask is installed!');
            this.accounts = await window.ethereum.request({
                method: "eth_accounts",
            });
            console.log(this.accounts);
            if(this.accounts.length > 0){
                this.loginStatus = true
            }
        }
    },

    methods: {
        async connectEthereum(){
            this.accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            console.log(this.accounts);
            if(this.accounts.length > 0){
                this.loginStatus = true
            }
        },

        handleSaveNftInfor(){
            this.nftInformationBox.push({
                url: this.url,
                name: this.name,
                description: this.description
            })
            this.url = '',
            this.name = '',
            this.description = ''
            this.count++
        },

        async handleMintNft(){
            this.handleSaveNftInfor()
            if(this.accounts.length == 0){
                this.$message.error('Please login first !')
            }else{
                for(let i = 0; i < this.nftInformationBox.length; i++){
                    let res = await mintNFT(this.nftInformationBox[i].url, this.nftInformationBox[i].name, this.nftInformationBox[i].description)
                    console.log(res);
                    if(res.status){
                        this.resultLinkBox.push(res.result)
                    } else {
                        this.$message.error(`the process of minting ${this.nftInformationBox[i].name} went wrong`)
                    }   
                }
                this.showResult = true
                this.resultUrl = this.resultLinkBox
            }
        },

        handleReceiveMintingNumber(){
            this.mintingNumberReceived = true
        }
    }
}
</script>
<style lang="less" scoped>
.home{
        width: 100%;
        height: 100%;
        .title{
            width: 550px;
            height: 30px;
            margin: 20px auto;
            position: relative;
            >span{
                font-size: 25px;
                text-align: center;
           }
           img{
                width: 30px;
                height: 30px;
                position: absolute;
                right: -200px;
                cursor: pointer;
            }
            .hasLoginHint{
                position: absolute;
                top: 50px;
                font-size: 16px;
                width: 200px;
                height: 30px;
                line-height: 30px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                right: -400px;
                border: 1px solid gray;
                box-shadow: gray 1px 1px;
                padding: 10px;
                border-radius: 10%;
                cursor: pointer;
            }
            .hasNotLoginHint{
                position: absolute;
                font-size: 16px;
                top: 36px;
                right: -440px;
            }
        }
        .box{
            width: 50%;
            min-height: 500px;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            border: 1px solid black;
            padding: 10px;
            > form {
                width: 100%;
            }
            .confirmButton{
                width: 100px;
                margin: 10px auto;
            }
        
        }
   }
</style>