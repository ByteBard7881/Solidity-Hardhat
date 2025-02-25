const { ethers, run, network } = require("hardhat");
require("dotenv").config();

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage");

  console.log("[+] Initiating smart contract deployment...");
  const simpleStorage = await SimpleStorageFactory.deploy();
  await simpleStorage.waitForDeployment();

  const contractAddress = await simpleStorage.getAddress();
  console.log(
    `[+] Smart contract successfully deployed at: ${contractAddress}`
  );

  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("[~] Awaiting block confirmations before verification...");
    await simpleStorage.deploymentTransaction().wait(6);
    await verify("0x4b66E13D7c19d9c6e365F86c5211C9b78EdDe839", []);
  } else {
    console.log(
      "[!] Contract verification skipped: ETHERSCAN_API_KEY not provided."
    );
  }

  const currentValue = await simpleStorage.retrieve();
  console.log(`[+] Current Value is: ${currentValue}`);

  const transactionRequest = await simpleStorage.store(7);
  await transactionRequest.wait(1);

  const updatedValue = await simpleStorage.retrieve();
  console.log(`[+] Updated Value is: ${updatedValue}`);
}

async function verify(contractAddress, args) {
  console.log("[+] Initiating contract verification on Etherscan...");
  try {
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    });
    console.log("[+] Contract successfully verified on Etherscan.");
  } catch (e) {
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("[!] Contract is already verified.");
    } else {
      console.log("[!] Verification failed due to an error:", e);
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("[!] Deployment script encountered an error:", error);
    process.exit(1);
  });
