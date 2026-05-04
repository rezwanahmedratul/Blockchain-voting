package com.voting.controller;

import com.voting.dto.request.CandidateRequest;
import com.voting.dto.response.CandidateResponse;
import com.voting.dto.response.MessageResponse;
import com.voting.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/candidate")
    public ResponseEntity<MessageResponse> addCandidate(@RequestBody CandidateRequest request) {
        adminService.addCandidate(request);
        return ResponseEntity.ok(new MessageResponse("Candidate added successfully!"));
    }

    @GetMapping("/candidates")
    public ResponseEntity<List<CandidateResponse>> getAllCandidates() {
        return ResponseEntity.ok(adminService.getAllCandidates());
    }
}
