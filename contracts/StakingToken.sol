//SPDX-License-Identifier: Unlicense

pragma solidity ^0.8.7;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract StakingToken is ERC20{
    constructor() ERC20("MyToken", "SK"){
    _mint(msg.sender, 1000);

    }
}