using Cache_Capstone.Models;
using Cache_Capstone.Repositories;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cache_Capstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoTagController : ControllerBase
    {
        private readonly IVideoRepository _videoRepository;
        private readonly IVideoTagRepository _videoTagRepository;      
        private readonly IUserProfileRepository _userProfileRepository;


        public VideoTagController(IVideoRepository videoRepository, IVideoTagRepository videoTagRepository, IUserProfileRepository userProfileRepository)
        {
            _videoRepository = videoRepository;
            _videoTagRepository = videoTagRepository;
            _userProfileRepository = userProfileRepository;
        }

      
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var videoTag = _videoTagRepository.GetById(id);
            return Ok(videoTag);
        }

        [HttpGet("GetVideoTags/{id}")]
        public IActionResult GetByVideoId(int id)
        {
            var videoTags = _videoTagRepository.GetVideoTagsByVideoId(id);
            return Ok(videoTags);
        }

        // POST api/<VideoTagController>
        [HttpPost]
        public IActionResult Post(VideoTag videoTag)
        {
            _videoTagRepository.Add(videoTag);
            return NoContent();
        }

        // DELETE api/<VideoTagController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _videoTagRepository.Delete(id);
            return NoContent();
        }

        [HttpDelete("ClearVideoTags/{id}")]
        public IActionResult ClearVideoTags(int id)
        {
            _videoTagRepository.clearVideoTagsForVideo(id);
            return NoContent();
        }
    }
}
