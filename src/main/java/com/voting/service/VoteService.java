package com.voting.service;

import com.voting.dto.request.VoteRequest;
import com.voting.exception.DuplicateVoteException;
import com.voting.exception.ResourceNotFoundException;
import com.voting.model.Candidate;
import com.voting.model.User;
import com.voting.model.Vote;
import com.voting.repository.CandidateRepository;
import com.voting.repository.UserRepository;
import com.voting.repository.VoteRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class VoteService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CandidateRepository candidateRepository;

    @Autowired
    private VoteRepository voteRepository;

    @Autowired
    private BlockchainService blockchainService;

    @Transactional
    public void castVote(String username, VoteRequest request) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));

        if (user.isVoted()) {
            throw new DuplicateVoteException("User has already voted!");
        }

        Candidate candidate = candidateRepository.findById(request.getCandidateId())
                .orElseThrow(() -> new ResourceNotFoundException("Candidate not found"));

        // Save vote to DB
        Vote vote = Vote.builder()
                .userId(user.getId())
                .candidateId(candidate.getId())
                .timestamp(LocalDateTime.now())
                .build();
        voteRepository.save(vote);

        // Update user
        user.setVoted(true);
        userRepository.save(user);

        // Store vote in blockchain
        String voteData = String.format("{\"userId\": %d, \"candidateId\": %d, \"candidateName\": \"%s\"}",
                user.getId(), candidate.getId(), candidate.getName());
        
        blockchainService.addBlock(voteData);
    }

    public Map<String, Long> getResults() {
        List<Candidate> candidates = candidateRepository.findAll();
        Map<String, Long> results = new HashMap<>();
        for (Candidate candidate : candidates) {
            long count = voteRepository.findByCandidateId(candidate.getId()).size();
            results.put(candidate.getName(), count);
        }
        return results;
    }
}
