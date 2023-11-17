import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import NotesList from "./components/NotesList";
import NoteDetail from "./components/NoteDetail";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";
import TagList from "./components/TagList";
import CreateTagForm from "./components/CreateTagForm";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route path="/login">
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route exact path="/notes">
            <NotesList />
          </Route>
          <Route exact path="/notes/:noteId">
            <NoteDetail />
          </Route>
          <Route path="/create-note">
            <CreateNote />
          </Route>
          <Route path="/edit-note/:noteId">
            <EditNote />
          </Route>
          <Route exact path="/tags">
            <TagList />
          </Route>
          <Route path="/create-tag">
            <CreateTagForm />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
