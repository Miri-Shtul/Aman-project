namespace CovidTracking.WebApi.Models
{
    public class AddressModel
    {
        public string City { get; set; }
        public string Street { get; set; }
        public int BuildingNumber { get; set; }
        public AddressModel()
        {
        }
        public AddressModel(string city, string street, int buildingNumber)
        {
            City = city;
            Street = street;
            BuildingNumber = buildingNumber;
        }
    }
}
