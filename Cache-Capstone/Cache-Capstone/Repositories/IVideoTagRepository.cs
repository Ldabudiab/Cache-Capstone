using Cache_Capstone.Models;
using System.Collections.Generic;

namespace Cache_Capstone.Repositories
{
    public interface IVideoTagRepository
    {
        void Add(VideoTag videoTag);
        void clearVideoTagsForVideo(int videoId);
        void Delete(int id);
        VideoTag GetById(int id);
        List<VideoTag> GetVideoTagsByVideoId(int id);
    }
}