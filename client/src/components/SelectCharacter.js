import CharacterCard from "./CharacterCard";
import styled from "styled-components";
import { useState } from "react";

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


const SelectCharacter = ({ gameContract }) => {
  const [characters, setCharacters] = useState([]);
  useState(() => {
    const getAllCharacters = async () => {
      try {
        setCharacters(await gameContract.getAllCharacters());
      } catch({ error }) {
        console.log(error.message);
      }
    }
    getAllCharacters();
  }, []);
  return (
    <Div>
      <Title>Select Character</Title>
      <Cards>
        {characters.map((character, i) => <CharacterCard key={i} data={character} />)}
      </Cards>
    </Div>
  )
}

export default SelectCharacter;
