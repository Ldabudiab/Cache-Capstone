import React, { useState } from "react";
import { useHistory } from "react-router";
import { deleteTag, getTagById } from "../../modules/tagManager";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const DeleteTag = () => {
    const [tag, setTag] = useState({
        name: "",
    });
    const { id } = useParams();

    const history = useHistory();
    console.log(id , "which id this is");
    useEffect(() => {
        getTagById(id).then((res) => {
            setTag(res);
        });
    }, []);

    const handleConfirm = (event) => {
        event.preventDefault();

        deleteTag(id).then(() => history.push("/taglist"));
    };

    return (
        <form className="deletetagform">
            <h2 className="_title">Delete Tag</h2>
            <p className="areusuredel">Are you sure you want to delete {tag.name}?</p>
            <div className="deltagbuttons">
            <button
                className="edisub"
                variant="danger"
                onClick={handleConfirm}
            >
                Delete
            </button>
            <button
                className="edican"
                variant="secondary"
                onClick={() => history.push("/taglist")}
            >
                Cancel
            </button>
            </div>
          
        </form>
    );
};

export default DeleteTag;
