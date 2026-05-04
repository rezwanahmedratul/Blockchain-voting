package com.voting.controller;

import com.voting.dto.request.VoteRequest;
import com.voting.dto.response.MessageResponse;
import com.voting.service.VoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class VoteController {

    @Autowired
    private VoteService voteService;

    @PostMapping("/vote")
    public ResponseEntity<MessageResponse> castVote(@RequestBody VoteRequest request) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();

        voteService.castVote(username, request);

        return ResponseEntity.ok(new MessageResponse("Vote cast successfully!"));
    }

    @GetMapping("/results")
    public ResponseEntity<Map<String, Long>> getResults() {
        return ResponseEntity.ok(voteService.getResults());
    }
}
