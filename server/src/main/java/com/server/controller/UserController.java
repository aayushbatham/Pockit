package com.server.controller;

import com.server.dto.LoginDTO;
import com.server.dto.RegisterDTO;
import com.server.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerOrLogin(@RequestBody RegisterDTO request) {
        String token = userService.registerOrLogin(request);
        return ResponseEntity.ok(Collections.singletonMap("jwt", token));
    }
}
