using System.Collections.Generic;
using System.Linq;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Cache_Capstone.Models;
using Cache_Capstone.Utils;

namespace Cache_Capstone.Repositories
{
    public class VideoRepository : BaseRepository, IVideoRepository
    {
        public VideoRepository(IConfiguration configuration) : base(configuration) { }

        public List<Video> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
            SELECT v.Id, v.Title, v.Description, v.Url, v.DateCreated, v.UserId,

                      up.FirstName, up.LastName, up.Email, up.UserName
                       
                        
                 FROM Video v 
                      JOIN [User] up ON v.UserId = up.Id
             ORDER BY DateCreated
            ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var videos = new List<Video>();
                        while (reader.Read())
                        {
                            videos.Add(new Video()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Description = DbUtils.GetString(reader, "Description"),
                                Url = DbUtils.GetString(reader, "Url"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                UserProfile = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    UserName = DbUtils.GetString(reader, "UserName")
                                    
                                },
                            });
                        }

                        return videos;
                    }
                }
            }
        }

        public List<Video> GetAllWithComments()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                SELECT v.Id AS VideoId, v.Title, v.Description, v.Url, 
                       v.DateCreated AS VideoDateCreated, v.UserId As VideoUserId,

                       up.Name, up.Email, up.DateCreated AS UserDateCreated,
                        
                        
                       c.Id AS CommentId, c.Message, c.UserId AS CommentUserId
                  FROM Video v 
                       JOIN [User] up ON v.UserId = up.Id
                       LEFT JOIN Comment c on c.VideoId = v.id
             ORDER BY  v.DateCreated
            ";

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var videos = new List<Video>();
                        while (reader.Read())
                        {
                            var videoId = DbUtils.GetInt(reader, "VideoId");

                            var existingVideo = videos.FirstOrDefault(p => p.Id == videoId);
                            if (existingVideo == null)
                            {
                                existingVideo = new Video()
                                {
                                    Id = videoId,
                                    Title = DbUtils.GetString(reader, "Title"),
                                    Description = DbUtils.GetString(reader, "Description"),
                                    DateCreated = DbUtils.GetDateTime(reader, "VideoDateCreated"),
                                    Url = DbUtils.GetString(reader, "Url"),
                                    UserId = DbUtils.GetInt(reader, "VideoUserId"),
                                  
                                    
                                };

                                videos.Add(existingVideo);
                            }

                            
                        }

                        return videos;
                    }
                }
            }
        }


        public Video GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                          SELECT v.Id, v.Title, v.Description, v.Url, v.DateCreated, v.UserId,

                      up.Name, up.Email, up.DateCreated AS UserDateCreated
                       
                        
                 FROM Video v 
                      JOIN [User] up ON v.UserId = up.Id
                           WHERE v.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        Video video = null;
                        if (reader.Read())
                        {
                            video = new Video()
                            {
                                Id = id,
                                Title = DbUtils.GetString(reader, "Title"),
                                Description = DbUtils.GetString(reader, "Description"),
                                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                                Url = DbUtils.GetString(reader, "Url"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                               
                            };
                        }

                        return video;
                    }
                }
            }
        }

        

        //public List<Video> Search(string criterion, bool sortDescending)
        //{
        //    using (var conn = Connection)
        //    {
        //        conn.Open();
        //        using (var cmd = conn.CreateCommand())
        //        {
        //            var sql = @"
        //      SELECT v.Id, v.Title, v.Description, v.Url, v.DateCreated AS VideoDateCreated, v.UserId,

        //             up.Name, up.Email, up.DateCreated AS UserDateCreated
                      
                        
        //        FROM Video v 
        //             JOIN [User] up ON v.UserId = up.Id
        //       WHERE v.Title LIKE @Criterion OR v.Description LIKE @Criterion";

        //            if (sortDescending)
        //            {
        //                sql += " ORDER BY v.DateCreated DESC";
        //            }
        //            else
        //            {
        //                sql += " ORDER BY v.DateCreated";
        //            }

        //            cmd.CommandText = sql;
        //            DbUtils.AddParameter(cmd, "@Criterion", $"%{criterion}%");
        //            using (SqlDataReader reader = cmd.ExecuteReader())
        //            {

        //                var videos = new List<Video>();
        //                while (reader.Read())
        //                {
        //                    videos.Add(new Video()
        //                    {
        //                        Id = DbUtils.GetInt(reader, "Id"),
        //                        Title = DbUtils.GetString(reader, "Title"),
        //                        Description = DbUtils.GetString(reader, "Description"),
        //                        DateCreated = DbUtils.GetDateTime(reader, "VideoDateCreated"),
        //                        Url = DbUtils.GetString(reader, "Url"),
        //                        UserId = DbUtils.GetInt(reader, "UserId"),
                               
        //                    });
        //                }

        //                return videos;
        //            }
        //        }
        //    }
        //}

        public List<Video> SearchByTag(string searchTag)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    var sql = @"
              SELECT v.Id, v.Title, v.Description, v.Url, v.DateCreated AS VideoDateCreated, v.UserId,

                     up.UserName, up.Email, up.FirstName, up.LastName,
                     vt.Id, vt.TagId, vt.VideoId,
                     t.Name
                     
                      
                        
                FROM Video v 
                     JOIN [User] up ON v.UserId = up.Id
                     JOIN VideoTag vt on vt.VideoId = v.id
                     JOIN Tag t on t.Id = vt.TagId
               WHERE t.name = @searchTag";

                    cmd.CommandText = sql;
                    DbUtils.AddParameter(cmd, "@searchtag", searchTag);
                    using (SqlDataReader reader = cmd.ExecuteReader())
                    {

                        var videos = new List<Video>();
                        while (reader.Read())
                        {
                            videos.Add(new Video()
                            {
                                Id = DbUtils.GetInt(reader, "Id"),
                                Title = DbUtils.GetString(reader, "Title"),
                                Description = DbUtils.GetString(reader, "Description"),
                                DateCreated = DbUtils.GetDateTime(reader, "VideoDateCreated"),
                                Url = DbUtils.GetString(reader, "Url"),
                                UserId = DbUtils.GetInt(reader, "UserId"),
                                UserProfile = new User()
                                {
                                    Id = DbUtils.GetInt(reader, "UserId"),
                                    FirstName = DbUtils.GetString(reader, "FirstName"),
                                    LastName = DbUtils.GetString(reader, "LastName"),
                                    Email = DbUtils.GetString(reader, "Email"),
                                    UserName = DbUtils.GetString(reader, "UserName")

                                },
                                VideoTags = new Tag()
                                {
                                    Name = reader.GetString(reader.GetOrdinal("Name")),
                                },
                            });
                        }

                        return videos;
                    }
                }
            }
        }

        public void Add(Video video)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        INSERT INTO Video (Title, Description, DateCreated, Url, UserId)
                        OUTPUT INSERTED.ID
                        VALUES (@Title, @Description, @DateCreated, @Url, @UserId)
                        
                        ";

                    DbUtils.AddParameter(cmd, "@Title", video.Title);
                    DbUtils.AddParameter(cmd, "@Description", video.Description);
                    DbUtils.AddParameter(cmd, "@DateCreated", video.DateCreated);
                    DbUtils.AddParameter(cmd, "@Url", video.Url);
                    DbUtils.AddParameter(cmd, "@UserId", video.UserId);
                    

                    video.Id = (int)cmd.ExecuteScalar();
                }
            }
        }

        public void Update(Video video)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        UPDATE Video
                           SET Title = @Title,
                               Description = @Description,
                               DateCreated = @DateCreated,
                               Url = @Url,
                               UserId = @UserId
                         WHERE Id = @Id";

                    DbUtils.AddParameter(cmd, "@Title", video.Title);
                    DbUtils.AddParameter(cmd, "@Description", video.Description);
                    DbUtils.AddParameter(cmd, "@DateCreated", video.DateCreated);
                    DbUtils.AddParameter(cmd, "@Url", video.Url);
                    DbUtils.AddParameter(cmd, "@UserId", video.UserId);
                    DbUtils.AddParameter(cmd, "@Id", video.Id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void Delete(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = "DELETE FROM Video WHERE Id = @id";
                    DbUtils.AddParameter(cmd, "@id", id);
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}

