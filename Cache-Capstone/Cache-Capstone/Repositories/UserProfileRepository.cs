using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Cache_Capstone.Models;
using Cache_Capstone.Utils;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;

namespace Cache_Capstone.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public User GetByFirebaseUserId(string firebaseId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, Up.FirebaseId, up.FirstName, up.LastName, up.UserName AS UserName, up.Email, up.UserTypeId,
                               ut.Name AS UserTypeName
                          FROM [User] as up
                               LEFT JOIN UserType ut on up.UserTypeId = ut.Id
                         WHERE FirebaseId = @FirebaseId";

                    DbUtils.AddParameter(cmd, "@FirebaseId", firebaseId);

                    User userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new User()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseId = DbUtils.GetString(reader, "FirebaseId"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            UserName = DbUtils.GetString(reader, "UserName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            UserTypeId = DbUtils.GetInt(reader, "UserTypeId"),
                            UserType = new UserType()
                            {
                                Id = DbUtils.GetInt(reader, "UserTypeId"),
                                Name = DbUtils.GetString(reader, "UserTypeName"),
                            }
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(User userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO [User] (FirebaseId, FirstName, LastName, UserName, Email, UserTypeId)
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseId, @FirstName, @LastName, @UserName, @Email, @UserTypeId)";
                    DbUtils.AddParameter(cmd, "@FirebaseId", userProfile.FirebaseId);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@UserName", userProfile.UserName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@UserTypeId", userProfile.UserTypeId);

                    userProfile.Id = (int)cmd.ExecuteScalar();
                }
            }
        }



    }
}
