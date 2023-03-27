import { useLoaderData, NavLink  } from "react-router-dom"
import { getTransactionDetails } from "../getBlockNumber"
import Web3 from 'web3';
import { Table, TableBody, TableRow, TableCell, Button  } from "@mui/material";
import '../table.css'

async function BNtoNumber(BN){
    let txValue = parseInt(BN._hex).toString()
    return Web3.utils.fromWei(txValue)
}

export async function loader({params}){
    let transactionDetails = await getTransactionDetails(params.txHash)
    transactionDetails.value = await BNtoNumber(transactionDetails.value)
    transactionDetails.gasPrice = await BNtoNumber(transactionDetails.gasPrice)

    return transactionDetails
}

export default function Transaction(){
    const transaction = useLoaderData()
    return (
        <>
        <div>
            <Button variant="outlined"><NavLink to='/' style={{ textDecoration: 'none' }}>Home</NavLink></Button>
        </div>
        <div className="container">
        <Table>
            <TableBody>
                <TableRow className="row">
                    <TableCell className='column'>
                        Hash:
                    </TableCell>
                    <TableCell className='column'>
                        {transaction.hash}
                    </TableCell>
                </TableRow>
                <TableRow className="row">
                    <TableCell className='column'>
                        Block Height:
                    </TableCell>
                    <TableCell className='column'>
                        {transaction.blockNumber}
                    </TableCell>
                </TableRow>
                <TableRow className="row">
                    <TableCell className='column'>
                        From:
                    </TableCell>
                    <TableCell className='column'>
                        {transaction.from}
                    </TableCell>
                </TableRow>
                <TableRow className="row">
                    <TableCell className='column'>
                        To:
                    </TableCell>
                    <TableCell className='column'>
                        {transaction.to}
                    </TableCell>
                </TableRow>
                <TableRow className="row">
                    <TableCell className='column'>
                        Value:
                    </TableCell>
                    <TableCell className='column'>
                        {transaction.value} ETH
                    </TableCell>
                </TableRow>
                <TableRow className="row">
                    <TableCell className='column'>
                        Gas Price:
                    </TableCell>
                    <TableCell className='column'>
                        {transaction.gasPrice} ETH
                    </TableCell>
                </TableRow>
                {transaction.timestamp ? (
                <TableRow className="row">
                    <TableCell className='column'>
                        Timestamp:
                    </TableCell>
                    <TableCell className='column'>
                        {transaction.timestamp}
                    </TableCell>
                </TableRow>) : (<></>)
                }
                <TableRow className="row">
                    <TableCell className='column'>
                        Confirmations:
                    </TableCell>
                    <TableCell className='column'>
                        {transaction.confirmations}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </div>
        </>
    )
}