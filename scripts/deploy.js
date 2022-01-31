const fs = require("fs");

const characters = [
  {
    index: 0,
    name: "Veigar",
    avatar: "https://imgur.com/F8A7Vim.jpeg",
    hp: 40,
    maxHp: 40,
    defense: 30,
    damage: 70,
    critChance: 20,
    critDamage : 90,
  },
  {
    index: 1,
    name: "Master Yi",
    avatar: "https://imgur.com/a3G19Ok.jpeg",
    hp: 50,
    maxHp: 50,
    defense: 35,
    damage: 60,
    critChance: 40,
    critDamage : 85,
  },
  {
    index: 2,
    name: "Malphite",
    avatar: "https://imgur.com/z7cRWMa.jpeg",
    hp: 100,
    maxHp: 100,
    defense: 60,
    damage: 40,
    critChance: 10,
    critDamage : 70,
  },
];
const boss = {
  index: 9,
  name: "Baron",
  avatar: "https://imgur.com/5fXSnKM.jpeg",
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

  const addresses = { gameContract: gameContract.address };
  fs.writeFileSync(
    "client/src/.env/contract-addresses.json",
    JSON.stringify((addresses))
  );
};

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
