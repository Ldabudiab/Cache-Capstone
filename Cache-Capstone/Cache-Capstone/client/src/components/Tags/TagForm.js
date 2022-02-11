import React, { useState } from "react";
import { addTag, updateTag } from "../../modules/tagManager";
import { useHistory, useParams } from "react-router-dom";
import { Container } from "reactstrap"
import { getTagById } from "../../modules/tagManager";

const TagForm = () => {

    const [tag, setTag] = useState({
        name: "",
    })

    const tagId = useParams();

    if (tagId.id && tag.name === "") {
        getTagById(tagId.id)
            .then(tag => setTag(tag));
    }

    const handleInput = (event) => {
        const newTag = { ...tag };
        newTag[event.target.id] = event.target.value;
        setTag(newTag);
    }

    const handleCreateTag = () => {
        addTag(tag)

            .then(history.push("/taglist"))
    }

    const handleClickUpdateTag = () => {
        updateTag(tag)
            .then(history.push("/taglist"))
    }

    const handleClickCancel = () => {
        history.push("/taglist")
    }

    const history = useHistory();

    return (
        <Container>
            <div className="tagForm">
                <h3> Tag</h3>
                <div className="createtagform">
                    <div className="form-group">
                        <label for="name">Name</label>
                        <input type="name" class="form-control" id="name" placeholder="name" value={tag.name} onChange={handleInput} required />
                    </div>
                    {tagId.id ?
                        <div>
                            <button type="submit" onClick={event => {
                                handleClickUpdateTag()
                            }}>Update</button>

                            <button type="cancel" onClick={event => {
                                handleClickCancel()
                            }}>Cancel</button>

                        </div>
                        :
                        <button className="creattagbtn" type="submit" onClick={event => {
                            handleCreateTag()
                        }}>Create</button>
                    }
                </div>
            </div>
        </Container>
    )
}

export default TagForm;