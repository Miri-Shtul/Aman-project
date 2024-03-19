using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CovidTracking.Repositories.Entities
{
    public class Address
    {
        public string City { get; set; }
        public string Street { get; set; }
        public int BuildingNumber { get; set; }

    }
}
