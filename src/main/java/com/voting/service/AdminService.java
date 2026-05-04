package com.voting.service;

import com.voting.dto.request.CandidateRequest;
import com.voting.dto.response.CandidateResponse;
import com.voting.model.Candidate;
import com.voting.repository.CandidateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private CandidateRepository candidateRepository;

    public void addCandidate(CandidateRequest request) {
        Candidate candidate = Candidate.builder()
                .name(request.getName())
                .party(request.getParty())
                .build();
        candidateRepository.save(candidate);
    }

    public List<CandidateResponse> getAllCandidates() {
        return candidateRepository.findAll().stream()
                .map(CandidateResponse::fromEntity)
                .collect(Collectors.toList());
    }
}
