// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFTMarketplace {
    address public owner;
    mapping(uint256 => address) public nftOwners;
    mapping(uint256 => uint256) public nftPrices;

    event Purchase(address indexed buyer, uint256 indexed nftId, uint256 price);

    constructor(uint256[] memory _nftIds, uint256[] memory _prices) {
        require(_nftIds.length == _prices.length, "NFT IDs and prices must match");
        owner = msg.sender; // L'owner è colui che distribuisce il contratto

        for (uint256 i = 0; i < _nftIds.length; i++) {
            nftPrices[_nftIds[i]] = _prices[i];
        }
    }

    // Funzione per acquistare un NFT
    function purchaseNFT(uint256 _nftId) public payable {
        uint256 price = nftPrices[_nftId];
        require(msg.value >= price, "Not enough Ether sent");

        address nftOwner = nftOwners[_nftId];
        require(nftOwner != msg.sender, "Cannot purchase your own NFT");

        // Trasferire i fondi all'owner del contratto
        payable(owner).transfer(msg.value);

        // Registrare l'acquisto
        nftOwners[_nftId] = msg.sender;

        emit Purchase(msg.sender, _nftId, price);
    }

    // Funzione per ottenere l'owner di un NFT
    function getNFTOwner(uint256 _nftId) public view returns (address) {
        return nftOwners[_nftId];
    }
}
