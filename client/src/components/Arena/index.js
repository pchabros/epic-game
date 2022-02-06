import CharacterCard from "../CharacterCard";
import styled, { keyframes } from "styled-components";
import { FaFistRaised } from "react-icons/fa";
import { Modal } from "../UI";
import { formatCharacterData } from "../../utils";
import { useEffect, useState } from "react";

const animations = {
  none: null,
  attacking: keyframes`
    0% {
      color: #FE6D73;
      transform: translateY(5px) scale(3);
    }
    50% {
      color: #FFCB77;
      transform: translateY(-5px) scale(3);
    }
    100% {
      color: #FE6D73;
      transform: translateY(5px) scale(3);
    }
  `,
  hit: keyframes`
    0% {
      color: #FFCB77;
      transform: translateY(5px) scale(3);
    }
    30% {
      color: #FE6D73;
      transform: translateY(-25px) scale(5);
    }
    100% {
      color: #FFCB77;
      transform: translateY(5px) scale(3);
    }
  `,
};

const Icon = styled.div`
  & > svg {
    transform: scale(3);
    color: #FE6D73;
    margin: 20px;
    cursor: pointer;
    transition: all 0.3s;
    animation: 1s ${({ animation }) => animations[animation]} ease-out;
    animation-iteration-count: 100;
    &:hover {
      transform: scale(3.6)
    }
  }
`;

const Arena = ({ gameContract }) => {
  const [character, setCharacter] = useState();
  const [boss, setBoss] = useState();
  const [attackState, setAttackState] = useState("");
  const [isGameOver, setIsGameOver] = useState(false);
  const attackBoss = async () => {
    try {
      const txn = await gameContract.attackBoss();
      setAttackState("attacking");
      await txn.wait();
      setAttackState("hit");
      setTimeout(() => {
        setAttackState("none");
      }, 600);
    } catch(error) {
      setAttackState("none");
      console.log(error);
    }
  }
  const onAttackFinished = (characterHp, bossHp) => {
    const characterHpNumber = characterHp.toNumber();
    const bossHpNumber = bossHp.toNumber();
    setCharacter((prevState) => ({ ...prevState, hp: characterHpNumber }));
    setBoss((prevState) => ({ ...prevState, hp: bossHpNumber }));
    if (characterHpNumber === 0 || bossHpNumber === 0) {
      setIsGameOver(true);
    }
  }
  useEffect(() => {
    if (gameContract) {
      (async () => {
        setCharacter(formatCharacterData(await gameContract.getSenderCharacter()));
        setBoss(formatCharacterData(await gameContract.getBoss()));
      })();
      gameContract.on("AttackFinished", onAttackFinished);
    }
    return () => {
      if (gameContract) gameContract.off("AttackFinished", onAttackFinished);
    }
  }, [gameContract]);
  return (
    <>
      {!isGameOver && <div>
        {boss && <CharacterCard data={boss} mode="fight" />}
        <Icon animation={attackState}><FaFistRaised onClick={attackBoss} /></Icon>
        {character && <CharacterCard data={character} mode="fight" />}
      </div>}
      <Modal isOpen={isGameOver}>
        <h3>GAME OVER!</h3>
      </Modal>
    </>
  )
}

export default Arena;
