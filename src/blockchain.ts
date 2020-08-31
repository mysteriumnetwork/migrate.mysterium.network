import Web3 from 'web3';
import BN from 'bn.js'
import abi from './tokenABI.json'

const web3 = new Web3('wss://mainnet.infura.io/ws/v3/048b64dd20b7446e9f0ce3a4c79ea13d')
const TokenContractAddress = '0xa645264C5603E96c3b0B078cdab68733794B0A71'
const token = new web3.eth.Contract((abi as any), TokenContractAddress)

export async function getAddressBalance(address: string): Promise<string> {
    const balance = await token.methods.balanceOf(address).call()
    return balance
}

export function isBlockchainAddress(address: string): boolean {
    return web3.utils.isAddress(address)
}

export function encodeTxData(amount: BN = new BN(0)) {
    return token.methods.upgrade(amount).encodeABI();
}
