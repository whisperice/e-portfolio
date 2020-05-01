package COMP90082.team18.ePortfolioAPI.DTO;

import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.File;

@Data
@EqualsAndHashCode(callSuper = false)
public class RecommendationDTO extends DTO {
    private Long id;
    private String referrerName;
    private String referrerTitle;
    private String description;
    private File media;
}
