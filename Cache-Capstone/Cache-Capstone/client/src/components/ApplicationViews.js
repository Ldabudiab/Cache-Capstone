import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import SearchBar from "./Search";
import Login from "./Login";
import Register from "./Register";
import VideoList from "./VideoList";
import VideoForm from "./VideoForm";
import { TagList } from "./Tags/TagList";
import TagForm from "./Tags/TagForm";
import { AddTag } from "./Tags/AddTag";
import DeleteTag from "./Tags/DeleteTags";
import EditTag from "./Tags/EditTags";
import ManageTags from "./Tags/ManageTags";
import DeleteVideo from "./DeleteVideo";

const ApplicationViews = ({ isLoggedIn }) => {

   

    return (
        <Switch>

            <Route path="/" exact>
                {/* {isLoggedIn ? <SearchBar /> : <Redirect to="/login" />} */}
                {isLoggedIn ? <VideoList /> : <Redirect to="/login" />}
            </Route>
            <Route path="/taglist">
                <TagList />
            </Route>
            <Route path="/manageTags/:id">
                    <ManageTags userparams />
            </Route>
            <Route path="/deleteTag/:id">
                    <DeleteTag userparams />
            </Route>
            <Route path="/addTag">
                    <AddTag />
            </Route>
            <Route path="/editTag/:id">
                    <EditTag userparams />
            </Route>
            <Route path="/tagform">
                <TagForm />
            </Route>
            <Route path="/videoform">
                <VideoForm />
            </Route>
            <Route path="/deletevideo/:id">
                <DeleteVideo />
            </Route>
            <Route path="/login">
                <Login />
            </Route>

            <Route path="/register">
                <Register />
            </Route>
        </Switch>
    );
};

export default ApplicationViews;