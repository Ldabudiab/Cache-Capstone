using Cache_Capstone.Models;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Cache_Capstone.Repositories
{
    public class VideoTagRepository : BaseRepository, IVideoTagRepository
    {

        public VideoTagRepository(IConfiguration config) : base(config) { }


        public VideoTag GetById(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT VideoId, TagID
                         FROM VideoTag
                        WHERE Id = @id;";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    VideoTag videoTag = new VideoTag();

                    if (reader.Read())
                    {
                        videoTag.Id = id;
                        videoTag.VideoId = reader.GetInt32(reader.GetOrdinal("VideoId"));
                        videoTag.TagId = reader.GetInt32(reader.GetOrdinal("TagId"));
                    }

                    reader.Close();

                    return videoTag;
                }
            }
        }


        public List<VideoTag> GetVideoTagsByVideoId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                       SELECT vt.Id, vt.VideoId, vt.TagId, t.Name 
                         FROM VideoTag vt
                              LEFT JOIN Tag t ON t.Id = vt.TagId
                              LEFT JOIN Video v ON v.id= vt.VideoId
                        WHERE v.id = @id";

                    cmd.Parameters.AddWithValue("@id", id);
                    var reader = cmd.ExecuteReader();

                    List<VideoTag> postTags = new List<VideoTag> { };

                    while (reader.Read())
                    {
                        VideoTag postTag = new VideoTag()
                        {
                            Id = reader.GetInt32(reader.GetOrdinal("Id")),
                            VideoId = reader.GetInt32(reader.GetOrdinal("VideoId")),
                            TagId = reader.GetInt32(reader.GetOrdinal("TagId")),
                            Tag = new Tag()
                            {
                                Name = reader.GetString(reader.GetOrdinal("Name")),
                            }
                        };

                        postTags.Add(postTag);
                    }

                    reader.Close();

                    return postTags;
                }
            }
        }

        public void Add(VideoTag videoTag)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO VideoTag (VideoId, TagId) OUTPUT INSERTED.ID
                                                     VALUES (@videoId, @tagId)";
                    cmd.Parameters.AddWithValue("@videoId", videoTag.VideoId);
                    cmd.Parameters.AddWithValue("@tagId", videoTag.TagId);

                    int id = (int)cmd.ExecuteScalar();

                    videoTag.Id = id;
                }
            }
        }
        public void Delete(int id)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM VideoTag WHERE id = @id";
                    cmd.Parameters.AddWithValue("@id", id);

                    cmd.ExecuteNonQuery();
                }
            }
        }

        public void clearVideoTagsForVideo(int videoId)
        {
            using (SqlConnection conn = Connection)
            {
                conn.Open();
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"DELETE FROM VideoTag WHERE VideoId = @videoId";
                    cmd.Parameters.AddWithValue("@videoId", videoId);

                    cmd.ExecuteNonQuery();
                }
            }

        }


    }
}
