// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransferNft {

    event nftSent(address indexed sender, address indexed receiver, string message);

    function sendnft(address receiver, string memory message) public {
        require(receiver != address(0), "Ricevitore non valido");

        emit nftSent(msg.sender, receiver, message);
    }
}
