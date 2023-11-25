const bip39 = require('bip39');
const { ethers } = require('ethers');

async function generateRandomWalletAndCheckBalance() {
  while (true) {
    // Generate a random mnemonic (12 words)
    const mnemonic = bip39.generateMnemonic();

    // Create a wallet from the mnemonic
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);

    console.log('Random 12-word mnemonic:', mnemonic);
    console.log('Generated Ethereum address:', wallet.address);

    // Connect to your Ethereum RPC
    const provider = new ethers.providers.JsonRpcProvider('https://eth-pokt.nodies.app');

    // Get the balance of the generated address
    const balance = await provider.getBalance(wallet.address);

    console.log('Balance:', ethers.utils.formatEther(balance), 'ETH');

    // Check if the balance is greater than 0
    if (balance.gt(0)) {
      console.log('Found address with balance!');

      // Exit the loop if a balance is found
      break;
    }

    // Add a delay to avoid overwhelming the Ethereum RPC
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait for 1 second before the next iteration
  }
}

generateRandomWalletAndCheckBalance();
