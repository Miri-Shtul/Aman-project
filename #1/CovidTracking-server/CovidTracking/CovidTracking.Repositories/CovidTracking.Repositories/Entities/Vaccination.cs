using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CovidTracking.Repositories.Entities
{
    public class Vaccination
    {
        public int Id { get; set; }
        [ForeignKey("MemberId")]
        public int MemberId { get; set; }
        public Member Member { get; set; } // Navigation Property
        public DateTime ReciveTime { get; set; }
        public string Manufacturer { get; set; }
    }
}
