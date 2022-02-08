using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cache_Capstone.Models
{
    public class Video
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string Description { get; set; }

        [Required]
        public string Url { get; set; }

        public DateTime DateCreated { get; set; }

        public int UserId { get; set; }

        public User UserProfile { get; set; }

        public Tag VideoTags { get; set; }
    }
}
