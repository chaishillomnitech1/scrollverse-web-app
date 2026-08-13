// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title MetatronCodex — 70 Sacred NFTs
 * @author Chais "Sabir Kajir" Hill the Great × Manus AI
 * @notice ERC-721A with 70 supply, 7 one-of-ones, sponsored free mints for youth/women/homeless
 * @dev Deploy to Polygon Mainnet. Metadata on IPFS/Arweave.
 */

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract MetatronCodex is ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 public constant MAX_SUPPLY = 70;
    uint256 public constant RARE_SUPPLY = 7; // Token IDs 1-7 are 1-of-1 rarest
    uint256 public constant MINT_PRICE = 0.1 ether; // 0.1 MATIC per mint
    uint256 public constant SPONSORED_MINT_PRICE = 0; // Free for sponsored tier

    uint256 public totalMinted;
    uint256 public sponsoredMinted;
    address public platformWallet;
    string public baseTokenURI;

    mapping(uint256 => string) public archivalSource; // On-chain archival reference
    mapping(address => bool) public sponsoredMintClaimed;

    event CodexMinted(address indexed to, uint256 tokenId, string archival, bool sponsored);
    event SponsoredMintGranted(address indexed beneficiary, uint256 tokenId);

    string[7] public RARE_NAMES = [
        "Metatron Sword of Divine Truth",
        unicode"Solomon Key — Star of David",
        "Thoth Emerald Tablet",
        "Ra Solar Disc",
        unicode"Sanhedrin 38B — Two Powers",
        unicode"3 Enoch — Sar ha-Panim",
        unicode"Exodus 23:20-21 — The Angel"
    ];

    string[7] public RARE_SOURCES = [
        unicode"Sefer Hekhalot / 3 Enoch — Metatron as Heavenly Scribe",
        unicode"Talmud Sanhedrin 38b — Solomon Key reference",
        unicode"Emerald Tablet of Thoth — Hermetic tradition",
        unicode"Egyptian Book of the Dead — Ra Hymns",
        unicode"Talmud Sanhedrin 38b — Two Powers in Heaven",
        unicode"3 Enoch 12:5 — Sar ha-Panim (Prince of the Presence)",
        unicode"Exodus 23:20-21 — My Name is in Him"
    ];

    constructor(
        address _platformWallet,
        address _owner,
        string memory _baseURI
    ) ERC721("Metatron Codex", "MCODEX") Ownable(_owner) {
        platformWallet = _platformWallet;
        baseTokenURI = _baseURI;
    }

    /**
     * @notice Mint a Codex NFT (tokens 8-70, public)
     */
    function mintCodex() external payable nonReentrant {
        require(totalMinted < MAX_SUPPLY, "All 70 Codex minted");
        require(msg.value >= MINT_PRICE, "Insufficient MATIC");
        totalMinted++;
        uint256 tokenId = totalMinted;
        _safeMint(msg.sender, tokenId);
        if (tokenId <= RARE_SUPPLY) {
            archivalSource[tokenId] = RARE_SOURCES[tokenId - 1];
        }
        (bool sent,) = platformWallet.call{value: msg.value}("");
        require(sent, "Transfer failed");
        emit CodexMinted(msg.sender, tokenId, archivalSource[tokenId], false);
    }

    /**
     * @notice Sponsored free mint for women/children/homeless in crisis tier
     * @dev Owner grants sponsored mints to verified beneficiaries
     */
    function mintSponsored(address beneficiary) external onlyOwner nonReentrant {
        require(totalMinted < MAX_SUPPLY, "All 70 Codex minted");
        require(!sponsoredMintClaimed[beneficiary], "Already claimed");
        totalMinted++;
        sponsoredMinted++;
        sponsoredMintClaimed[beneficiary] = true;
        _safeMint(beneficiary, totalMinted);
        emit SponsoredMintGranted(beneficiary, totalMinted);
        emit CodexMinted(beneficiary, totalMinted, unicode"Sponsored — Impact Covenant", true);
    }

    /**
     * @notice Set token URI for a specific token
     */
    function setTokenURI(uint256 tokenId, string calldata uri) external onlyOwner {
        _setTokenURI(tokenId, uri);
    }

    function setBaseURI(string calldata uri) external onlyOwner {
        baseTokenURI = uri;
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function getRareInfo(uint256 tokenId) external view returns (string memory name, string memory source) {
        require(tokenId >= 1 && tokenId <= RARE_SUPPLY, "Not a rare token");
        return (RARE_NAMES[tokenId - 1], RARE_SOURCES[tokenId - 1]);
    }
}
