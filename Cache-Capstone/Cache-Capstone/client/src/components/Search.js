// import React, { useEffect, useState } from "react";
// import Video from "./Video";
// import { searchVideos } from "../modules/videoManager";
// import "./Styling/videoList.css"

// const SearchBar = () => {
//     const [searchTerms, setSearchTerms] = useState("")
//     const [filteredSearch, setFilteredSearch] = useState([])

//     const HandleSearchInput = (event) => {
//         event.preventDefault();
//         setSearchTerms(event.target.value);
//     };

//     const handleClickSearch = (event) => {
//         event.preventDefault();
//         searchVideos(searchTerms)
//             .then(res => {
//                 setFilteredSearch(res)
//             })
//     };



//     return (
//         <div className="search-bar">
//             <label>Search By Tags</label>
//             <input
//                 className="searchinput"
//                 type="text"
//                 id="inputSearch"
//                 value={searchTerms}
//                 onChange={HandleSearchInput}
//             />
//             <button className="serbut" onClick={handleClickSearch}>Search</button>

//             <>{filteredSearch.map(s => {
//                 return <Video key={s.id} video={s} />
//             })}
//             </>
//         </div>)

// }

// export default SearchBar;