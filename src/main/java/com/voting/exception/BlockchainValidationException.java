package com.voting.exception;

public class BlockchainValidationException extends RuntimeException {
    public BlockchainValidationException(String message) {
        super(message);
    }
}
