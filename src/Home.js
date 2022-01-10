import React, {useState, useEffect} from 'react'
import "./App.css"
import { useNavigate } from 'react-router-dom'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import {stakingAddr, marketAddr, rewardAddr} from "./addr";
import MarketToken from './artifacts/contracts/MarketToken.sol/MarketToken.json'
import StakingToken from './artifacts/contracts/StakingToken.sol/StakingToken.json'
import RewardToken from './artifacts/contracts/RewardToken.sol/RewardToken.json'


const Home = () => {

    const [stakeAmount, setStakeAmount] = useState(0);
    const [withdrawAmount, setWithdrawAmount] = useState(0);
    const [apamount, setApamount] = useState(0)

    const [tokenData, setTokenData] = useState({'totalTokenInMarket': 0, 'myDeposits': 0, 'rewardEarned': 0});

    async function loadData(){
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)    
        const signer = provider.getSigner()
        let useraddr = signer.getAddress()
        let staCon = new ethers.Contract(stakingAddr, StakingToken.abi, signer)
        let amt = 1000;
        let mintt = await staCon.allowance(useraddr, marketAddr )
        console.log(mintt.toString())

        let contract = new ethers.Contract(marketAddr, MarketToken.abi, signer)
        let addrr = await signer.getAddress();
        console.log(addrr)
        let totalToken = await contract.balance();
        let MyDeposit = await contract.balanceOf(addrr);
        let rewardearn = await contract.rewardEarned();
        setTokenData({rewardEarned: rewardearn.toString(),myDeposits: MyDeposit.toString() ,totalTokenInMarket: totalToken.toString()})
        // console.log(transaction.toString())


    }

    useEffect(() => {
        loadData()
    }, [])

    async function stake() {
        try {
            var txarea = document.createElement("H2");
            var t = document.createTextNode("Transaction Pending");
            
            txarea.appendChild(t)
            document.body.appendChild(txarea);
            
            const web3Modal = new Web3Modal()
            const connection = await web3Modal.connect()
            const provider = new ethers.providers.Web3Provider(connection)    
            const signer = provider.getSigner()
    
            let contract = new ethers.Contract(marketAddr, MarketToken.abi, signer)
            let transaction = await contract.stake(stakeAmount);
            
            let tx = await transaction.wait();
            // setTx(tx);
    
                txarea.removeChild(t)            
                txarea.appendChild(document.createTextNode("Transaction Successful"))
                document.body.appendChild(txarea);
        
            console.log(tx);
            
            setTimeout(() => {
                window.location.replace("/")
            }, 5000);
        } catch (error) {
            console.log(error);
            txarea.removeChild(t)            
            txarea.appendChild(document.createTextNode("Transaction UNsuccessful"))
            document.body.appendChild(txarea);

        }
       

    }

    // Withdraw

 async function withdraw() {
        try {
            var txarea = document.createElement("H2");
        var t = document.createTextNode("Transaction Pending");
        
        txarea.appendChild(t)
        document.body.appendChild(txarea);
        
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)    
        const signer = provider.getSigner()

        let contract = new ethers.Contract(marketAddr, MarketToken.abi, signer)
        let transaction = await contract.exit(withdrawAmount);
        
        let tx = await transaction.wait();
        // setTx(tx);

        txarea.removeChild(t)            
        txarea.appendChild(document.createTextNode("Transaction Successful"))
        document.body.appendChild(txarea);

    

        console.log(tx);
        // setTimeout(() => {
        //     window.location.replace("/")
        // }, 5000);
        

        } catch (error) {
            console.log(error);
            txarea.removeChild(t)            
            txarea.appendChild(document.createTextNode("Transaction UNsuccessful"))
            document.body.appendChild(txarea);
        }
        var btn = document.createElement("button");
        btn.innerHTML = "Refresh"
        btn.onclick = function () {
           window.location.replace('/')
         };
        document.body.appendChild(btn)

         
        
        }

    async function approveTokens() {
        try {
            var txarea = document.createElement("H2");
        var t = document.createTextNode("Transaction Pending");
        
        txarea.appendChild(t)
        document.body.appendChild(txarea);
        
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)    
        const signer = provider.getSigner()

        let contract = new ethers.Contract(stakingAddr,StakingToken.abi, signer)
        let transaction = await contract.approve(marketAddr, apamount);
        
        let tx = await transaction.wait();        

        txarea.removeChild(t)            
        txarea.appendChild(document.createTextNode("Approved"))
        document.body.appendChild(txarea);   

        console.log(tx);
        setTimeout(() => {
            window.location.replace("/")
        }, 3000);

        } catch (error) {
            console.log(error);
            txarea.removeChild(t)            
            txarea.appendChild(document.createTextNode("Transaction UNApproved"))
            document.body.appendChild(txarea);
        }
        
    }


    return (
      <div className='big-wrap'>
          
        <div className='f-cont'>
            <h2><u>DeFi App</u></h2>
            <div className='lbp'>
                <label htmlFor="Total">Total Deposits in Market: </label>
                <p id='Total'>{tokenData.totalTokenInMarket}</p>
            </div>
            <div className='lbp'>
                <label htmlFor="My">My Deposits: </label>
                <p id='My'>{tokenData.myDeposits}</p>
            </div>
            <div className='lbp'>
                <label htmlFor="reward">Total Reward Earned: </label>
                <p id='reward'>{tokenData.rewardEarned}</p>
            </div>
            
        </div>
        <div className='container'>
            <div className='wrapper'>
                <label className='lab'>Enter amount To Approve</label>
                <input className='Input' name='withdrawInput' type='text' value={apamount} onChange={(e) => setApamount(e.target.value)}/>
                <button className='stakeBtn' onClick={approveTokens}>ApproveTokens</button>
            </div>
            <div className='wrapper'>
                <label className='lab'>Enter amount To Stake</label>
                <input className='Input' name='stakeInput' type='text' value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)}/>
                <button className='stakeBtn' onClick={stake}>Stake</button>
            </div>
            <div className='wrapper'>
                <label className='lab'>Enter amount To Withdraw</label>
                <input className='Input' name='withdrawInput' type='text' value={withdrawAmount} onChange={(e) => setWithdrawAmount(e.target.value)}/>
                <button className='stakeBtn' onClick={withdraw}>Withdraw</button>
            </div>
          
        </div>
    </div>   
    )
}

export default Home
