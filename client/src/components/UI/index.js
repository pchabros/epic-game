import styled from "styled-components";

export const Modal = styled.span`
  visibility: ${({ isOpen }) => isOpen ? "visible" : "hidden"};
  background-color: #161d1f;
  opacity: 0.95; 
  padding: 40px 70px;
  border: 1px solid #227C9D;
  box-shadow: 0 0 10px #227C9D;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 40%;
  h3 {
    font-weight: 700;
    color: #FFCB77;
    margin-bottom: 40px;
  }
`;

