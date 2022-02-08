using Cache_Capstone.Models;
using System.Collections.Generic;


namespace Cache_Capstone.Repositories
{
    public interface IVideoRepository
    {
        void Add(Video video);
        void Delete(int id);
        System.Collections.Generic.List<Video> GetAll();
        System.Collections.Generic.List<Video> GetAllWithComments();
        Video GetById(int id);
        List<Video> SearchByTag(string searchTag);
        //System.Collections.Generic.List<Video> Search(string criterion, bool sortDescending);
        //System.Collections.Generic.List<Video> SearchByDate(string searchDate);
        void Update(Video video);
    }
}