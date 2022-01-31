import { useEffect, useState } from "react";
import styled from "styled-components";

const Button = styled.button`
  cursor: pointer;
  background-color: #227c9d;
  color: white;
  font-size: 15px;
  font-weight: 600;
  border: none;
  padding: 20px 25px;
  margin: 20px;
  border-radius: 3em;
  opacity: 0.8;
  transition: all 0.3s;
  &:hover {
    opacity: 1;
  }
  &:active {
    transform: translate(1px, 1px);
  }
  &[disabled] {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Warning = styled.span`
  color: #FFCB77;
  font-size: 18px;
  margin: 20px;
`;

const ConnectWallet = ({ onConnect }) => {
  const [ethereumObject, setEthereumObject] = useState();
  const [metamaskNotInstalled, setMetamaskNotInstalled] = useState(false);
  const connect = async () => {
    try {
      const accounts = await ethereumObject.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        onConnect(accounts[0]);
      }
    } catch(error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const checkIfConnected = async () => {
      try {
        const { ethereum } = window;
        if (!ethereum) {
          setMetamaskNotInstalled(true);
          return;
        } 
        setEthereumObject(ethereum);
        const accounts = await ethereum.request({ method: "eth_accounts" });
        if (accounts.length > 0) {
          onConnect(accounts[0]);
        }
      } catch(error) {
        console.log(error);
      }
    }
    checkIfConnected();
  }, [onConnect]);
  return (
    <>
      {metamaskNotInstalled && <Warning>Metamask has to be installed</Warning>}
      <Button onClick={ connect } disabled={metamaskNotInstalled}>Connect Wallet</Button>
    </>
  )
}

export default ConnectWallet;
