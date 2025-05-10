package com.server.service;

import com.server.dto.LoginDTO;
import com.server.dto.RegisterDTO;
import com.server.model.User;
import com.server.repository.UserRepository;
import com.server.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public String registerOrLogin(RegisterDTO request) {
        Optional<User> existingUser = userRepository.findByPhone(request.getPhone());
        
        if (existingUser.isPresent()) {
            // User exists, proceed with login
            User user = existingUser.get();
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new RuntimeException("Invalid password");
            }
            return jwtUtil.generateToken(user.getId());
        }

        // New user, proceed with registration
        User newUser = new User();
        newUser.setPhone(request.getPhone());
        newUser.setName(request.getName());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(newUser);

        return jwtUtil.generateToken(newUser.getId());
    }
}
