package com.openclassrooms.mddapi.mappers;

import com.openclassrooms.mddapi.DTO.SubscriptionDTO;
import com.openclassrooms.mddapi.models.Subscription;
import org.springframework.stereotype.Component;

@Component
public class SubscriptionMapper {
    public SubscriptionDTO toDto(Subscription subscription){
        if(subscription == null){
            return null;
        }
        SubscriptionDTO dto = new SubscriptionDTO();
        dto.setSubject(subscription.getSubject());
        return dto;
    }
}
