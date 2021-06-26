// contracts/MyTokenSale.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "./Crowdsale.sol";
import "./KycContract.sol";

/**
 * @title MyTokenSale
 * @dev MyTokenSale enables the sale of the ERC20 Token, it validates if the benefiriary 
  * address has completed the KYC in order to make a purchase.
 */
contract MyTokenSale is Crowdsale {

    KycContract kyc;

    constructor(
        uint256 _rate, // rate in TKNbits
        address payable _wallet,
        IERC20 _token,
        KycContract _kyc
    ) Crowdsale(_rate, _wallet, _token) {
        kyc = _kyc;
    }

   function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view override {
        require(kyc.isKycCompleted(beneficiary), "KYC_NOT_COMPLETED_ERROR");
        super._preValidatePurchase(beneficiary, weiAmount);

    }    
}
