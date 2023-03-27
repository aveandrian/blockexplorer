import { useLoaderData, NavLink  } from 'react-router-dom';
import { getBlockNumber, getTransactionsinBlock } from '../getBlockNumber';
import { Table, TableBody, TableRow, TableHead, TableCell,   Button } from '@mui/material';
import '../table.css'

export async function loader(){
    let blockNumber = await getBlockNumber()
    let transactionsInBlock = await getTransactionsinBlock(blockNumber)
    return {blockNumber, transactionsInBlock}
}

export default function Root(){
    let {blockNumber, transactionsInBlock} = useLoaderData()
    let blocksArray =[]
    let txsArray = []
    for(let i=blockNumber;i>blockNumber-10;i--){
        blocksArray.push(i)
    }
    for(let i=0;i<10;i++){
        txsArray.push(transactionsInBlock.transactions[i].hash)
    }
    return (
        <>
        <div>
            <Button variant="outlined"><NavLink to='/' style={{ textDecoration: 'none' }}>REFRESH</NavLink></Button>
        </div>
        <div className='container'>
        <div >
            <Table className='leftTable'>
                <TableHead >
                    <TableRow className='row'>
                        <TableCell  className='column'>Last 10 blocks</TableCell >
                    </TableRow>
                </TableHead >
                <TableBody>
                   {blocksArray.map((block)=>{
                        return (
                            <TableRow key={block} className='row'>
                                <TableCell  className='column'><NavLink to={`block/${block}`} >{block}</NavLink></TableCell >
                            </TableRow>
                        )
                   })}
                </TableBody>
            </Table>
        </div>
        <div>
        <Table className='rightTable'>
            <TableHead>
                <TableRow className='row'>
                    <TableCell className='column'>Last 10 Transactions</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {txsArray.map((tx)=>{
                    return (
                        <TableRow key={tx} className='row'>
                            <TableCell className='column'>  
                                <NavLink 
                                to={`tx/${tx}`}
                            >{tx}</NavLink>
                            </TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    </div>
    </div>
    </>
    )
}



export  function Root2(){
    let {blockNumber, transactionsInBlock} = useLoaderData()
    return (
        <div>
         <div className="App">Block Number: {blockNumber} </div>
         <nav>
            { transactionsInBlock.transactions.length ? (
                <table>
                    <thead>
                    <tr>
                        <th>Block number</th>
                        <th>Hash</th>
                        <th>Value</th>
                    </tr>
                    </thead>
                    <tbody>
                    {transactionsInBlock.transactions.map((transaction)=> { 
                    
                        // let valueOfTX = BigNumber(transaction.value).toNumber()
                        return( 
                        <tr key={transaction.transactionIndex}>
                            <td> 
                            {transaction.blockNumber}
                            </td>
                            <td>  <NavLink 
                                to={`tx/${transaction.hash}`}
                            >{transaction.hash}</NavLink>
                            </td>
                            <td>
                                {transaction.transactionIndex}
                            </td>
                        </tr>
                    
                    )}
                   )}
                   </tbody>
                </table>
            ) : 
            (
                <p>
                    No Transactions
                </p>
            )}
         </nav>
        </div>
    )
}