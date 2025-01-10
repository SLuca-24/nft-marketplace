// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract NFTAuction {
    struct Auction {
        uint256 highestBid;
        address highestBidder;
        bool isActive;
    }

    mapping(uint256 => Auction) public auctions;
    mapping(uint256 => mapping(address => uint256)) public bids;
    mapping(uint256 => address[]) public bidders;

    event AuctionStarted(uint256 nftId);
    event BidPlaced(uint256 nftId, address bidder, uint256 amount);
    event AuctionEnded(uint256 nftId, address winner, uint256 amount);

    constructor() {}





    function startAuction(uint256 nftId) external {
        require(!auctions[nftId].isActive, "Auction already active");

        auctions[nftId] = Auction(0, address(0), true);
        emit AuctionStarted(nftId);
    }






    function placeBid(uint256 nftId) external payable {
        require(msg.value > auctions[nftId].highestBid, "Bid is too low");

        if (auctions[nftId].highestBidder != address(0) && msg.sender != auctions[nftId].highestBidder) {
            uint256 previousBid = bids[nftId][auctions[nftId].highestBidder];
            if (previousBid > 0) {
                payable(auctions[nftId].highestBidder).transfer(previousBid);
            }
        }
        auctions[nftId].highestBid = msg.value;
        auctions[nftId].highestBidder = msg.sender;
        bids[nftId][msg.sender] += msg.value;


        bidders[nftId].push(msg.sender);
        emit BidPlaced(nftId, msg.sender, msg.value);
    }






    function endAuction(uint256 nftId) external {
        require(auctions[nftId].isActive, "Auction not active");

        auctions[nftId].isActive = false;
        if (auctions[nftId].highestBidder != address(0)) {
            uint256 highestBid = auctions[nftId].highestBid;
            payable(auctions[nftId].highestBidder).transfer(highestBid);
            emit AuctionEnded(nftId, auctions[nftId].highestBidder, highestBid);
        }

        for (uint256 i = 0; i < bidders[nftId].length; i++) {
            address bidder = bidders[nftId][i];
            if (bidder != auctions[nftId].highestBidder) {
                uint256 refundAmount = bids[nftId][bidder];
                if (refundAmount > 0) {
                    payable(bidder).transfer(refundAmount);
                    bids[nftId][bidder] = 0;
                }
            }
        }


        delete auctions[nftId];
        delete bidders[nftId];
    }
}
