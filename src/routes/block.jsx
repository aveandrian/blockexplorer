import { useLoaderData, NavLink } from "react-router-dom"
import { getBlockDetails } from "../getBlockNumber"
import Web3 from 'web3';
import { Button, Table, TableBody, TableCell, TableRow } from "@mui/material";
import '../table.css'

async function BNtoNumber(BN){
    let txValue = parseInt(BN._hex).toString()
    return Web3.utils.fromWei(txValue)
}

export async function loader({params}){
    let blockDetails = await getBlockDetails(params.blockNumber)
    blockDetails.gasLimit = await BNtoNumber(blockDetails.gasLimit)
    blockDetails.gasUsed = await BNtoNumber(blockDetails.gasUsed)

    return blockDetails
}

export default function Block(){
    const block = useLoaderData()
    return (<>
        <div>
            <Button variant="outlined"><NavLink to='/' style={{ textDecoration: 'none' }}>Home</NavLink></Button>
        </div>
        <div className="container">
        <Table className="centerTable">
            <TableBody>
                <TableRow className="row">
                    <TableCell className="column">
                        Hash:
                    </TableCell>
                    <TableCell className="column">
                        {block.hash}
                    </TableCell>
                </TableRow>
                <TableRow className="row">
                    <TableCell className="column">
                        Block Height:
                    </TableCell>
                    <TableCell className="column">
                        {block.number}
                    </TableCell>
                </TableRow>
                <TableRow className="row">
                    <TableCell className="column">
                        Gas Limit:
                    </TableCell>
                    <TableCell className="column">
                        {block.gasLimit}
                    </TableCell>
                </TableRow>
                <TableRow className="row">
                    <TableCell className="column">
                        Gas used:
                    </TableCell>
                    <TableCell className="column">
                        {block.gasUsed}
                    </TableCell>
                </TableRow>
                <TableRow className="row">
                    <TableCell className="column">
                        Transactions amount:
                    </TableCell>
                    <TableCell className="column">
                        {block.transactions.length}
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </div>
        </>
    )
}