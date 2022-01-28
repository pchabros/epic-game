// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

library Random {
  function integer(uint _max) internal view returns(uint) {
    uint randomUint = uint(keccak256(abi.encodePacked(
        msg.sender, block.timestamp
    )));
    uint randomScaled = randomUint  % _max;
    return randomScaled;
  }
}
