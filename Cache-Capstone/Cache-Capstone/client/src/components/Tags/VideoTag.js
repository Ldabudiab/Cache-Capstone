import React from "react";
import { Button } from "reactstrap";
import { useState, useEffect } from "react";

const VideoTag = ({ videoTag, handleTagSelected, activeTagIds }) => {
    const [isTaggedToVideo, setIsTaggedToVideo] = useState(false);

    useEffect(() => {
        setIsTaggedToVideo(
            activeTagIds.length > 0 && activeTagIds.includes(videoTag.id)
        );
    }, [activeTagIds]);

    return (
        <div>
            <p>{videoTag.name}</p>
            <Button
                id={`manageTags--${videoTag.id}`}
                onClick={handleTagSelected}
                color={isTaggedToVideo ? "danger" : "primary"}
            >
                {isTaggedToVideo ? "Remove" : "Add Tag"}
            </Button>
        </div>
    );
};

export default VideoTag;
