// contracts/MyToken.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


/**
 * @title MyToken
 * @dev MyToken is an ERC20 that mints a given initial supply.
 */
contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("Fancy Org-Token", "FOT"){
        _mint(msg.sender, initialSupply);
    }
    function decimals() public view virtual override returns (uint8) {
        return 0;
    }
}