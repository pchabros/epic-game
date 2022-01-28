const characters = [
  {
    index: 0,
    name: "Annie",
    avatar: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt28c708665427aef6/5db05fa89481396d6bdd01a6/RiotX_ChampionList_annie.jpg?quality=90&width=250",
    hp: 100,
    maxHp: 100,
    defense: 30,
    damage: 80,
    critChance: 20,
    critDamage : 150,
  },
  {
    index: 1,
    name: "Corki",
    avatar: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/bltdd918c4d0a86347a/5db05fb1df78486c826dccee/RiotX_ChampionList_corki.jpg?quality=90&width=250",
    hp: 90,
    maxHp: 90,
    defense: 32,
    damage: 70,
    critChance: 40,
    critDamage : 140,
  },
  {
    index: 2,
    name: "Malphite",
    avatar: "https://images.contentstack.io/v3/assets/blt731acb42bb3d1659/blt4d3b4a7e4c44ced7/5db05fdeadc8656c7d24e7e2/RiotX_ChampionList_malaphite.jpg?quality=90&width=250",
    hp: 140,
    maxHp: 140,
    defense: 60,
    damage: 40,
    critChance: 10,
    critDamage : 70,
  },
];
const boss = {
  index: 2,
  name: "Baron",
  avatar: "https://static.wikia.nocookie.net/leagueoflegends/images/1/15/Baron_Nashor_OriginalSkin.jpg/revision/latest/scale-to-width-down/700?cb=20151202202626",
  hp: 1000,
  maxHp: 1000,
  defense: 50,
  damage: 50,
  critChance: 0,
  critDamage : 0,
};

const main = async () => {
  const gameContractFactory = await hre.ethers.getContractFactory("EpicGame");
  const gameContract = await gameContractFactory.deploy(characters, boss);
  await gameContract.deployed();
  console.log("Contract deployed to:", gameContract.address);

  let txn = await gameContract.mintCharacterNFT(0);
  await txn.wait();
  txn = await gameContract.attackBoss();
  await txn.wait();
  txn = await gameContract.attackBoss();
  await txn.wait();
  console.log("Done!");
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
