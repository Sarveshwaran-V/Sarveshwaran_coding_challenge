package com.cricket.team.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "players")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "player_id")
    private Long playerId;

    @Column(name = "player_name", nullable = false, length = 100)
    private String playerName;

    @Column(name = "jersey_number", nullable = false, unique = true)
    private Integer jerseyNumber;

    @Column(name = "role", nullable = false, length = 50)
    private String role;

    @Column(name = "total_matches", nullable = false)
    private Integer totalMatches;

    @Column(name = "team_name", nullable = false, length = 100)
    private String teamName;

    @Column(name = "country_or_state", nullable = false, length = 100)
    private String countryOrState;

    @Column(name = "description", length = 1000)
    private String description;
}
