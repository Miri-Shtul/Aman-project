using System.ComponentModel.DataAnnotations;
using static System.Net.Mime.MediaTypeNames;

namespace CovidTracking.WebApi.Validations
{
    public class DateOfBirthAttribute: ValidationAttribute
    {
        public int MinAge { get; set; }
        public int MaxAge { get; set; }

        public DateOfBirthAttribute(int MinAge, int MaxAge)
        {
            this.MinAge = MinAge;
            this.MaxAge = MaxAge;
            ErrorMessage = ErrorMessage ?? $"Age must be between {MinAge} and {MaxAge}";
        }

        public override bool IsValid(object value)
        {
            if (value is DateTime dateOfBirth)
            {
                var today = DateTime.Today;
                int age = today.Year - dateOfBirth.Year;
                if (dateOfBirth.Date > today.AddYears(-age)) age--;

                return age >= MinAge && age <= MaxAge;
            }

            return false;
        }
    }
}
