package COMP90082.team18.ePortfolioAPI.security;

import com.auth0.jwt.JWT;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.User;

import java.io.UnsupportedEncodingException;
import java.security.KeyFactory;
import java.security.NoSuchAlgorithmException;
import java.security.interfaces.RSAPrivateKey;
import java.security.interfaces.RSAPublicKey;
import java.security.spec.InvalidKeySpecException;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;
import java.util.Date;

import static COMP90082.team18.ePortfolioAPI.security.SecurityConstants.*;
import static com.auth0.jwt.algorithms.Algorithm.RSA256;

public class JWTMethod {

    private static RSAPublicKey publicKey;
    private static RSAPrivateKey privateKey;

    public static String create(Authentication auth) {
        return JWT.create()
                .withSubject(((User) auth.getPrincipal()).getUsername())
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(RSA256(publicKey(), privateKey()));
    }

    public static String create(String username) {
        return JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(RSA256(publicKey(), privateKey()));
    }

    public static String parse(String token) {
        return JWT.require(RSA256(publicKey(), privateKey()))
                .build()
                .verify(token.replace(TOKEN_PREFIX, ""))
                .getSubject();
    }

    private static RSAPublicKey publicKey() {
        try {
            if (publicKey == null) {
                KeyFactory kf = KeyFactory.getInstance("RSA");
                X509EncodedKeySpec keySpecX509 = new X509EncodedKeySpec(
                        Base64.getDecoder().decode(PUBLIC_KEY.getBytes("utf-8")));
                publicKey = (RSAPublicKey) kf.generatePublic(keySpecX509);
            }
            return publicKey;
        } catch (NoSuchAlgorithmException e) {
            System.out.println("Encryption algorithm not found!");
        } catch (InvalidKeySpecException e) {
            System.out.println("Key factory could not get public encryption key for given specification");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }

    private static RSAPrivateKey privateKey() {
        try {
            if (privateKey == null) {
                KeyFactory kf = KeyFactory.getInstance("RSA");
                PKCS8EncodedKeySpec keySpecPKCS8 = new PKCS8EncodedKeySpec(
                        Base64.getDecoder().decode(PRIVATE_KEY.getBytes("utf-8")));
                privateKey = (RSAPrivateKey) kf.generatePrivate(keySpecPKCS8);
            }
            return privateKey;
        } catch (NoSuchAlgorithmException e) {
            System.out.println("Encryption algorithm not found!");
        } catch (InvalidKeySpecException e) {
            System.out.println("Key factory could not get public encryption key for given specification");
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
        return null;
    }
}