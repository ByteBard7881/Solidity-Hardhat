# Learn Solidity & Hardhat

This repository provides a simple Solidity project that demonstrates smart contract deployment and interaction using Hardhat. It includes contracts for basic storage, an extended contract, and a factory for managing multiple instances.

## 📌 Prerequisites

Ensure you have the following installed before proceeding:

- **Node.js** (v16 or later) - [Download Here](https://nodejs.org/)
- **Yarn** - Install using:
  ```sh
  npm install --global yarn
  ```
- **Metamask** or another Ethereum wallet
- **Alchemy/Infura** RPC URL for Sepolia testnet

## 🚀 Installation & Setup

1. Clone this repository:

   ```sh
   git clone https://github.com/ByteBard7881/Solidity-Hardhat.git
   cd Solidity-Hardhat
   ```

2. Install dependencies:

   ```sh
   yarn install
   ```

3. Create a `.env` file in the root directory and set the following:

   ```sh
   SEPOLIA_RPC_URL="YOUR_SEPOLIA_RPC_URL"
   PRIVATE_KEY="YOUR_WALLET_PRIVATE_KEY"
   ETHERSCAN_API_KEY="YOUR_ETHERSCAN_API_KEY"
   ```

## 🛠️ Compile the Contracts

Before deploying, compile the contracts to ensure they are valid:

```sh
yarn hardhat compile
```

## 🔗 Deploy the Contract

Deploy the contract to the Sepolia testnet:

```sh
yarn hardhat run scripts/deploy.js --network sepolia
```

After deployment, you should see an output like:

```
[+] Smart contract successfully deployed at: 0xYourContractAddress
```

## ✅ Verifying the Contract on Etherscan

If you have provided an `ETHERSCAN_API_KEY`, the contract will be automatically verified after deployment. Otherwise, you can manually verify using:

```sh
yarn hardhat verify --network sepolia 0xYourContractAddress
```

## 🏗 Interacting with the Contract

After deployment, you can interact with your contract using:

### Store a Value

```sh
yarn hardhat console --network sepolia
```

Then inside the console:

```js
const contract = await ethers.getContractAt(
  "SimpleStorage",
  "0xYourContractAddress"
);
await contract.store(10);
```

### Retrieve a Value

```js
const value = await contract.retrieve();
console.log(`Stored Value: ${value}`);
```

## 📜 Contracts Overview

- **SimpleStorage.sol** - Stores a favorite number and a list of people with names and ages.
- **ExtraStorage.sol** - Extends `SimpleStorage` by adding +5 to the stored number.
- **StorageFactory.sol** - Creates and manages multiple instances of `SimpleStorage`.

## 🛠️ Hardhat Commands Reference

| Command                                                    | Description                                                       |
| ---------------------------------------------------------- | ----------------------------------------------------------------- |
| `yarn hardhat compile`                                     | Compiles the Solidity contracts                                   |
| `yarn hardhat run scripts/deploy.js --network sepolia`     | Deploys, Verify and Interact with the contract in Sepolia Testnet |
| `yarn hardhat test`                                        | Runs unit tests                                                   |
| `yarn hardhat console --network sepolia`                   | Opens a Hardhat console for contract interaction                  |
| `yarn hardhat verify --network sepolia <contract_address>` | Verifies the contract on Etherscan                                |

## 🔗 Additional Resources

- [Hardhat Documentation](https://hardhat.org/docs/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Ethereum Developer Docs](https://ethereum.org/en/developers/)

---
