import React, { useEffect, useState } from "react";
import VideoTag from "./VideoTag";
import { getTags } from "../../modules/tagManager";
import {
    getVideoTagsByVideoId,
    replaceTags,
    clearVideoTags,
} from "../../modules/VideoTagManager";

import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";

const ManageTags = () => {
    const { id } = useParams();

    const history = useHistory();
    const [tags, setTags] = useState([]);
    const [activeTagIds, setActiveTagIds] = useState([]);

    let isAdmin = localStorage.getItem("LoggedInUserType") == 1;
    const getAllTags = () => {
        getTags().then((tags) => setTags(tags));
    };

    useEffect(() => {
        getAllTags();
        getVideoTagsByVideoId(id).then((videoTags) => {
            setActiveTagIds(videoTags.map((vt) => vt.tagId));
        });
    }, []);

    const handleSave = () => {
        if (activeTagIds.length > 0)
            replaceTags(
                activeTagIds.map((tagId) => {
                    return { tagId: tagId, videoId: parseInt(id) };
                })
            );
        else clearVideoTags(id);
        setTimeout(() => {
            history.push(`/`);
        }, 500);
    };

    const handleTagSelected = (event) => {
        event.preventDefault();
        const newId = parseInt(event.target.id.split("--")[1]);

        const activeTagIdsCopy = [...activeTagIds];
        // set new list of tags by filtering out a tag that already exists else adding a new id to the list
        if (activeTagIdsCopy.includes(newId)) {
            setActiveTagIds([
                ...activeTagIdsCopy.filter((tag) => tag != newId),
            ]);
        } else {
            activeTagIdsCopy.push(newId);
            setActiveTagIds(activeTagIdsCopy);
        }
    };

    return (
        <div >
            <div className="tagtitle">
                <h1>Tags</h1>
            </div> 
            <div className="managetagslist">
                
                    
                        
                        
                   
                
               
                    {tags.map((videoTag) => (
                        <VideoTag
                        
                            videoTag={videoTag}
                            key={videoTag.id}
                            handleTagSelected={handleTagSelected}
                            activeTagIds={activeTagIds}
                        />
                    ))}
                
            
           
            </div>
            <div className="videotagssave">
            <Button
                color="secondary"
                className="tagssave"
                onClick={handleSave}
            >
                Save
            </Button>
            </div>
        </div>
    );
};

export default ManageTags;