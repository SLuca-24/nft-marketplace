async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
    const NFTAuction = await ethers.getContractFactory("NFTAuction");

    const nftAuction = await NFTAuction.deploy();
    console.log("NFTAuction contract deployed to:", nftAuction.address);
  }
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  