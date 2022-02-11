import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { getTags } from "../../modules/tagManager";
import Tag from "./Tag";
import { Row, Col } from "reactstrap"

export const TagList = () => {

    const [tags, setTags] = useState([])

    const history = useHistory();
    
    const getAllTags = () => {
        getTags().then(tags => setTags(tags));
    };

    useEffect(() => {
        getAllTags()
    }, []);

    const handleClickTagForm = () => {
        history.push("/tagform")
    }
    console.log(tags)
    return (
        <div className="taglist">
                <div className="tagtitle">
                    <h1>Tags</h1>
                </div> 
                <div className="taglisttags">
                    {tags.map((tag) => (
                        <Tag tag={tag} key={tag.Id} setTags={setTags} />
                    ))}
                </div>
                <div className="createtbtn">
                <button className="createtag" onClick={handleClickTagForm}>Create a Tag </button>
                </div>
        </div>
    );
}