package com.cricket.team.controllers;

import com.cricket.team.dtos.PlayerDTO;
import com.cricket.team.services.PlayerService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/players")
public class PlayerController {

    private final PlayerService playerService;

    public PlayerController(PlayerService playerService) {
        this.playerService = playerService;
    }

    @GetMapping
    public List<PlayerDTO> getAllPlayers() {
        return playerService.getAllPlayers();
    }

    @PostMapping
    public ResponseEntity<PlayerDTO> createPlayer(@Valid @RequestBody PlayerDTO playerDTO) {
        PlayerDTO createdPlayer = playerService.createPlayer(playerDTO);
        return new ResponseEntity<>(createdPlayer, HttpStatus.CREATED);
    }

    @GetMapping("/{playerId}")
    public ResponseEntity<PlayerDTO> getPlayerById(@PathVariable Long playerId) {
        PlayerDTO playerDTO = playerService.getPlayerById(playerId);
        return ResponseEntity.ok(playerDTO);
    }

    @PutMapping("/{playerId}")
    public ResponseEntity<PlayerDTO> updatePlayer(
            @PathVariable Long playerId,
            @Valid @RequestBody PlayerDTO playerDetails) {
        PlayerDTO updatedPlayer = playerService.updatePlayer(playerId, playerDetails);
        return ResponseEntity.ok(updatedPlayer);
    }

    @DeleteMapping("/{playerId}")
    public ResponseEntity<Void> deletePlayer(@PathVariable Long playerId) {
        playerService.deletePlayer(playerId);
        return ResponseEntity.ok().build();
    }
}
