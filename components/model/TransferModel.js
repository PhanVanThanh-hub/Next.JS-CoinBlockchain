import React,{useState} from 'react';
import styled from 'styled-components';
import Transfer from './Transfer';
import CoinSelector from './CoinSelector';
const TransferModel =(props)=>{
    const {sanityTokens,thirdWebTokens,walletAddress} = props
    const [action , setAction] = useState('send')
    const [selectedToken , setSelectedToken] = useState(sanityTokens[0])
    const selectedStyle={
        color:"rgba(84, 39, 245, 0.8)"
    }

    const unselectedStyle = {
        border:'1px solid #282b2f'
    }
  
    const selectMode = option =>{
        switch(option){
            case 'send':
                return <Transfer 
                            selectedToken={selectedToken}
                            setAction = {setAction}
                            thirdWebTokens = {thirdWebTokens}
                            walletAddress = {walletAddress}    
                        />
            case 'receive':
                return <h2>Receive</h2>
            case 'select':
                return(
                    <CoinSelector
                        setAction = {setAction}
                        selectedToken = {selectedToken}
                        setSelectedToken ={setSelectedToken}
                        sanityTokens= {sanityTokens}
                        thirdWebTokens = {thirdWebTokens}
                        walletAddress ={walletAddress}
                    />
                )
            default:
                return <Transfer/>
        }
    }
    return(
        <Wrapper>
            <Selector>
                <Option style={action ==="send" ? selectedStyle : unselectedStyle} onClick={()=>setAction('send')}>
                    <p >Send</p>
                </Option>
                <Option 
                    style={action ==="receive" ? selectedStyle : unselectedStyle} onClick={()=>setAction('receive')}>
                    <p   >Receive</p>
                </Option>
            </Selector>  
            <ModelMain>
                {selectMode(action)}
            </ModelMain>
        </Wrapper>
    )
}

export default TransferModel;

const Wrapper = styled.div`
    height:35rem;
    width:27rem;
    color:white;
    border:1px solid #282b2f;
    display:flex;
    flex-direction:column;
`

const Selector = styled.div`
    display:flex;
    justify-content:space-evenly;
    align-item:center;
    height:5rem;
`

const Option = styled.div`
    height:100%;
    width:100%;
    display:grid;
    place-items:center;
    font-size:1.2rem;
    font-weight:600;

    &:hover{
        cursor:pointer;
        background-color:#111214;
    }
`

const ModelMain = styled.div`
    padding :1rem;
    flex:1;
`