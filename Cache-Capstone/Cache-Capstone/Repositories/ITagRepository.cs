using Cache_Capstone.Models;
using System.Collections.Generic;

namespace Cache_Capstone.Repositories
{
    public interface ITagRepository
    {
        void Add(Tag tag);
        void Delete(int tagId);
        List<Tag> GetAllTags();
        Tag GetTagById(int id);
        void Update(Tag tag);
    }
}