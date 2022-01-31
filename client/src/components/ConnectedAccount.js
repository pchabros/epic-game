import styled from "styled-components";
import { FaUserCircle } from  "react-icons/fa";

const addressShortened = (address) => {
  if (address)
    return `${address.substr(0, 5)}...${address.substr(-4, 4)}`.toUpperCase();
}

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  top: 20px;
  right: 20px;
  svg {
    transform: scale(1.5);
    margin-right: 15px;
    color: #227C9D;
  }
  span {
    margin-top: 2px;
    font-weight: 700;
    color: #FFCB77;
  }
`;

const ConnectedAccount = ({ address }) => {
  return (
    <UserInfo>
      <FaUserCircle />
      <span>{addressShortened(address)}</span>
    </UserInfo>
  )
}

export default ConnectedAccount;
