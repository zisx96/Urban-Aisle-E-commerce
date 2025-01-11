package com.urbanaisle.store.auth.helper;

import java.util.Random;

public class VerificationCodeGenerator {

    public static String generateCode(){
        Random random = new Random();
        int code = 1000 + random.nextInt(900000);
        return String.valueOf(code);
    }
}
