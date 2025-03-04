package com.openclassrooms.mddapi.services;

import com.openclassrooms.mddapi.DTO.SubscriptionDTO;
import com.openclassrooms.mddapi.DTO.UserDTO;
import com.openclassrooms.mddapi.mappers.SubscriptionMapper;
import com.openclassrooms.mddapi.models.Subject;
import com.openclassrooms.mddapi.models.Subscription;
import com.openclassrooms.mddapi.models.User;
import com.openclassrooms.mddapi.payload.request.SubscriptionRequest;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.repository.SubjectRepository;
import com.openclassrooms.mddapi.repository.SubscriptionRepository;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class SubscriptionService {
    @Autowired
    SubscriptionRepository subscriptionRepository;

    @Autowired
    SubjectRepository subjectRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    UserService userService;

    @Autowired
    SubscriptionMapper subscriptionMapper;

    @Autowired
    ModelMapper modelMapper;

    private UserDTO getAuthenticatedUser(){
        return userService.getAuthUser();
    }


    public ResponseEntity<MessageResponse> subscribe(SubscriptionRequest subscriptionRequest){
        Subject subject = subjectRepository.findById(Long.valueOf(subscriptionRequest.getSubject_id()))
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        User user = userRepository.findById(Long.valueOf(getAuthenticatedUser().getId()))
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Subscription> subscriptionOpt = subscriptionRepository.findByUserAndSubject(user, subject);
        System.out.println(subscriptionOpt);
        if (subscriptionOpt.isPresent()) {
            throw new RuntimeException("You already subscribe to this subject");
        }

        Subscription n = Subscription.builder()
                .subject(subject)
                .user(user)
                .build();

        subscriptionRepository.save(n);
        return ResponseEntity.ok(new MessageResponse("Subscribed to " + subject.getName()));
    }

    public ResponseEntity<MessageResponse> unSubscribe(SubscriptionRequest subscriptionRequest){
        Subject subject = subjectRepository.findById(Long.valueOf(subscriptionRequest.getSubject_id()))
                .orElseThrow(() -> new RuntimeException("Subject not found"));

        User user = userRepository.findById(Long.valueOf(getAuthenticatedUser().getId()))
                .orElseThrow(() -> new RuntimeException("User not found"));

        Optional<Subscription> subscriptionOpt = subscriptionRepository.findByUserAndSubject(user, subject);
        System.out.println(subscriptionOpt);
        if (subscriptionOpt.isEmpty()) {
            throw new RuntimeException("Subscription not found");
        }

        subscriptionRepository.delete(subscriptionOpt.get());

        return ResponseEntity.ok(new MessageResponse("Unsubscribed from " + subject.getName()));
    }

    public List<SubscriptionDTO> getSubscriptionListByUser(){
        User user = userRepository.findById(Long.valueOf(getAuthenticatedUser().getId()))
                .orElseThrow(() -> new RuntimeException("User not found"));

        Iterable<Subscription> subscriptions = subscriptionRepository.findByUser(user);
        List<SubscriptionDTO> subscriptionDtos = new ArrayList<>();
        for(Subscription subscription: subscriptions){
            SubscriptionDTO subscriptionDto = subscriptionMapper.toDto(subscription);
            subscriptionDtos.add(subscriptionDto);
        }
        return subscriptionDtos;
    }

}
