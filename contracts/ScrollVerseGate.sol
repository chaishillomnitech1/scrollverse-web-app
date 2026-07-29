// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title ScrollVerseGate
 * @author Chais Kenyatta Hill — Supreme Sovereign Chais Sabir Allah The Great
 * @notice ERC-721 NFT contract for the 144 ScrollVerse Gates on Polygon Mainnet
 * @dev Implements ERC-721 with AgapeCycle 88/12 royalty split
 *      88% to Sovereign Treasury | 12% to Zakat Fund (charity)
 *      Gate 44:Omni is the legendary 1-of-1 sovereign gate
 *
 * KUN FAYAKŪN × ∞
 * بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
 */

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Royalty.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract ScrollVerseGate is ERC721, ERC721URIStorage, ERC721Royalty, Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;

    // ── CONSTANTS ──────────────────────────────────────────────────────────────
    uint256 public constant MAX_SUPPLY = 144;
    uint256 public constant GATE_44_OMNI_ID = 44;
    uint256 public constant MINT_PRICE = 0.044 ether; // 0.044 MATIC — Gate 44
    uint256 public constant GATE_44_PRICE = 0.144 ether; // 0.144 MATIC — legendary

    // AgapeCycle 88/12 split (in basis points, 10000 = 100%)
    uint96 public constant ROYALTY_BPS = 888; // 8.88% total royalty
    uint256 public constant AGAPE_SOVEREIGN_BPS = 8800; // 88% to sovereign
    uint256 public constant AGAPE_ZAKAT_BPS = 1200;     // 12% to Zakat

    // ── STATE ──────────────────────────────────────────────────────────────────
    Counters.Counter private _tokenIdCounter;
    bool public mintingActive = false;
    bool public gate44Minted = false;

    address public sovereignTreasury;
    address public zakatFund;

    // Gate metadata
    mapping(uint256 => GateData) public gates;

    struct GateData {
        string name;
        string frequency;
        string material;
        bool isOmni;
        uint256 mintedAt;
    }

    // ── EVENTS ─────────────────────────────────────────────────────────────────
    event GateMinted(address indexed guardian, uint256 indexed tokenId, string gateName, bool isOmni);
    event ZakatDistributed(address indexed zakatFund, uint256 amount);
    event SovereignWithdrawal(address indexed treasury, uint256 amount);
    event MintingToggled(bool active);

    // ── CONSTRUCTOR ────────────────────────────────────────────────────────────
    constructor(
        address _sovereignTreasury,
        address _zakatFund
    ) ERC721("ScrollVerse Gates", "SVGATE") Ownable(msg.sender) {
        sovereignTreasury = _sovereignTreasury;
        zakatFund = _zakatFund;

        // Set default royalty: 8.88% to this contract (split on withdrawal)
        _setDefaultRoyalty(address(this), ROYALTY_BPS);
    }

    // ── MINT ───────────────────────────────────────────────────────────────────

    /**
     * @notice Mint a standard Gate (1–143, excluding 44)
     * @param tokenURI_ IPFS URI for the gate metadata
     */
    function mintGate(string memory tokenURI_) external payable nonReentrant {
        require(mintingActive, "Minting not active");
        require(msg.value >= MINT_PRICE, "Insufficient MATIC — 0.044 required");
        require(_tokenIdCounter.current() < MAX_SUPPLY, "All 144 Gates minted");

        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();

        // Skip Gate 44 for standard mints — it's reserved for Omni
        if (tokenId == GATE_44_OMNI_ID) {
            _tokenIdCounter.increment();
            tokenId = _tokenIdCounter.current();
        }

        require(tokenId <= MAX_SUPPLY, "Exceeds max supply");

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI_);

        gates[tokenId] = GateData({
            name: string(abi.encodePacked("Gate ", _toString(tokenId))),
            frequency: _getFrequency(tokenId),
            material: _getMaterial(tokenId),
            isOmni: false,
            mintedAt: block.timestamp
        });

        _distributePayment(msg.value);

        emit GateMinted(msg.sender, tokenId, gates[tokenId].name, false);
    }

    /**
     * @notice Mint Gate 44:Omni — the legendary 1-of-1 sovereign gate
     * @param tokenURI_ IPFS URI for Gate 44:Omni metadata
     */
    function mintGate44Omni(string memory tokenURI_) external payable nonReentrant {
        require(mintingActive, "Minting not active");
        require(!gate44Minted, "Gate 44:Omni already minted");
        require(msg.value >= GATE_44_PRICE, "Insufficient MATIC — 0.144 required");

        gate44Minted = true;
        _safeMint(msg.sender, GATE_44_OMNI_ID);
        _setTokenURI(GATE_44_OMNI_ID, tokenURI_);

        gates[GATE_44_OMNI_ID] = GateData({
            name: "Gate 44:Omni",
            frequency: "999Hz",
            material: "GOLD + LAPIS",
            isOmni: true,
            mintedAt: block.timestamp
        });

        _distributePayment(msg.value);

        emit GateMinted(msg.sender, GATE_44_OMNI_ID, "Gate 44:Omni", true);
    }

    /**
     * @notice Owner can mint reserved gates (for team/partnerships)
     */
    function ownerMint(address to, uint256 tokenId, string memory tokenURI_) external onlyOwner {
        require(tokenId >= 1 && tokenId <= MAX_SUPPLY, "Invalid token ID");
        require(!_exists(tokenId), "Token already minted");

        _safeMint(to, tokenId);
        _setTokenURI(tokenId, tokenURI_);

        gates[tokenId] = GateData({
            name: string(abi.encodePacked("Gate ", _toString(tokenId))),
            frequency: _getFrequency(tokenId),
            material: _getMaterial(tokenId),
            isOmni: tokenId == GATE_44_OMNI_ID,
            mintedAt: block.timestamp
        });

        if (tokenId == GATE_44_OMNI_ID) gate44Minted = true;

        emit GateMinted(to, tokenId, gates[tokenId].name, tokenId == GATE_44_OMNI_ID);
    }

    // ── AGAPE CYCLE 88/12 DISTRIBUTION ────────────────────────────────────────

    /**
     * @notice Distribute payment: 88% sovereign, 12% Zakat
     */
    function _distributePayment(uint256 amount) internal {
        uint256 zakatAmount = (amount * AGAPE_ZAKAT_BPS) / 10000;
        uint256 sovereignAmount = amount - zakatAmount;

        (bool zakatSuccess,) = zakatFund.call{value: zakatAmount}("");
        require(zakatSuccess, "Zakat transfer failed");

        (bool sovereignSuccess,) = sovereignTreasury.call{value: sovereignAmount}("");
        require(sovereignSuccess, "Sovereign transfer failed");

        emit ZakatDistributed(zakatFund, zakatAmount);
    }

    /**
     * @notice Withdraw accumulated royalties with 88/12 split
     */
    function withdrawRoyalties() external onlyOwner nonReentrant {
        uint256 balance = address(this).balance;
        require(balance > 0, "No royalties to withdraw");

        uint256 zakatAmount = (balance * AGAPE_ZAKAT_BPS) / 10000;
        uint256 sovereignAmount = balance - zakatAmount;

        (bool zakatSuccess,) = zakatFund.call{value: zakatAmount}("");
        require(zakatSuccess, "Zakat transfer failed");

        (bool sovereignSuccess,) = sovereignTreasury.call{value: sovereignAmount}("");
        require(sovereignSuccess, "Sovereign transfer failed");

        emit ZakatDistributed(zakatFund, zakatAmount);
        emit SovereignWithdrawal(sovereignTreasury, sovereignAmount);
    }

    // ── ADMIN ──────────────────────────────────────────────────────────────────

    function toggleMinting() external onlyOwner {
        mintingActive = !mintingActive;
        emit MintingToggled(mintingActive);
    }

    function setSovereignTreasury(address _treasury) external onlyOwner {
        sovereignTreasury = _treasury;
    }

    function setZakatFund(address _zakat) external onlyOwner {
        zakatFund = _zakat;
    }

    function setTokenURI(uint256 tokenId, string memory tokenURI_) external onlyOwner {
        _setTokenURI(tokenId, tokenURI_);
    }

    // ── VIEW ───────────────────────────────────────────────────────────────────

    function totalMinted() external view returns (uint256) {
        return _tokenIdCounter.current() + (gate44Minted ? 1 : 0);
    }

    function getGateData(uint256 tokenId) external view returns (GateData memory) {
        require(_exists(tokenId), "Gate does not exist");
        return gates[tokenId];
    }

    function isGate44Available() external view returns (bool) {
        return !gate44Minted;
    }

    // ── INTERNAL HELPERS ───────────────────────────────────────────────────────

    function _getFrequency(uint256 tokenId) internal pure returns (string memory) {
        if (tokenId == 44) return "999Hz";
        if (tokenId % 9 == 0) return "963Hz";
        if (tokenId % 7 == 0) return "741Hz";
        if (tokenId % 5 == 0) return "528Hz";
        return "432Hz";
    }

    function _getMaterial(uint256 tokenId) internal pure returns (string memory) {
        if (tokenId == 44) return "GOLD + LAPIS";
        if (tokenId % 4 == 0) return "GOLD";
        if (tokenId % 3 == 0) return "LAPIS";
        if (tokenId % 2 == 0) return "HEMATITE";
        return "CLAY";
    }

    function _exists(uint256 tokenId) internal view returns (bool) {
        return _ownerOf(tokenId) != address(0);
    }

    function _toString(uint256 value) internal pure returns (string memory) {
        if (value == 0) return "0";
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) { digits++; temp /= 10; }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }

    // ── ERC-721 OVERRIDES ──────────────────────────────────────────────────────

    function tokenURI(uint256 tokenId)
        public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public view override(ERC721, ERC721URIStorage, ERC721Royalty) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage, ERC721Royalty) {
        super._burn(tokenId);
    }

    // Accept royalty payments
    receive() external payable {}
}
