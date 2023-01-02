/*
 * Author Name: Aditya Chaurasia
 * Date: 29-11-2022
 * Created With: IntelliJ IDEA Ultimate
 * Profile: github.com/ChaurasiaAditya
 * Website: ChaurasiaAditya.in
 */
package com.kanban.userservice.service;

import com.kanban.userservice.domain.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class SecurityTokenGeneratorImpl implements SecurityTokenGenerator {
	@Override
	public Map<String, String> generateToken(User user) {
		String jwtToken;
		jwtToken = Jwts.builder()
			.setSubject(user.getEmail()) // Header
			.setIssuedAt(new Date()) // Payload
			.signWith(SignatureAlgorithm.HS256, "secretKey") // Verify Signature
			.compact();

		Map<String, String> map = new HashMap<>();
		map.put("token", jwtToken);
		map.put("message", "User Successfully logged in");
		return map;
	}
}
