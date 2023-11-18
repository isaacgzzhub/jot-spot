import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchNotesThunk, fetchNotesByTagThunk } from "../../store/note";
import { fetchTagsThunk } from "../../store/tag";
import NoteItem from "../NoteItem";
import "./NotesList.css";

function NotesList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [selectedTag, setSelectedTag] = useState(null);

  useEffect(() => {
    dispatch(fetchNotesThunk());
    dispatch(fetchTagsThunk());
  }, [dispatch]);

  const notes = useSelector((state) => state.note.notes);
  const tags = useSelector((state) => state.tags.tags);

  useEffect(() => {
    if (selectedTag) {
      dispatch(fetchNotesByTagThunk(selectedTag));
    } else {
      dispatch(fetchNotesThunk());
    }
  }, [selectedTag, dispatch]);

  const handleTagClick = (tagId) => {
    setSelectedTag(tagId);
  };

  const handleAddNoteClick = () => {
    history.push("/create-note");
  };

  const handleTagsClick = () => {
    history.push("/tags");
  };

  return (
    <div className="notes-page-container">
      <div className="tags-sidebar">
        <button className="add-tag-button" onClick={handleTagsClick}>
          Tags
        </button>
        <div className="notes-button">Notes</div>
        <div className="my-notes-button">My Notes</div>
        {tags.map((tag) => (
          <div
            key={tag.id}
            className={`tag-item ${selectedTag === tag.id ? "selected" : ""}`}
            onClick={() => handleTagClick(tag.id)}
          >
            {tag.tag_name}
          </div>
        ))}
      </div>
      <div className="notes-list-container">
        <h2 className="notes-list-title">Your Notes</h2>
        <div className="notes-container">
          {notes?.map((note) => (
            <NoteItem key={note.id} note={note} />
          ))}
        </div>
      </div>
      <button className="add-note-button" onClick={handleAddNoteClick}>
        +
      </button>
    </div>
  );
}

export default NotesList;
