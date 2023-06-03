<template>
    <div class="home">
        <div class="title">
            <span>Welcome to the simplest NFT minting tool</span>
            <!-- <div v-if="!loginStatus"> -->
            <div>
                <img src="../../assets/wallet.png" alt="" @click="connectEthereum">
                <span class="hasNotLoginHint">👈click here to connect wallet !</span>
            </div>
            <!-- <div v-else> -->
            <div>
                <span class="hasLoginHint">Connected: {{ this.accounts[0] }}</span>
                <el-button type="success" class="checkNFTsButton" style="width: 200px" @click="checkBoxVisible = !checkBoxVisible">Check My NFTs</el-button>
            </div>
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
                <h2>Based NFT id: (Optional)</h2>
                <el-input
                    type="text"
                    placeholder=""
                    v-model="basedNFTId"
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

        <el-dialog
            title="My NFTs"
            :visible.sync="checkBoxVisible"
            class="CheckNftBox"
            width="50%"
            >
            <div @click="checkBasedNFT">
                <el-tooltip class="item" effect="dark" content="Check Based NFT" placement="top">
                    <img width="200px" height="200px" src="../../assets/image.jpg" alt="">
                </el-tooltip>
                <span style="width:200px;display: block;text-align: center;">test1</span>
                <span style="width:200px;display: block;text-align: center;">NFT id: {{ defaultId }}</span>
                <span style="width:200px;display: block;text-align: center;">based NFT id: null</span>
            </div>
            <template v-if="showResult">
                <div v-for="item in nftInformationBox" @click="checkBasedNFT">
                    <img width="200px" height="200px" src="" alt="">
                    <span style="width:200px;display: block;text-align: center;">{{}}</span>
                    <span style="width:200px;display: block;text-align: center;">NFT id: {{  }}</span>
                    <span style="width:200px;display: block;text-align: center;">based NFT id: {{ }}</span>
                </div>
            </template>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="checkBoxVisible = false">Close</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="Based NFTs"
            :visible.sync="checkBasedNFTVisible"
            class="CheckNftBox"
            width="50%"
            >
            <div>
                <img width="200px" height="200px" src="../../assets/syz.jpg" alt="">
                <span style="width:200px;display: block;text-align: center;">syz</span>
                <span style="width:200px;display: block;text-align: center;">NFT id: {{ defaultId2 }}</span>
                <span style="width:200px;display: block;text-align: center;">based NFT id: {{ defaultId }}</span>
            </div>
            <template v-if="showResult">
                <div v-for="item in nftInformationBox">
                    <img width="200px" height="200px" src="" alt="">
                    <span style="width:200px;display: block;text-align: center;">{{ }}</span>
                    <span style="width:200px;display: block;text-align: center;">NFT id: {{  }}</span>
                    <span style="width:200px;display: block;text-align: center;">based NFT id: {{ }}</span>
                </div>
            </template>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="checkBasedNFTVisible = false">Close</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { customAlphabet } from 'nanoid'
import { mintNFT } from '../../api/interact.js'
const nanoid = customAlphabet('1234567890', 6)
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
            basedNFTId: "",
            showResult: false,
            resultUrl: '',
            loginStatus: false,
            accounts: [],
            checkBoxVisible: false,
            checkBasedNFTVisible: false,
            defaultId: nanoid(),
            defaultId2: nanoid()
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
                description: this.description,
                basedNFTId: this.basedNFTId
            })
            this.url = '',
            this.name = '',
            this.description = ''
            this.basedNFTId = ''
            if(this.count < this.mintingNumber){
                this.count++
            }
        },

        async handleMintNft(){
            this.handleSaveNftInfor()
            if(this.accounts.length == 0){
                this.$message.error('Please login first !')
            }else{
                for(let i = 0; i < this.nftInformationBox.length; i++){
                    let res = await mintNFT(this.nftInformationBox[i].url, 
                    this.nftInformationBox[i].name, 
                    this.nftInformationBox[i].description)
                    console.log(res)
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
        },

        checkBasedNFT(){
            this.checkBasedNFTVisible = this.defaultId ? true : false
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

            .checkNFTsButton{
                position: absolute;
                top: 150px;
                right: -390px;
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