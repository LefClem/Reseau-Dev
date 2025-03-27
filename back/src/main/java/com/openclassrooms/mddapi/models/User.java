package com.openclassrooms.mddapi.models;

import javax.persistence.*;
import com.openclassrooms.mddapi.validators.ValidPassword;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;

import java.util.Date;

@Entity
@Table(name = "USERS", uniqueConstraints = {
        @UniqueConstraint(columnNames = "email")
})
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String username;

    @NonNull
    @Column
    private String email;

    @NonNull
    @Column
    @ValidPassword
    private String password;

    @Column
    @CreatedDate
    private Date created_at;

}
