import Stat from "./Stat";
import styled from "styled-components";

const Avatar = styled.img`
  border: 2px solid #457b9d;
  box-shadow: 0 0 10px #457b9d;
  border-radius: 1em;
  margin: 10px;
`;

const CharacterCard = ({ data, mode, onSelect }) => {
  const Card = styled.div`
    background-color: #1d3557;
    border: 1px solid #457b9d;
    box-shadow: 0 0 10px #457b9d;
    border-radius: 20px;
    margin: 30px;
    transition: all 0.3s;
    cursor: ${onSelect ? "pointer" : "default"};
    &:hover {
      transform: scale(${onSelect ? 1.03 : 1});
      box-shadow: 1px 1px 15px #457b9d;
    }
  `;
  const { index, avatar, name } = data;
  const stats = ["hp", "defense", "damage"].map((stat, i) => {
    const value = data[stat];
    return (
      <Stat key={i} name={stat} value={value} />
    )
  });
  const hp = <Stat name="hp" value={data.hp} max={data.maxHp} />;
  return (
    <Card onClick={onSelect}>
      <Avatar key={index} src={avatar} alt={name} width="300" height="180" />
      {mode === "select" && stats}
      {mode === "fight" && hp}
    </Card>
  )
}

CharacterCard.defaultProps = {
  mode: "select",
  onSelect: null,
}
export default CharacterCard;
