package COMP90082.team18.ePortfolioAPI.controller;

import COMP90082.team18.ePortfolioAPI.DTO.Result;
import COMP90082.team18.ePortfolioAPI.DTO.WorkExperienceDTO;
import COMP90082.team18.ePortfolioAPI.entity.WorkExperience;
import COMP90082.team18.ePortfolioAPI.service.WorkExperienceService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Type;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("users/{id}/work-experiences")
public class WorkExperienceController {
    @Autowired
    private WorkExperienceService workExperienceService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping
    public Result<List<WorkExperienceDTO>> getAllWorkExperiences(@PathVariable Long id){
        List<WorkExperience> result = workExperienceService.getAllWorkExperiences(id);
        Type listType = new TypeToken<List<WorkExperienceDTO>>(){}.getType();
        return new Result<>("200 ok", true, modelMapper.map(result, listType));
    }

    @GetMapping("/{workExperienceId}")
    public Result<WorkExperienceDTO> getWorkExperience(@PathVariable Long id,
                                                       @PathVariable Long workExperienceId){
        WorkExperience result = workExperienceService.getWorkExperience(id, workExperienceId);
        return new Result<>("200 ok", true, modelMapper.map(result, WorkExperienceDTO.class));
    }

    @PostMapping
    public Result<WorkExperienceDTO> postWorkExperience(@PathVariable Long id,
                                                        @RequestBody WorkExperienceDTO workExperienceDTO){
        WorkExperience result = workExperienceService.postWorkExperience(
                id, modelMapper.map(workExperienceDTO, WorkExperience.class));
        return new Result<>("200 ok", true, modelMapper.map(result, WorkExperienceDTO.class));
    }

    @PutMapping("/{workExperienceId}")
    public Result<WorkExperienceDTO> putWorkExperience(@PathVariable Long id,
                                                       @PathVariable Long workExperienceId,
                                                       @RequestBody WorkExperienceDTO workExperienceDTO){
        WorkExperience result = workExperienceService.putWorkExperience(
                id, workExperienceId, modelMapper.map(workExperienceDTO, WorkExperience.class));
        return new Result<>("200 ok", true, modelMapper.map(result, WorkExperienceDTO.class));
    }
}