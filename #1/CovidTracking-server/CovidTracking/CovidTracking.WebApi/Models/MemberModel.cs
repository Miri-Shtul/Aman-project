using CovidTracking.WebApi.Validations;
using System.ComponentModel.DataAnnotations;

namespace CovidTracking.WebApi.Models
{
    public class MemberModel
    {
        public int? Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        [IsraeliId]
        [Required]
        [StringLength(9, ErrorMessage = "IdentityNumber length can't be more than 9")]
        [MinLength(9, ErrorMessage = "IdentityNumber length can't be less than 9")]
        public string IdentityNumber { get; set; }
        public AddressModel Address { get; set; }
        [DateOfBirth(0, 120)]
        public DateTime DateOfBirth { get; set; }
        [Phone]
        public string Phone { get; set; }
        [RegularExpression(@"^(\d{10})$", ErrorMessage = "Invalid Mobile Phone Format")]
        public string MobilePhone { get; set; }
        public IFormFile ImageFile { get; set; }
        public string? ImagePath { get; set; }
    }
}
