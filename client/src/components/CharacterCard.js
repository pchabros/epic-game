import Stat from "./Stat";
import styled from "styled-components";

const Card = styled.div`
  background-color: #1d3557;
  border: 1px solid #457b9d;
  box-shadow: 0 0 10px #457b9d;
  border-radius: 20px;
  margin: 30px;
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    transform: scale(1.03);
    box-shadow: 1px 1px 15px #457b9d;
  }
`;

const Avatar = styled.img`
  border: 2px solid #457b9d;
  box-shadow: 0 0 10px #457b9d;
  border-radius: 1em;
  margin: 10px;
`;

const CharacterCard = ({ data }) => {
  const { index, avatar, name } = data;
  return (
    <Card>
      <Avatar key={index} src={avatar} alt={name} width="300" height="180" />
      {["hp", "defense", "damage"].map((stat, i) => {
        const value = data[stat].toNumber();
        return (
          <Stat key={i} name={stat} value={value} />
        )
      })}
    </Card>
  )
}

export default CharacterCard;
