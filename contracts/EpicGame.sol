// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import { Base64, console, Counters, ERC721, Random, Strings } from "./imports.sol";

contract EpicGame is ERC721 {
  using Strings for uint;
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  struct Character {
    uint index;
    string name;
    string avatar;
    uint hp;
    uint maxHp;
    uint defense;
    uint damage;
    uint critChance;
    uint critDamage;
  }
  Character[] characters;
  Character boss;
  mapping(uint256 => Character) public mintedCharacters;
  mapping(address => uint256) public addressToTokenId;

  event CharacterNFTMinted(bool minted);
  event AttackFinished(uint playerHp, uint bossHp);

  constructor(Character[] memory _characters, Character memory _boss) ERC721("LeagueOfLegends", "LOL") {
    boss = _boss;
    logCharacterInfo(boss);
    for (uint i = 0; i < _characters.length; i++) {
      Character memory character = _characters[i];
      characters.push(character);
      logCharacterInfo(character);
    }
    _tokenIds.increment();
  }
  function logCharacterInfo(Character memory _character) private view {
    console.log(
      "Character %s initialized: \n- defense: %s\n- damage: %s",
      _character.name,
      _character.defense,
      _character.damage
    );
  }
  function tokenURI(uint256 _tokenId) public view override returns(string memory) {
    Character memory character = mintedCharacters[_tokenId];
    string memory json = Base64.encode(abi.encodePacked('{',
      '"name": "', character.name, ' -- #: ', _tokenId.toString(), '",',
      '"description": "This is an NFT that lets people play in the game Baron Slayer",',
      '"image": "', character.avatar, '",', 
      '"attributes": [',
        '{ "trait_type": "Health Points", "value": ', character.hp.toString(), ' },',
        '{ "trait_type": "Defense", "value": ', character.defense.toString(), ' },',
        '{ "trait_type": "Damage", "value": ', character.damage.toString(), ' },',
        '{ "trait_type": "Critical Attack Chance", "value": ', character.critChance.toString(), ' },',
        '{ "trait_type": "Critical Attack Damage", "value": ', character.critDamage.toString(), ' }',
      '],', 
    '}'));
    string memory output = string(
      abi.encodePacked("data:application/json;base64,", json)
    );
    return output;
  }
  function mintCharacterNFT(uint _characterIndex) external {
    uint256 newTokenId = _tokenIds.current();
    Character memory character = characters[_characterIndex];
    _safeMint(msg.sender, newTokenId);
    mintedCharacters[newTokenId] = character;
    console.log("Minted %s NFT with token ID %s", character.name, newTokenId);
    addressToTokenId[msg.sender] = newTokenId;
    _tokenIds.increment();
    emit CharacterNFTMinted(true);
  }
  function attackDamage(Character memory _attacker, Character memory _attacked) internal view returns(uint) {
    bool isCritical = _attacker.critChance > Random.integer(100);
    uint damage = isCritical ? _attacker.critDamage : _attacker.damage;
    uint damageDealt = uint(damage * (100 - _attacked.defense) / 100);
    damageDealt = damageDealt > _attacked.hp ? _attacked.hp : damageDealt;
    return damageDealt;
  }
  modifier gameNotOver {
    require(boss.hp > 0, "The Boss is already dead!");
    uint256 senderTokenId = addressToTokenId[msg.sender];
    require(senderTokenId != 0, "You have to mint character NFT to play this game!");
    Character memory senderCharacter = mintedCharacters[senderTokenId];
    require(senderCharacter.hp > 0, "Your character is dead!");
    _;
  }
  function attackBoss() public gameNotOver {
    uint256 senderTokenId = addressToTokenId[msg.sender];
    Character storage senderCharacter = mintedCharacters[senderTokenId];
    uint characterAttackDamage = attackDamage(senderCharacter, boss);
    boss.hp -= characterAttackDamage;
    console.log("%s attacked %s with %s damage!", senderCharacter.name, boss.name, characterAttackDamage);
    console.log("%s hp: %s/%s", boss.name, boss.hp, boss.maxHp);
    uint bossAttackDamage = attackDamage(boss, senderCharacter);
    senderCharacter.hp -= bossAttackDamage;
    console.log("%s attacked %s with %s damage!", boss.name, senderCharacter.name, bossAttackDamage);
    console.log("%s hp: %s/%s", senderCharacter.name, senderCharacter.hp, senderCharacter.maxHp);
    emit AttackFinished(senderCharacter.hp, boss.hp);
  }
  function senderHasNFT() public view returns(bool) {
    bool has = addressToTokenId[msg.sender] != 0;
    return has;
  }
  function getSenderCharacter() public view gameNotOver returns(Character memory) {
    uint256 senderTokenId = addressToTokenId[msg.sender];
    Character memory senderCharacter = mintedCharacters[senderTokenId];
    return senderCharacter;
  }
  function getAllCharacters() public view returns(Character[] memory) {
    return characters;
  }
  function getBoss() public view returns(Character memory) {
    return boss;
  }
}
