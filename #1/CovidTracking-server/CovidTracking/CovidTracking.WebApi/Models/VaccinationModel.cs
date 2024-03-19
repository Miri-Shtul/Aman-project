namespace CovidTracking.WebApi.Models
{
    public class VaccinationModel
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public DateTime ReciveTime { get; set; }
        public string Manufacturer { get; set; }
    }
}
