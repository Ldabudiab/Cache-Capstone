import React, { useState } from "react";
import { useHistory } from "react-router";
import { addTag } from "../../modules/tagManager";

export const AddTag = () => {
    const [tag, setTag] = useState({
        name: "",
    });

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newTag = { ...tag };
        let selectedVal = event.target.value;

        newTag[event.target.id] = selectedVal;
        // update state
        setTag(newTag);
    };

    const handleClickSaveTag = (event) => {
        event.preventDefault(); //Prevents the browser from submitting the form
        console.log(tag);
        addTag(tag).then(() => history.push("/tags"));
    };

    return (
        <form className="main-content">
            <h2 className="_title">New Tag</h2>
            <fieldset className="fieldset">
                <div className="form-group">
                    <label htmlFor="name">Tag name:</label>
                    <input
                        type="text"
                        id="name"
                        onChange={handleControlledInputChange}
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Name"
                        value={tag.name}
                    />
                </div>
            </fieldset>
            <button className="btn-add-save" onClick={handleClickSaveTag}>
                Save Tag
            </button>
            <button
                className="btn-add-edit"
                onClick={() => history.push("/tags")}
            >
                Cancel
            </button>
        </form>
    );
};
