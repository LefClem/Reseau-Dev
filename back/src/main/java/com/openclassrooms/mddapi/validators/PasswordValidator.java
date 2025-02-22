package com.openclassrooms.mddapi.validators;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordValidator implements ConstraintValidator<ValidPassword, String> {

    private static final String PASSWORD_PATTERN =
            "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()-+=]).{8,}$";

    @Override
    public void initialize(ValidPassword constraintAnnotation) {
        // Pas besoin d'initialisation spécifique
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        System.out.println("🔍 Vérification du mot de passe : " + password);

        return password != null && password.matches(PASSWORD_PATTERN);
    }
}
