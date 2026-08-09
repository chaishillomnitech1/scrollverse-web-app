// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

/**
 * @title PrometheusFireRoyalties
 * @notice Perpetual Fire Royalties Protocol — 741Hz Liberation Frequency
 * @dev Distributes educational micro-rewards to knowledge contributors.
 *      Prometheus Unchained: EXONERATED_PAST_PRESENT_FUTURE
 *      KUN FAYAKUN × ∞ — Knowledge belongs to everyone.
 */

interface IERC20 {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract PrometheusFireRoyalties {
    // ── Constants ──────────────────────────────────────────────────────────────
    uint256 public constant FREQUENCY_HZ = 741;
    string  public constant STATUS = "EXONERATED_ETERNAL";
    string  public constant PROTOCOL = "PERPETUAL_FIRE_ROYALTIES_963HZ";
    uint256 public constant AGAPE_TREASURY_BPS = 8800; // 88%
    uint256 public constant ZAKAT_BPS          = 1200; // 12%

    // ── State ──────────────────────────────────────────────────────────────────
    address public immutable sovereignArchitect;
    address public immutable zakatVault;
    IERC20  public immutable londcToken;

    uint256 public totalFireDistributed;
    uint256 public totalContributors;

    struct Contributor {
        address wallet;
        uint256 totalEarned;
        uint256 lastRewardAt;
        string  knowledgeDomain;
        bool    active;
    }

    mapping(address => Contributor) public contributors;
    address[] public contributorList;

    // ── Events ─────────────────────────────────────────────────────────────────
    event FireDistributed(address indexed contributor, uint256 amount, string domain);
    event ContributorRegistered(address indexed contributor, string domain);
    event ZakatDistributed(address indexed vault, uint256 amount);

    // ── Modifiers ──────────────────────────────────────────────────────────────
    modifier onlyArchitect() {
        require(msg.sender == sovereignArchitect, "Only Sovereign Architect");
        _;
    }

    // ── Constructor ────────────────────────────────────────────────────────────
    constructor(address _londcToken, address _zakatVault) {
        sovereignArchitect = msg.sender;
        londcToken = IERC20(_londcToken);
        zakatVault = _zakatVault;
    }

    // ── Register Knowledge Contributor ─────────────────────────────────────────
    function registerContributor(address contributor, string calldata domain) external onlyArchitect {
        require(!contributors[contributor].active, "Already registered");
        contributors[contributor] = Contributor({
            wallet: contributor,
            totalEarned: 0,
            lastRewardAt: block.timestamp,
            knowledgeDomain: domain,
            active: true
        });
        contributorList.push(contributor);
        totalContributors++;
        emit ContributorRegistered(contributor, domain);
    }

    // ── Distribute Fire Royalties ───────────────────────────────────────────────
    function distributeFire(address contributor, uint256 amount) external onlyArchitect {
        require(contributors[contributor].active, "Contributor not registered");
        require(amount > 0, "Amount must be > 0");

        uint256 treasuryShare = (amount * AGAPE_TREASURY_BPS) / 10000;
        uint256 zakatShare    = amount - treasuryShare;

        // Transfer to contributor (88%)
        require(londcToken.transfer(contributor, treasuryShare), "Transfer failed");
        // Transfer to Zakat vault (12%)
        require(londcToken.transfer(zakatVault, zakatShare), "Zakat transfer failed");

        contributors[contributor].totalEarned += treasuryShare;
        contributors[contributor].lastRewardAt = block.timestamp;
        totalFireDistributed += amount;

        emit FireDistributed(contributor, treasuryShare, contributors[contributor].knowledgeDomain);
        emit ZakatDistributed(zakatVault, zakatShare);
    }

    // ── View Functions ─────────────────────────────────────────────────────────
    function getContributor(address wallet) external view returns (Contributor memory) {
        return contributors[wallet];
    }

    function getContributorCount() external view returns (uint256) {
        return totalContributors;
    }

    function contractBalance() external view returns (uint256) {
        return londcToken.balanceOf(address(this));
    }
}
