import React ,{useState,useEffect} from 'react'
import styled from 'styled-components';
import {FaWallet} from 'react-icons/fa';
import imageUrlBuilder  from '@sanity/image-url';
import client from '../../lib/sanity'
const Transfer =(props)=>{
                            
    const {selectedToken,setAction,thirdWebTokens,walletAddress} = props
    const [amount , setAmount] = useState()
    const [recipient, setRecipient] = useState('')
    const [imageUrl,setImageUrl] = useState(null)
    const [activeThirdWebToken , setActiveThirdWebToken] = useState()
    const [balance , setBalance] = useState('Fetching')
     
    useEffect(()=>{
        const activeToken = thirdWebTokens.find(
            token => token.address === selectedToken.contractAddress
        )
        setActiveThirdWebToken(activeToken)
    },[selectedToken,thirdWebTokens])

    useEffect(()=>{
        try{
            const url=imageUrlBuilder(client).image(selectedToken.logo).url()
       
            setImageUrl(url)
        }
        catch{
        }
    },[selectedToken])
     
    useEffect(()=>{
        const getBalance = async ()=>{
            const balance = await activeThirdWebToken.balanceOf(walletAddress)
            setBalance(balance.displayValue)
        }
        if(activeThirdWebToken){
            getBalance()
        }
    },[activeThirdWebToken])

    const sendCrypto = async (amount,recipient)=>{
        console.log("sending crypto...")
        console.log("amount:",amount,':',recipient,':',activeThirdWebToken)
        if(activeThirdWebToken && amount && recipient){
            const tx= await activeThirdWebToken.transfer(
                recipient,
                amount.toString().concat('0000000000000000')
            ) 
            console.log("tx:",tx)
            setAction('transferred')
        }
        else{
            console.error('missing data')
        }
         
    }

    return(
        <Wrapper>
            <Amount>
                <FlexInputContainer>
                    <FlexInput 
                        placeholder='0'
                        type="number"
                        value={amount}
                        onChange={e =>setAmount(e.target.value)}
                    
                    />
                    <span>ETH</span>
                </FlexInputContainer>
                <Waring style={{color: amount && '#0a0b0d'}}>
                    amount is a required field
                </Waring>
            </Amount>
            <TransferForm>
                <Row>
                    <FieldName>To</FieldName>
                    <Icon>
                        <FaWallet/>
                    </Icon>
                    <Recipient 
                        placeholder='Address'
                        value = {recipient}
                        onChange = {e=>setRecipient(e.target.value)}
                    />
                </Row>
                <Divider/>
                <Row>
                    <FieldName>Pay with</FieldName>
                    <CoinSelectList>
                        <Icon>
                            <img src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fvtv1.mediacdn.vn%2Fthumb_w%2F650%2F2019%2F7%2F16%2Flapremiereofspider-man-homecoming-2-15632612816762076172665.jpg&imgrefurl=https%3A%2F%2Fvtv.vn%2Fvan-hoa-giai-tri%2Frobert-downey-jr-muon-tach-minh-khoi-vai-dien-iron-man-20190716141625125.htm&tbnid=Vjp2mqtjhkAMgM&vet=12ahUKEwjRge34gfr1AhUpXmwGHQuxABUQMygCegUIARC7AQ..i&docid=MMihHlMO5BEnyM&w=650&h=433&q=robert%20downey%20jr&ved=2ahUKEwjRge34gfr1AhUpXmwGHQuxABUQMygCegUIARC7AQ" 
                            alt=""/>
                        </Icon>
                        <CoinName>{selectedToken.name}</CoinName>
                    </CoinSelectList> 
                </Row>
                
            </TransferForm>
            <Row>
                <Continue onClick={()=>sendCrypto(amount,recipient)}>Continue</Continue>
            </Row>
            <Row>
                <BalanceTitle>
                    {selectedToken.symbol}
                </BalanceTitle>
                <Balance>
                    {balance} {selectedToken.symbol}
                </Balance>
            </Row>
        </Wrapper>
         
    )
}
export default Transfer

const Wrapper = styled.div`
    display:flex;
    flex-direction:column;
    height:100%;
    flex:1;
    
`

const Amount = styled.div`
    flex :1;
    display:flex;
    flex-direction:column;
`

const FlexInputContainer = styled.div`
    flex:1;
    display:flex;
    align-item:flex-end;

    & > span {
        font-size:3rem;
        margin-bottom : 0.5rem;
        color:#3773f5;
        align-items: center;
        justify-content: center;
        display: flex;
    }

     
`
const FlexInput = styled.input`
    border:none;
    background:none;
    outline:none;
    color:white;
    font-size:1.2rem;
    text-wrap:wrap;
    text-align:right; 
    max-width:45%;
    margin-right:1rem;
    font-size:4.5rem;
    color:#3883f5;
    &:: -webkit-outer-spin-button,
    :: -webkit-inner-spin-button {
        -webkit-appearance:none;
    }
`

const Waring = styled.div`
    padding:1rem 0 2rem 0;
    text-align:center;
    color:#8a919e;
`

const Divider = styled.div`
    border-bottom : 1px solid @282b2f;
`
const TransferForm = styled.div`
    border: 1px solid #282b2f;
    border-radius:0.4rem;
`

const Row = styled.div`
    display:flex;
    align-items:center;
    justify-content:space-between;
    color:#8a919e;
    padding:1rem 0;
    font-size:1.2rem;
`

const FieldName = styled.div`
    flex:0.5;
    padding-Left:2rem;
`

const Icon = styled.div`
    margin-right:1rem;
    height:1.8rem;
    width:1.8rem;
    border-radius:50%;
    overflow:hidden;
    display:grid;
    place-items:center;

    & > img{
        height:120%;
        width:120%;
        object-fit:cover;
    }
`

const Recipient = styled.input`
    flex:1;
    border:none;
    background:none;
    outline:none;
    color:white;
    font-size:1.2rem;
    text-wrap:wrap;
    margin-right:0.5rem;
`

const CoinSelectList = styled.div`
    display:flex;
    flex:1.3;
    height:100%;

    & :hover{
        cursor:pointer;
    }
`

const CoinName = styled.div`
    flex:1;
    border:none;
    background:none;
    outline:none;
    color:white;
    font-size:1.2rem;
    text-wrap:wrap;
    margin-right:0.5rem;
`
const Continue =styled.div`
    color:white;
    width:100%;
    background-color:#3773f5;
    padding:1rem;
    text-algin:center;
    border-radius:0.4rem;
    font-size:1.2rem;

    & :hover{
        cursor:pointer;
        background-color:#4a80f6;
    }
`
const BalanceTitle = styled.div`

`

const Balance = styled.div`

`