// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.8.7;


import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract RewardToken is ERC20{
    constructor() ERC20("RewardToken", "RT"){
    

    }

    function mint(address _Market) external {
        _mint(_Market, 1000000);
    }
}