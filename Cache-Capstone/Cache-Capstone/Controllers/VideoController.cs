using System;
using Microsoft.AspNetCore.Mvc;
using Cache_Capstone.Repositories;
using Cache_Capstone.Models;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

namespace Cache_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class VideoController : ControllerBase
    {
        private readonly IVideoRepository _videoRepository;

        private readonly IUserProfileRepository _userProfileRepository;

        public VideoController(IVideoRepository videoRepository, IUserProfileRepository userProfileRepository)
        {
            _videoRepository = videoRepository;
            _userProfileRepository = userProfileRepository;
        }
        
        [HttpGet]
        public IActionResult Get()
        {
            return Ok(_videoRepository.GetAll());
        }
        
        
        
        //[HttpGet("search")]
        //public IActionResult Search(string q, bool sortDesc)
        //{
        //    return Ok(_videoRepository.Search(q, sortDesc));
        //}
        
        [HttpGet("searchbytag")]
        public IActionResult SearchByTag(string searchTag)
        {
            return Ok(_videoRepository.SearchByTag(searchTag));
        }
        
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var video = _videoRepository.GetById(id);
            if (video == null)
            {
                return NotFound();
            }
            return Ok(video);
        }
        
        [HttpPost]
        public IActionResult Post(Video video)
        {
            // NOTE: This is only temporary to set the UserProfileId until we implement login
            // TODO: After we implement login, use the id of the current user
            

            video.DateCreated = DateTime.Now;
            if (string.IsNullOrWhiteSpace(video.Description))
            {
                video.Description = null;
            }

            video.UserId = GetCurrentUserProfile().Id;

            _videoRepository.Add(video);

            return CreatedAtAction("Get", new { id = video.Id }, video);
        }
        
        [HttpPut("{id}")]
        public IActionResult Put(int id, Video video)
        {
            if (id != video.Id)
            {
                return BadRequest();
            }

            _videoRepository.Update(video);
            return NoContent();
        }
        
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _videoRepository.Delete(id);
            return NoContent();
        }

        private User GetCurrentUserProfile()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userProfileRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
