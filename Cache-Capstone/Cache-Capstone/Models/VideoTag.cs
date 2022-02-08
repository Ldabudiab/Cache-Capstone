using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cache_Capstone.Models
{
    public class VideoTag
    {
        public int Id { get; set; }
        public int TagId { get; set; }
        public Tag Tag { get; set; }
        public int VideoId { get; set; }
        public Video Video { get; set; }

    }
}
