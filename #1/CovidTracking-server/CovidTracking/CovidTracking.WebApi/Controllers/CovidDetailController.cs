using AutoMapper;
using CovidTracking.Repositories.Entities;
using CovidTracking.Services.Services;
using CovidTracking.WebApi.Models;
using Microsoft.AspNetCore.Mvc;

namespace CovidTracking.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CovidDetailController : ControllerBase
    {

        private readonly ICovidDetailService _covidDetailService;
        private readonly IMapper _mapper;

        public CovidDetailController(ICovidDetailService covidDetailService, IMapper mapper)
        {
            _covidDetailService = covidDetailService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var covidDetails = await _covidDetailService.GetAllAsync();
                return Ok(_mapper.Map<List<CovidDetailModel>>(covidDetails));
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
                var covidDetail = await _covidDetailService.GetByIdAsync(id);
                if (covidDetail == null)
                {
                    return NotFound();
                }
                return Ok(_mapper.Map<CovidDetailModel>(covidDetail));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error" + ex);
            }
        }
        [HttpGet("by-member/{memberId:int}")]
        public async Task<IActionResult> GetByMemberId(int memberId)
        {
            try
            {
                var covidDetails = await _covidDetailService.GetByMemberIdAsync(memberId);
                if (covidDetails == null)
                {
                    return NotFound();
                }
                return Ok(_mapper.Map<List<CovidDetailModel>>(covidDetails));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error"+ex);
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CovidDetailModel covidDetailModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var covidDetail = _mapper.Map<CovidDetail>(covidDetailModel);
                var createdCovidDetail = await _covidDetailService.AddAsync(covidDetail);
                return CreatedAtAction(nameof(GetById), new { id = createdCovidDetail.Id }, _mapper.Map<CovidDetailModel>(createdCovidDetail));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error"+ex);
            }
        }

        [HttpPut("{id:int}")]
        public async Task<IActionResult> Put(int id, [FromBody] CovidDetailModel covidDetailModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var covidDetailToUpdate = await _covidDetailService.GetByIdAsync(id);
                if (covidDetailToUpdate == null)
                {
                    return NotFound();
                }

                _mapper.Map(covidDetailModel, covidDetailToUpdate);
                await _covidDetailService.UpdateAsync(covidDetailToUpdate);
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
                var covidDetail = await _covidDetailService.GetByIdAsync(id);
                if (covidDetail == null)
                {
                    return NotFound();
                }

                await _covidDetailService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }
        [HttpGet("active-patients-count-last-month")]
        public async Task<IActionResult> GetActivePatientsCountLastMonthAsync()
        {
            try
            {
                var activePatientsCount = await _covidDetailService.GetActivePatientsCountLastMonthAsync();
                return Ok(activePatientsCount);
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Internal server error");
            }
        }


    }
}

