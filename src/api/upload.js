require('dotenv').config();
const key = '7567202fca9236448a21'
const secret = '789aaf633b725540854912a87d88b749c979f6738e5c11ae89c13efc9c719a31'
import axios from 'axios'

export const pinJSONToIPFS = async (data) => {
    const url = `https://api.pinata.cloud/pinning/pinJSONToIPFS`
    return axios.post(url, data, {
        headers: {
            pinata_api_key: key,
            pinata_secret_api_key: secret,
        }
    }).then((value) => {
        return {
            status: true,
            pinataUrl: "https://gateway.pinata.cloud/ipfs/" + value.data.IpfsHash
        }
    }).catch(function (e) {
        console.log(e)
        return {
            status: false,
            message: error.message,
        }
    })
}