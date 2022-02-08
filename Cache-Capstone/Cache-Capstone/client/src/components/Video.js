import React, { useEffect, useState } from "react";
import { Card, CardBody } from "reactstrap";
import { useHistory } from "react-router-dom";
import { getVideoTagsByVideoId } from "../modules/VideoTagManager";


const Video = ({ video }) => {
    

    

    const [videoTags, setVideoTags] = useState([]);

    const getVideoTags = () => {
        getVideoTagsByVideoId(video.id).then(tags => setVideoTags(tags));
    }
   const history = useHistory();


   const handleDelete = () => {
    history.push(`/deletevideo/${video.id}`);
};

   useEffect(() => {
    getVideoTags();
}, []);



    {
        return (
            <Card >
                
                <CardBody> 
                   
                    <div className="vidcard-lbox">

                    <iframe className="video"
                        src={video.url}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen />
                    <p className="videoposter">{video.userProfile.userName}</p>
                    <button className="delete-btn" onClick={handleDelete}>
                    Delete
                    </button>
                    
                    </div>

                    <div className="vidcard-rbox">
                    <p className="vid-title">
                        <strong>{video.title}</strong>
                    </p>

                    <p className="vid-desc">{video.description}</p>

                    <div className="tags-style">
                        {videoTags.map((tag) => (
                           <p className="tag">{tag.tag.name}</p> 
                            ))}
                    </div>
                    <button className="mng-tags-button" onClick={() => {history.push(`/managetags/${video.id}`)}}>Manage Tags</button>

                    </div>            

                </CardBody>
            </Card>
        );
    }


};

export default Video;