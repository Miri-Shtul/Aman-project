using System.ComponentModel.DataAnnotations;

namespace CovidTracking.WebApi.Validations
{
    public class IsraeliIdAttribute : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            if (value == null || !(value is string id))
                return false;

            id = id.Trim();
            if (id.Length != 9)
                return false;

            int checksum = 0;
            for (int i = 0; i < 9; i++)
            {
                int digit = id[i] - '0';
                if (i % 2 != 0) digit *= 2;
                checksum += digit / 10;
                checksum += digit % 10;
            }

            return checksum % 10 == 0;
        }

        public override string FormatErrorMessage(string name)
        {
            return $"The {name} is not a valid Israeli ID number.";
        }
    }
}
