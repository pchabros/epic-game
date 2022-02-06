import CharacterCard from "./CharacterCard";
import ScaleLoader from "react-spinners/ScaleLoader";
import styled from "styled-components";
import { Modal } from "./UI";
import { formatCharacterData } from "../utils";
import { useEffect, useState } from "react";

const Div = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  color: #FFCB77;
  font-size: 22px;
  font-weight: 700;
  padding: 20px;
`;

const Cards = styled.div`
  display: flex;
`;

const SelectCharacter = ({ gameContract, setAccountHasNFT }) => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const mintCharacterNFT = (characterId) => async () => {
    try {
      if (gameContract) {
        setLoading(true);
        const txn = await gameContract.mintCharacterNFT(characterId);
        await txn.wait();
      } 
    } catch(error) {
      console.log(error);
    }
  }
  useEffect(() => {
    const getAllCharacters = async () => {
      try {
        if (gameContract) {
          const charactersRaw = await gameContract.getAllCharacters();
          const charactersFormatted = charactersRaw.map(formatCharacterData);
          setCharacters(charactersFormatted);
        }
      } catch({ error }) {
        console.log(error.message);
      }
    }
    getAllCharacters();
  }, [gameContract]);
  useEffect(() => {
    const onCharacterMinted = (minted) => {
      setAccountHasNFT(minted);
      setLoading(false);
    }
    if (gameContract) gameContract.on("CharacterNFTMinted", onCharacterMinted);
    return () => {
      if (gameContract) gameContract.off("CharacterNFTMinted", onCharacterMinted);
    }
  }, [gameContract, setAccountHasNFT]);
  return (
    <>
      <Div>
        <Title>Select Character</Title>
        <Cards>
          {characters.map((character, i) => {
            return <CharacterCard key={i} data={character} onSelect={mintCharacterNFT(i)} />;
          })}
        </Cards>
      </Div>
      <Modal isOpen={loading}>
        <h3>Minting Champion NFT...</h3>
        <ScaleLoader color="#17C3B2" loading={loading} />
     </Modal>
    </>
  )
}

export default SelectCharacter;
