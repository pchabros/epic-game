// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import { Base64, console, Counters, ERC721, Strings } from "./imports.sol";

contract EpicGame is ERC721 {
  using Strings for uint;
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  struct Character {
    uint index;
    string name;
    string avatar;
    uint hp;
    uint defense;
    uint damage;
    uint critChance;
    uint critDamage;
  }
  Character[] characters;
  mapping(uint256 => Character) public mintedCharacters;
  mapping(address => uint256) public addressToTokenId;
  constructor(Character[] memory _characters) ERC721("LeagueOfLegends", "LOL") {
    for (uint i = 0; i < _characters.length; i++) {
      Character memory character = _characters[i];
      characters.push(character);
      console.log(
        "Character %s initialized: \n- defense: %s\n- damage: %s",
        character.name,
        character.defense,
        character.damage
      );
    }
    _tokenIds.increment();
  }
  function tokenURI(uint256 _tokenId) public view override returns(string memory) {
    Character memory character = mintedCharacters[_tokenId];
    string memory json = Base64.encode(abi.encodePacked('{',
      '"name": "', character.name, ' -- #: ', _tokenId.toString(), '",',
      '"description": "This is an NFT that lets people play in the game Baron Slayer",',
      '"image": "', character.avatar, '",', 
      '"attributes": [',
        '{ "trait_type": "Health Points", "value": ', character.hp.toString(), '},',
        '{ "trait_type": "Defense", "value": ', character.defense.toString(), '},',
        '{ "trait_type": "Damage", "value": ', character.damage.toString(), '},',
        '{ "trait_type": "Critical Attack Chance", "value": ', character.critChance.toString(), '},',
        '{ "trait_type": "Critical Attack Damage", "value": ', character.critDamage.toString(), '},',
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
  }
}
