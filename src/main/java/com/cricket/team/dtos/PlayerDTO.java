package com.cricket.team.dtos;

import jakarta.validation.constraints.*;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PlayerDTO {

    private Long playerId;

    @NotBlank(message = "Player Name is required")
    private String playerName;

    @NotNull(message = "Jersey Number is required")
    private Integer jerseyNumber;

    @NotBlank(message = "Role is required")
    private String role;

    @NotNull(message = "Total Matches is required")
    @Min(value = 0, message = "Total Matches cannot be negative")
    private Integer totalMatches;

    @NotBlank(message = "Team Name is required")
    private String teamName;

    @NotBlank(message = "Country/State Name is required")
    private String countryOrState;

    private String description;
}
