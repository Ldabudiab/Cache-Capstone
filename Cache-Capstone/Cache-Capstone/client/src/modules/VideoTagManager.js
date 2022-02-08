const baseUrl = "/api/videoTag";

export const getAllVideoTags = () => {
    return fetch(baseUrl).then((res) => res.json());
};

export const addVideoTag = (video) => {
    return fetch(baseUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(video),
    });
};

export const getVideoTag = (VideoTagId) => {
    return fetch(`${baseUrl}/${VideoTagId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => res.json());
};

export const getVideoTagsByVideoId = (videoId) => {
    return fetch(baseUrl + `/GetVideoTags/${videoId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((resp) => resp.json());
};

export const replaceTags = (videoTags) => {
    return fetch(baseUrl + `/ClearVideoTags/${videoTags[0].videoId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    }).then(() => {
        videoTags.forEach((videoTag) => {
            addVideoTag(videoTag);
        });
    });
};

export const clearVideoTags = (videoId) => {
    return fetch(baseUrl + `/ClearVideoTags/${videoId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
};
