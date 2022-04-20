package com.rmit.cloud.login_microservice.web;


import com.rmit.cloud.login_microservice.model.User;
import com.rmit.cloud.login_microservice.payload.JWTLoginSucessReponse;
import com.rmit.cloud.login_microservice.payload.LoginRequest;
import com.rmit.cloud.login_microservice.security.JwtTokenProvider;
import com.rmit.cloud.login_microservice.services.MapValidationErrorService;
import com.rmit.cloud.login_microservice.services.UserService;
import com.rmit.cloud.login_microservice.validator.UserValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

import static com.rmit.cloud.login_microservice.security.SecurityConstant.TOKEN_PREFIX;


@RestController
@CrossOrigin
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private MapValidationErrorService mapValidationErrorService;

    @Autowired
    private UserService userService;

    @Autowired
    private UserValidator userValidator;


    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult result){
        // Validate passwords match
        userValidator.validate(user,result);

        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null)return errorMap;

        User newUser = userService.saveUser(user);

        return  new ResponseEntity<User>(newUser, HttpStatus.CREATED);
    }


    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private AuthenticationManager authenticationManager;



    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult result){
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);
        if(errorMap != null) return errorMap;

        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String jwt = TOKEN_PREFIX +  tokenProvider.generateToken(authentication);

        return ResponseEntity.ok(new JWTLoginSucessReponse(true, jwt));
    }

    @GetMapping("/token/{jwt}")
    public User findUserByToken(@PathVariable("jwt") String jwtToken) {

        long id = tokenProvider.getUserIdFromJWT(jwtToken);
        return userService.getUserById(id);
    }

    @GetMapping("/getUsers/{id}")
    public User findUserById(@PathVariable long id) {
        return userService.getUserById(id);
    }

}
