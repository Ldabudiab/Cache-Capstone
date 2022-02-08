import React, { useState, } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { addVideo } from "../modules/videoManager";


const VideoForm = ({ getVideos }) => {
    const emptyVideo = {
        title: '',
        description: '',
        url: ''
    };

    const history = useHistory();

    const [video, setVideo] = useState(emptyVideo);
   
    const [loading, setLoading] = useState(false);

    const handleInputChange = (evt) => {
        const value = evt.target.value;
        const key = evt.target.id;

        const videoCopy = { ...video };

        videoCopy[key] = value;
        setVideo(videoCopy);
    };

    const uploadVideo = async (e) => {
       
        const files = e.target.files;
        const data = new FormData()
        data.append("file", files[0])
        data.append("upload_preset", "nfyot9vo")

       
        const res = await  fetch(
            "https://api.cloudinary.com/v1_1/dzzvsnjjc/video/upload",
            {
              method: "POST",
              body: data,
            }
          );
        const file = await res.json();
        setVideo({...video, url:file.secure_url})
        setLoading(false);
    };

    const handleSave = (evt) => {
        evt.preventDefault();
       
        addVideo(video).then((p) => {
            // Navigate the user back to the home route
            history.push("/");
        });
    };

    return (
        <Form>
            <FormGroup>
                <Label for="title">Title</Label>
                <Input type="text" name="title" id="title" placeholder="video title"
                    value={video.title}
                    onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <label className="labels" htmlFor="img">Video: </label>
                <input type="file" name="file" onChange={(event)=> {uploadVideo(event);}} required autoFocus className="form-control" />
            </FormGroup>
            <FormGroup>
                <Label for="description">Description</Label>
                <Input type="textarea" name="description" id="description"
                    value={video.description}
                    onChange={handleInputChange} />
            </FormGroup>
            <Button className="btn btn-primary" onClick={handleSave}>Submit</Button>
            
        </Form>
        
    );
};

export default VideoForm;