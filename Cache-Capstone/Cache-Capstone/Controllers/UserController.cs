using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Cache_Capstone.Models;
using Cache_Capstone.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Cache_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserProfileController : ControllerBase
    {
        private readonly IUserProfileRepository _upRepo;
        public UserProfileController(IUserProfileRepository userProfileRepository)
        {
            _upRepo = userProfileRepository;
        }

        
        [HttpPost]
        public IActionResult Post(User userProfile)
        {
           
            userProfile.UserTypeId = UserType.USER_TYPE_ID;
            _upRepo.Add(userProfile);
            return CreatedAtAction(
                nameof(GetByFirebaseUserId),
                new { firebaseUserId = userProfile.FirebaseId },
                userProfile);
        }


       
        [HttpGet("{firebaseUserId}")]
        public IActionResult GetByFirebaseUserId(string firebaseUserId)
        {
            var userProfile = _upRepo.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok(userProfile);
        }
        
        [HttpGet("DoesUserExist/{firebaseUserId}")]
        public IActionResult DoesUserExist(string firebaseUserId)
        {
            var userProfile = _upRepo.GetByFirebaseUserId(firebaseUserId);
            if (userProfile == null)
            {
                return NotFound();
            }
            return Ok();
        }

    }
}
