import { Alchemy, Network } from 'alchemy-sdk';


const settings = {
    apiKey: import.meta.env.VITE_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings); 

export async function getBlockNumber(){
    return await alchemy.core.getBlockNumber()
}

export async function getTransactionsinBlock(blockNumber){
    return await alchemy.core.getBlockWithTransactions(blockNumber)
}

export async function getTransactionDetails(transactionHash){
    return await alchemy.transact.getTransaction(transactionHash)
}

export async function getBlockDetails(blockNumber){
    return await alchemy.core.getBlock(parseInt(blockNumber))
}