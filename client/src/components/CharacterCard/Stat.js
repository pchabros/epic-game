import styled from "styled-components";
import { FaHeart, FaShieldAlt, FaBolt } from  "react-icons/fa";

const icons = {
  hp: FaHeart,
  defense: FaShieldAlt,
  damage: FaBolt,
};

const Div = styled.div`
  display: flex;
  align-items: center;
  margin: 15px 25px;
`;

const BarDiv = styled.div`
  width: 190px;
  margin: 0 15px;
`

const Bar = styled.div`
  background-color: #FFCB77;
  border-radius: 3em;
  height: 10px;
  width: ${({ width }) => width}%;
`;

const Value = styled.span`
  min-width: 20px;
`

const Stat = ({ name, value, max }) => {
  const icon = icons[name];
  const width = value / max * 100;
  return (
    <Div>
      {icon()}
      <BarDiv>
        <Bar width={width} />
      </BarDiv>
      <Value>{value}</Value>
    </Div>
  )
}

Stat.defaultProps = {
  max: 100,
}
export default Stat;
