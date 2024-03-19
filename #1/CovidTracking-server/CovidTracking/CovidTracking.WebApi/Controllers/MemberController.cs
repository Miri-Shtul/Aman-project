using AutoMapper;
using CovidTracking.Repositories.Entities;
using CovidTracking.Services.Services;
using CovidTracking.WebApi.Models;
using Microsoft.AspNetCore.Mvc;
using static AutoMapper.Internal.ExpressionFactory;

namespace CovidTracking.WebApi.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MemberController:ControllerBase
    {
        private readonly IMemberService _memberService;
        private readonly IMapper _mapper;

        public MemberController(IMemberService memberService, IMapper mapper)
        {
            _memberService = memberService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            try
            {
                var members = await _memberService.GetAllAsync();
                return Ok(_mapper.Map<List<MemberModel>>(members));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
        [HttpGet("{id:int}", Name = "GetMemberById")]
        public async Task<IActionResult> GetById(int id)
        {
            var member = await _memberService.GetByIdAsync(id);
            if (member == null)
            {
                return NotFound();
            }
            return Ok(_mapper.Map<MemberModel>(member));
        }

        [HttpGet("by-identity-number/{identityNumber}")]
        public async Task<IActionResult> GetByIdentityNumber(string identityNumber)
        {
            try
            {
                var member = await _memberService.GetByIdentityNumberAsyc(identityNumber);
                if (member == null)
                {
                    return NotFound();
                }
                return Ok(_mapper.Map<MemberModel>(member));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] MemberModel memberModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                var member = _mapper.Map<Repositories.Entities.Member>(memberModel);
                var createdMember = await _memberService.AddAsync(member);
                return CreatedAtRoute("GetMemberById", new { id = createdMember.Id }, _mapper.Map<MemberModel>(createdMember));
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
        [HttpPut("{id:int}")]
        public async Task<IActionResult> Update(int id, [FromBody] MemberModel memberModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != memberModel.Id)
            {
                return BadRequest("ID mismatch");
            }

            try
            {
                var memberInDb = await _memberService.GetByIdAsync(id);
                if (memberInDb == null)
                {
                    return NotFound();
                }

                _mapper.Map(memberModel, memberInDb);
                await _memberService.UpdateAsync(memberInDb);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }
        [HttpDelete("{id:int}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var member = await _memberService.GetByIdAsync(id);
                if (member == null)
                {
                    return NotFound();
                }

                await _memberService.DeleteAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "An error occurred while processing your request.");
            }
        }

    }
}
