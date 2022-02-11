import React from "react";
import { Card, CardBody, Button } from "reactstrap";
import { useHistory } from "react-router-dom";
import { deleteVideoById } from "../modules/videoManager";
import { useParams } from "react-router-dom";


const DeleteVideo = () => {

    const history = useHistory();
    const { id } = useParams();
    console.log(id)
    const handleCancel = () => {
        history.push("/")
    }

    const handleDelete = () => {
        deleteVideoById(id).then(() => history.push("/"))
    }

    return (
        <Card>
            <CardBody>
                <p className="aredelete">Are you sure you want to delete this video? </p>
                <br></br>
                <Button className="delbtnscan" onClick={handleCancel}>Cancel</Button>
                <Button className="delbtns" onClick={handleDelete}>Delete</Button>
            </CardBody>
        </Card >
    );
};

export default DeleteVideo;
