import React, { useEffect, useState } from "react";
import Video from './Video';
import { getAllVideos } from "../modules/videoManager";
import "./Styling/videoList.css"
import { searchVideos } from "../modules/videoManager";
import { useHistory } from "react-router-dom";

const VideoList = () => {
    const [videos, setVideos] = useState([]);
    const [searchTerms, setSearchTerms] = useState("")
    const [filteredSearch, setFilteredSearch] = useState([])

    const history = useHistory();

    const getVideos = () => {
        getAllVideos().then(videos => setVideos(videos));
    };

    const HandleSearchInput = (event) => {
        event.preventDefault();
        setSearchTerms(event.target.value);
    };

    const handleClickSearch = (event) => {
        event.preventDefault();
        searchVideos(searchTerms)
            .then(res => {
                setVideos(res)
            })
    };

    const handleRefresh = () =>{
        
        getAllVideos().then(videos => setVideos(videos));
    }

    useEffect(() => {
        getVideos();
    }, []);


    return (
        
        <div className="vidlist">
            <div className="search-bar">
            <label>Search By Tags</label>
            <input
                className="searchinput"
                type="text"
                id="inputSearch"
                value={searchTerms}
                onChange={HandleSearchInput}
            />
            <button className="serbut" onClick={handleClickSearch}>Search</button>
            <button onClick={handleRefresh}>Refresh Filter</button>
            <>{filteredSearch.map(s => {
                return <Video key={s.id} video={s} />
            })}
            </>
        </div>
            <div className="row justify-content-center">
                {videos.map((video) => (
                <Video video={video} key={video.id} />
                     ))}
            </div>
        </div>
        
    );
};

export default VideoList