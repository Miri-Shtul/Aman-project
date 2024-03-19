using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CovidTracking.Repositories.Entities
{
    public class ActivePatientsCountModel
    {
        public DateTime Date { get; set; }
        public int ActivePatientsCount { get; set; }=0;
    }
}
