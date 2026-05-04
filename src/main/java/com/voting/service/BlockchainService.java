package com.voting.service;

import com.voting.blockchain.Block;
import com.voting.blockchain.Blockchain;
import com.voting.exception.BlockchainValidationException;
import com.voting.repository.BlockRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BlockchainService {

    @Autowired
    private BlockRepository blockRepository;

    private Blockchain blockchain;

    @PostConstruct
    public void init() {
        List<Block> dbChain = blockRepository.findAllByOrderByIndexAsc();
        if (dbChain.isEmpty()) {
            blockchain = new Blockchain();
            // Get the genesis block generated in constructor and save it
            Block genesisBlock = blockchain.getLatestBlock();
            blockRepository.save(genesisBlock);
        } else {
            blockchain = new Blockchain(dbChain);
        }
    }

    public List<Block> getChain() {
        return blockchain.getChain();
    }

    public boolean validateChain() {
        return blockchain.isChainValid();
    }

    public synchronized void addBlock(String data) {
        if (!validateChain()) {
            throw new BlockchainValidationException("Cannot add block, blockchain is corrupted!");
        }

        Block latestBlock = blockchain.getLatestBlock();
        int newIndex = latestBlock.getIndex() + 1;
        String previousHash = latestBlock.getHash();

        Block newBlock = new Block(newIndex, previousHash, data);
        blockchain.addBlock(newBlock);
        blockRepository.save(newBlock); // Persist to DB
    }
}
