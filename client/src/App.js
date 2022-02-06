import Arena from "./components/Arena";
import ConnectWallet from "./components/ConnectWallet";
import ConnectedAccount from "./components/ConnectedAccount";
import GameContract from "./artifacts/contracts/EpicGame.sol/EpicGame.json";
import Header from  "./components/Header";
import SelectCharacter from "./components/SelectCharacter";
import addresses from "./.env/contract-addresses.json";
import styled from "styled-components";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

import "./App.css";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const App = () => {
  const [connectedAccount, setConnectedAccount] = useState();
  const [accountHasNFT, setAccountHasNFT] = useState();
  const [gameContract, setGameContract] = useState();
  const initializeContract = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setGameContract(new ethers.Contract(
        addresses.gameContract,
        GameContract.abi,
        signer
      ))
    } catch(error) {
      console.log(error);
    }
  }
  useEffect(() => {
    initializeContract();
  }, []);
  useEffect(() => {
    const getAccountNFT = async () => {
      if (gameContract) try {
        setAccountHasNFT(await gameContract.senderHasNFT());
      } catch({ error }) {
        console.log(error.message);
      }
    }
    if (connectedAccount) getAccountNFT();
  }, [connectedAccount, gameContract]);
  return (
    <Container className="App">
      <Header />
      {!connectedAccount && <ConnectWallet onConnect={setConnectedAccount} />}
      <ConnectedAccount address={connectedAccount} />
      {connectedAccount && !accountHasNFT && <SelectCharacter gameContract={gameContract} setAccountHasNFT={setAccountHasNFT} />}
      {connectedAccount && accountHasNFT && <Arena gameContract={gameContract} />}
    </Container>
  );
}

export default App;
