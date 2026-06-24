package com.cricket.team.services;

import com.cricket.team.dtos.PlayerDTO;
import com.cricket.team.entities.Player;
import com.cricket.team.repositories.PlayerRepository;
import com.cricket.team.exceptions.PlayerNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PlayerService {

    private final PlayerRepository playerRepository;

    public PlayerService(PlayerRepository playerRepository) {
        this.playerRepository = playerRepository;
    }

    public List<PlayerDTO> getAllPlayers() {
        return playerRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    public PlayerDTO getPlayerById(Long playerId) {
        Player player = playerRepository.findById(playerId)
                .orElseThrow(() -> new PlayerNotFoundException("Player not found with id: " + playerId));
        return mapToDTO(player);
    }

    public PlayerDTO createPlayer(PlayerDTO playerDTO) {
        Player player = mapToEntity(playerDTO);
        Player savedPlayer = playerRepository.save(player);
        return mapToDTO(savedPlayer);
    }

    public PlayerDTO updatePlayer(Long playerId, PlayerDTO playerDetails) {
        Player player = playerRepository.findById(playerId)
                .orElseThrow(() -> new PlayerNotFoundException("Player not found with id: " + playerId));
        
        player.setPlayerName(playerDetails.getPlayerName());
        player.setJerseyNumber(playerDetails.getJerseyNumber());
        player.setRole(playerDetails.getRole());
        player.setTotalMatches(playerDetails.getTotalMatches());
        player.setTeamName(playerDetails.getTeamName());
        player.setCountryOrState(playerDetails.getCountryOrState());
        player.setDescription(playerDetails.getDescription());

        Player updatedPlayer = playerRepository.save(player);
        return mapToDTO(updatedPlayer);
    }

    public void deletePlayer(Long playerId) {
        Player player = playerRepository.findById(playerId)
                .orElseThrow(() -> new PlayerNotFoundException("Player not found with id: " + playerId));
        playerRepository.delete(player);
    }

    @Transactional
    public void deletePlayersByRoleAndTeam(String role, String teamName) {
        playerRepository.deleteByRoleAndTeamName(role, teamName);
    }

    // Helper method to convert Entity to DTO
    private PlayerDTO mapToDTO(Player player) {
        return new PlayerDTO(
                player.getPlayerId(),
                player.getPlayerName(),
                player.getJerseyNumber(),
                player.getRole(),
                player.getTotalMatches(),
                player.getTeamName(),
                player.getCountryOrState(),
                player.getDescription()
        );
    }

    // Helper method to convert DTO to Entity
    private Player mapToEntity(PlayerDTO playerDTO) {
        return new Player(
                playerDTO.getPlayerId(),
                playerDTO.getPlayerName(),
                playerDTO.getJerseyNumber(),
                playerDTO.getRole(),
                playerDTO.getTotalMatches(),
                playerDTO.getTeamName(),
                playerDTO.getCountryOrState(),
                playerDTO.getDescription()
        );
    }
}
