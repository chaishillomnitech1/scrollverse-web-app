// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ZakatDistribution — Sovereign Charitable Distribution Engine
 * @author Chais "Sabir Kajir" Hill the Great × Manus AI
 * @notice Receives Zakat from LONDC transfers and distributes to verified recipients
 * @dev Deploy to Polygon Mainnet after LONDCToken
 */

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract ZakatDistribution is Ownable, ReentrancyGuard {
    IERC20 public londcToken;

    struct Recipient {
        address wallet;
        string name;
        string category; // "women-shelter", "food-bank", "education", "housing"
        bool active;
        uint256 totalReceived;
    }

    mapping(uint256 => Recipient) public recipients;
    uint256 public recipientCount;
    uint256 public totalDistributed;

    event ZakatReceived(uint256 amount, uint256 timestamp);
    event ZakatDistributedTo(uint256 indexed recipientId, address wallet, uint256 amount, string category);
    event RecipientAdded(uint256 id, address wallet, string name, string category);

    constructor(address _londcToken, address _owner) Ownable(_owner) {
        londcToken = IERC20(_londcToken);
    }

    function addRecipient(address wallet, string calldata name, string calldata category) external onlyOwner {
        recipientCount++;
        recipients[recipientCount] = Recipient(wallet, name, category, true, 0);
        emit RecipientAdded(recipientCount, wallet, name, category);
    }

    function setRecipientActive(uint256 id, bool active) external onlyOwner {
        recipients[id].active = active;
    }

    /**
     * @notice Distribute Zakat equally among all active recipients
     */
    function distributeEqually() external onlyOwner nonReentrant {
        uint256 balance = londcToken.balanceOf(address(this));
        require(balance > 0, "No LONDC to distribute");

        uint256 activeCount = 0;
        for (uint256 i = 1; i <= recipientCount; i++) {
            if (recipients[i].active) activeCount++;
        }
        require(activeCount > 0, "No active recipients");

        uint256 share = balance / activeCount;
        for (uint256 i = 1; i <= recipientCount; i++) {
            if (recipients[i].active) {
                londcToken.transfer(recipients[i].wallet, share);
                recipients[i].totalReceived += share;
                totalDistributed += share;
                emit ZakatDistributedTo(i, recipients[i].wallet, share, recipients[i].category);
            }
        }
    }

    /**
     * @notice Distribute Zakat with custom amounts per recipient
     */
    function distributeCustom(uint256[] calldata ids, uint256[] calldata amounts) external onlyOwner nonReentrant {
        require(ids.length == amounts.length, "Length mismatch");
        for (uint256 i = 0; i < ids.length; i++) {
            require(recipients[ids[i]].active, "Recipient not active");
            londcToken.transfer(recipients[ids[i]].wallet, amounts[i]);
            recipients[ids[i]].totalReceived += amounts[i];
            totalDistributed += amounts[i];
            emit ZakatDistributedTo(ids[i], recipients[ids[i]].wallet, amounts[i], recipients[ids[i]].category);
        }
    }

    function getBalance() external view returns (uint256) {
        return londcToken.balanceOf(address(this));
    }
}
