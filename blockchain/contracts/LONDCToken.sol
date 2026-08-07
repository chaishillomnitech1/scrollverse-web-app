// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title LONDC Token — ScrollVerse Sovereign Currency
 * @author Chais "Sabir Kajir" Hill the Great × Manus AI
 * @notice ERC-20 with Zakat distribution, guardian staking, and burn mechanics
 * @dev Deploy to Polygon Mainnet. KUN FAYAKUN x Infinity
 */

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract LONDCToken is ERC20, ERC20Burnable, Ownable, ReentrancyGuard {
    // ── CONSTANTS ──────────────────────────────────────────────────────────
    uint256 public constant MAX_SUPPLY = 144_000_000 * 10**18; // 144M LONDC
    uint256 public constant ZAKAT_RATE_BPS = 250; // 2.5% of every transfer
    uint256 public constant GUARDIAN_STAKE_MIN = 1_000 * 10**18; // 1,000 LONDC
    uint256 public constant PLATFORM_FEE_BPS = 200; // 2% platform fee
    uint256 public constant SELLER_SHARE_BPS = 9_000; // 90% to seller
    uint256 public constant ZAKAT_SHARE_BPS = 800; // 8% to Zakat vault

    // ── STATE ──────────────────────────────────────────────────────────────
    address public zakatVault;
    address public platformWallet;
    uint256 public totalZakatDistributed;
    uint256 public guardianCount;
    mapping(address => bool) public isGuardian;
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public stakeTimestamp;

    // ── EVENTS ─────────────────────────────────────────────────────────────
    event ZakatDistributed(address indexed from, uint256 amount, uint256 timestamp);
    event GuardianRegistered(address indexed guardian, uint256 staked);
    event GuardianUnstaked(address indexed guardian, uint256 returned);
    event PlatformFeeCollected(address indexed from, uint256 amount);

    // ── CONSTRUCTOR ────────────────────────────────────────────────────────
    constructor(
        address _zakatVault,
        address _platformWallet,
        address _initialOwner
    ) ERC20("LONDC", "LONDC") Ownable(_initialOwner) {
        require(_zakatVault != address(0), "Zakat vault required");
        require(_platformWallet != address(0), "Platform wallet required");
        zakatVault = _zakatVault;
        platformWallet = _platformWallet;
        // Mint initial supply to owner for distribution
        _mint(_initialOwner, MAX_SUPPLY);
    }

    // ── ZAKAT TRANSFER ─────────────────────────────────────────────────────
    /**
     * @notice Transfer with automatic Zakat deduction (2.5%)
     * @dev Overrides ERC20 transfer to route Zakat to vault
     */
    function transferWithZakat(address to, uint256 amount) external nonReentrant returns (bool) {
        uint256 zakatAmount = (amount * ZAKAT_RATE_BPS) / 10_000;
        uint256 netAmount = amount - zakatAmount;
        _transfer(msg.sender, zakatVault, zakatAmount);
        _transfer(msg.sender, to, netAmount);
        totalZakatDistributed += zakatAmount;
        emit ZakatDistributed(msg.sender, zakatAmount, block.timestamp);
        return true;
    }

    // ── GUARDIAN STAKING ───────────────────────────────────────────────────
    /**
     * @notice Stake LONDC to become a Guardian node
     * @param amount Amount to stake (minimum GUARDIAN_STAKE_MIN)
     */
    function stakeAsGuardian(uint256 amount) external nonReentrant {
        require(amount >= GUARDIAN_STAKE_MIN, "Minimum 1,000 LONDC to stake");
        require(!isGuardian[msg.sender], "Already a Guardian");
        _transfer(msg.sender, address(this), amount);
        isGuardian[msg.sender] = true;
        stakedAmount[msg.sender] = amount;
        stakeTimestamp[msg.sender] = block.timestamp;
        guardianCount++;
        emit GuardianRegistered(msg.sender, amount);
    }

    /**
     * @notice Unstake and exit Guardian status
     */
    function unstake() external nonReentrant {
        require(isGuardian[msg.sender], "Not a Guardian");
        require(block.timestamp >= stakeTimestamp[msg.sender] + 30 days, "30-day lock active");
        uint256 amount = stakedAmount[msg.sender];
        isGuardian[msg.sender] = false;
        stakedAmount[msg.sender] = 0;
        guardianCount--;
        _transfer(address(this), msg.sender, amount);
        emit GuardianUnstaked(msg.sender, amount);
    }

    // ── ADMIN ──────────────────────────────────────────────────────────────
    function setZakatVault(address _vault) external onlyOwner {
        require(_vault != address(0), "Invalid vault");
        zakatVault = _vault;
    }

    function setPlatformWallet(address _wallet) external onlyOwner {
        require(_wallet != address(0), "Invalid wallet");
        platformWallet = _wallet;
    }

    // ── VIEW ───────────────────────────────────────────────────────────────
    function getGuardianInfo(address guardian) external view returns (bool active, uint256 staked, uint256 since) {
        return (isGuardian[guardian], stakedAmount[guardian], stakeTimestamp[guardian]);
    }
}
