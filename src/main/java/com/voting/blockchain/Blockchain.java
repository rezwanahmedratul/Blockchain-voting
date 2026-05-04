package com.voting.blockchain;

import lombok.Getter;
import java.util.ArrayList;
import java.util.List;

@Getter
public class Blockchain {

    private List<Block> chain;

    public Blockchain() {
        this.chain = new ArrayList<>();
        // Add Genesis Block
        Block genesisBlock = new Block(0, "0", "Genesis Block");
        this.chain.add(genesisBlock);
    }

    public Blockchain(List<Block> existingChain) {
        this.chain = existingChain;
    }

    public void addBlock(Block block) {
        chain.add(block);
    }

    public Block getLatestBlock() {
        if (chain.isEmpty()) {
            return null;
        }
        return chain.get(chain.size() - 1);
    }

    public boolean isChainValid() {
        Block currentBlock;
        Block previousBlock;

        for (int i = 1; i < chain.size(); i++) {
            currentBlock = chain.get(i);
            previousBlock = chain.get(i - 1);

            // Compare registered hash and calculated hash
            if (!currentBlock.getHash().equals(currentBlock.calculateHash())) {
                System.out.println("Current Hashes not equal for block " + i);
                return false;
            }

            // Compare previous hash and registered previous hash
            if (!previousBlock.getHash().equals(currentBlock.getPreviousHash())) {
                System.out.println("Previous Hashes not equal for block " + i);
                return false;
            }
        }
        return true;
    }
}
