const characters = [
  {
    index: 0,
    name: "Veigar",
    avatar: "https://imgur.com/F8A7Vim",
    hp: 100,
    maxHp: 100,
    defense: 30,
    damage: 80,
    critChance: 20,
    critDamage : 150,
  },
  {
    index: 1,
    name: "Master Yi",
    avatar: "https://imgur.com/a3G19Ok",
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
    avatar: "https://imgur.com/z7cRWMa",
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
  avatar: "https://imgur.com/5fXSnKM",
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
  let tokenURI = await gameContract.tokenURI(1);
  console.log("Token URI:", tokenURI);
  await gameContract.attackBoss();
  await gameContract.attackBoss();
  await gameContract.attackBoss();
  await gameContract.attackBoss();
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
