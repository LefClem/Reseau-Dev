package com.openclassrooms.mddapi.validators;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Constraint(validatedBy = PasswordValidator.class)
@Target({ ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
public @interface ValidPassword {
    String message() default "Le mot de passe doit contenir au moins une minuscule, une majuscule, un chiffre et un caractère spécial.";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
