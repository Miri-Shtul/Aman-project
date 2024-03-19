using AutoMapper;
using CovidTracking.Repositories.Entities;
using CovidTracking.Services.Services;
using CovidTracking.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace CovidTracking.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VaccinationController:ControllerBase
    {
        private readonly IVaccinationService _vaccinationService;
        private readonly IMapper _mapper;

        public VaccinationController(IVaccinationService vaccinationService, IMapper mapper)
        {
            _vaccinationService = vaccinationService;
            _mapper = mapper;
        }
     
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var vaccinations = await _vaccinationService.GetAllAsync();
                return Ok(_mapper.Map<List<VaccinationModel>>(vaccinations));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("{id:int}")]
        public async Task<IActionResult> GetById(int id)
        {
            try
            {
                var vaccination = await _vaccinationService.GetByIdAsync(id);
                if (vaccination == null)
                {
                    return NotFound();
                }
                return Ok(_mapper.Map<VaccinationModel>(vaccination));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error"+ex);
            }
        }
        [HttpGet("by-member/{memberId:int}")]
        public async Task<IActionResult> GetByMemberId(int memberId)
        {
            try
            {
                var vaccinationModel = await _vaccinationService.GetByMemberIdAsync(memberId);
                if (vaccinationModel == null)
                {
                    return NotFound();
                }
                return Ok(_mapper.Map<List<VaccinationModel>>(vaccinationModel));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error"+ ex);
            }
        }
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] VaccinationModel vaccinationModel )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var vaccination = _mapper.Map<Vaccination>(vaccinationModel);
                var createdVaccination = await _vaccinationService.AddAsync(vaccination);
                if (createdVaccination == null)
                {
                    return BadRequest("Maximum number of vaccinations reached or member not found");
                }
                return CreatedAtAction(nameof(GetById), new { id = createdVaccination.Id }, _mapper.Map<VaccinationModel>(createdVaccination));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(int id, [FromBody] VaccinationModel vaccinationModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (id != vaccinationModel.Id)
            {
                return BadRequest("ID mismatch");
            }

            try
            {
                var existingVaccination = await _vaccinationService.GetByIdAsync(id);
                if (existingVaccination == null)
                {
                    return NotFound();
                }
                _mapper.Map(vaccinationModel, existingVaccination);
                await _vaccinationService.UpdateAsync(existingVaccination);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var vaccination = await _vaccinationService.GetByIdAsync(id);
                if (vaccination == null)
                {
                    return NotFound();
                }
                await _vaccinationService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("not-vaccinated-members-count")]
        public async Task<IActionResult> GetNotVaccinatedMembersCountAsync()
        {
            try
            {
                var vaccinatedMembersCount = await _vaccinationService.GetNotVaccinatedCountAsync();
                return Ok(vaccinatedMembersCount);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }

    }
}
