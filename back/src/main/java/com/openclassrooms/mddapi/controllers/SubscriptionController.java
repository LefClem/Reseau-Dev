package com.openclassrooms.mddapi.controllers;

import com.openclassrooms.mddapi.DTO.SubscriptionDTO;
import com.openclassrooms.mddapi.payload.request.SubscriptionRequest;
import com.openclassrooms.mddapi.payload.response.MessageResponse;
import com.openclassrooms.mddapi.services.SubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path = "/api/subscription")
public class SubscriptionController {
    @Autowired
    SubscriptionService subscriptionService;

    @PostMapping(path = "/")
    public @ResponseBody ResponseEntity<MessageResponse> addSubscription(@RequestBody SubscriptionRequest subscriptionRequest){
        return subscriptionService.subscribe(subscriptionRequest);
    }

    @DeleteMapping(path = "/")
    public @ResponseBody ResponseEntity<MessageResponse> deleteSubscription(@RequestBody SubscriptionRequest subscriptionRequest){
        return subscriptionService.unSubscribe(subscriptionRequest);
    }

    @GetMapping(path = "/")
    public @ResponseBody List<SubscriptionDTO> getSubscriptionsByUser(){
        return subscriptionService.getSubscriptionListByUser();
    }
}
