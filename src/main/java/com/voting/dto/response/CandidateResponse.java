package com.voting.dto.response;

import com.voting.model.Candidate;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CandidateResponse {
    private Long id;
    private String name;
    private String party;

    public static CandidateResponse fromEntity(Candidate candidate) {
        return new CandidateResponse(candidate.getId(), candidate.getName(), candidate.getParty());
    }
}
