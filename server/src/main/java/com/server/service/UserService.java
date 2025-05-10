package com.server.service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import com.server.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.server.dto.RegisterDTO;
import com.server.model.User;
import com.server.repository.UserRepository;
import com.server.util.JwtUtil;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    public Map<String, Object> registerOrLogin(RegisterDTO request) {
        Optional<User> existingUser = userRepository.findByPhone(request.getPhone());
        Map<String, Object> response = new HashMap<>();
        
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
                throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid password");
            }
            response.put("token", jwtUtil.generateToken(user.getId()));
            response.put("user", convertToDTO(user));
            return response;
        }

        User newUser = new User();
        newUser.setPhone(request.getPhone());
        newUser.setName(request.getName());
        newUser.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(newUser);

        response.put("token", jwtUtil.generateToken(newUser.getId()));
        response.put("user", convertToDTO(newUser));
        return response;
    }

    public UserDTO getCurrentUser(String token) {
        if (token == null || token.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Invalid token");
        }

        String userId = jwtUtil.extractUserId(token);
        return userRepository.findById(userId)
                .map(this::convertToDTO)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private UserDTO convertToDTO(User user) {
        return new UserDTO(
            user.getId(),
            user.getPhone(),
            user.getName()
        );
    }
}
