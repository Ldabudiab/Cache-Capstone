import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import "../Styling/tags.css"
const Tag = ({ tag }) => {
    const history = useHistory();

    const handleDelete = () => {
        history.push(`/deleteTag/${tag.id}`);
    };
    const handleEdit = () => {
        history.push(`/editTag/${tag.id}`);
    };

    return (
        <div className="Tagcard">
            <p className="tagname" scope="row">{tag.name}</p>
            <div>
                <Button className="edittagcard"  onClick={handleEdit}>
                    edit
                </Button>
                <Button className="edittagcard"  onClick={handleDelete}>
                    delete
                </Button>
            </div>
        </div>
    );
};

export default Tag;