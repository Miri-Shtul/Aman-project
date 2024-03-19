namespace CovidTracking.WebApi.Models
{
    public class CovidDetailModel
    {
        public int Id { get; set; }
        public int MemberId { get; set; }
        public DateTime PositiveResultDate { get; set; }
        public DateTime RecoveryDate { get; set; }
    }
}
