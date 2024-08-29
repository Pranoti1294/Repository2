package com.example.UserEduverse.service;

import com.example.UserEduverse.dto.UserDto;
import com.example.UserEduverse.model.User;
import com.example.UserEduverse.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserDao userDao;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userDao.findByEmail(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return new CustomUserDetails(user.getEmailId(), user.getPassword(), Collections.emptyList()); // Adjust authorities as needed
    }

    public void addUser(UserDto userDto) {
        User user = new User();
        user.setFirstName(userDto.getFirstName());
        user.setMiddleName(userDto.getMiddleName());
        user.setLastName(userDto.getLastName());
        user.setRole(userDto.getRole());
        user.setMobileNo(userDto.getMobileNo());
        user.setEmailId(userDto.getEmailId());
        user.setCourseId(userDto.getCourseId());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));  // Encode the password
        userDao.save(user);
    }

    public void deleteUser(int userId) {
        userDao.deleteById(userId);
    }

    public void updateUser(int userId, UserDto userDto) {
        User user = userDao.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        user.setFirstName(userDto.getFirstName());
        user.setMiddleName(userDto.getMiddleName());
        user.setLastName(userDto.getLastName());
        user.setRole(userDto.getRole());
        user.setMobileNo(userDto.getMobileNo());
        user.setEmailId(userDto.getEmailId());
        user.setCourseId(userDto.getCourseId());
        user.setPassword(passwordEncoder.encode(userDto.getPassword()));  // Encode the updated password
        userDao.save(user);
    }

    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    public User getUserById(int userId) {
        return userDao.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public boolean checkPassword(String rawPassword, String encodedPassword) {
        return passwordEncoder.matches(rawPassword, encodedPassword);  // Check password match
    }
}
