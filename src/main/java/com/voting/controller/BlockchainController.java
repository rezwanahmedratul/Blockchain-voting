package com.voting.controller;

import com.voting.blockchain.Block;
import com.voting.dto.response.MessageResponse;
import com.voting.service.BlockchainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/blockchain")
public class BlockchainController {

    @Autowired
    private BlockchainService blockchainService;

    @GetMapping
    public ResponseEntity<List<Block>> getBlockchain() {
        return ResponseEntity.ok(blockchainService.getChain());
    }

    @GetMapping("/validate")
    public ResponseEntity<MessageResponse> validateChain() {
        boolean isValid = blockchainService.validateChain();
        if (isValid) {
            return ResponseEntity.ok(new MessageResponse("Blockchain is valid."));
        } else {
            return ResponseEntity.badRequest().body(new MessageResponse("Blockchain integrity compromised!"));
        }
    }
}
