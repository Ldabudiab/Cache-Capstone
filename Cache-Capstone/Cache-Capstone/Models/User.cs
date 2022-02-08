using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Cache_Capstone.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        public string FirebaseId { get; set; }

        [Required]
        public int UserTypeId { get; set; }

        public UserType UserType { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        public string UserName { get; set; }

        [Required]
        public string Email { get; set; }

        public string ImageUrl { get; set; }

        public DateTime DateCreated { get; set; }
        //public List<Video> Videos { get; set; }

    }
}
