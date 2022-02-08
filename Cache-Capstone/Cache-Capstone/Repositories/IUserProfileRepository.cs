using Cache_Capstone.Models;

namespace Cache_Capstone.Repositories
{
    public interface IUserProfileRepository
    {
        //User GetByIdWithVideos(int id);
        void Add(User user);
        User GetByFirebaseUserId(string firebaseUserId);
    }
}
