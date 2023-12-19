import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editNoteThunk, fetchNoteByIdThunk } from "../../store/note";
import { fetchTagsThunk } from "../../store/tag";
import "./EditNote.css";

function EditNote() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { noteId } = useParams();
  const note = useSelector((state) => state.note.currentNote);
  const tags = useSelector((state) => state.tags.tags);
  const [selectedTags, setSelectedTags] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchAndSetNoteData = async () => {
      if (!note) {
        const action = dispatch(fetchNoteByIdThunk(noteId));
        if (action.payload) {
          setTitle(action.payload.title);
          setContent(action.payload.content);
          if (
            action.payload.note_tags &&
            Array.isArray(action.payload.note_tags)
          ) {
            setSelectedTags(
              action.payload.note_tags.map((note_tag) => note_tag.tag_id)
            );
          }
        }
      } else {
        setTitle(note.title);
        setContent(note.content);
        if (note.note_tags && Array.isArray(note.note_tags)) {
          setSelectedTags(note.note_tags.map((note_tag) => note_tag.tag_id));
        }
      }
    };

    fetchAndSetNoteData();
    dispatch(fetchTagsThunk());
  }, [dispatch, noteId, note]);

  const handleTagSelect = (tagId) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tagId)
        ? prevSelectedTags.filter((id) => id !== tagId)
        : [...prevSelectedTags, tagId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      title,
      content,
      tagIds: selectedTags,
    };

    const res = await dispatch(editNoteThunk(noteId, payload));

    if (res && res.errors) {
      setErrors(res.errors);
    } else {
      history.push(`/`);
    }
  };

  return (
    <div className="edit-note-container">
      {" "}
      <form className="edit-note-form" onSubmit={handleSubmit}>
        <h1>Edit Note</h1>

        <label>
          Title
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          {errors.title && <p className="error-message">{errors.title}</p>}
        </label>

        <label>
          Content
          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          {errors.content && <p className="error-message">{errors.content}</p>}
        </label>

        <div className="tag-buttons-container">
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleTagSelect(tag.id)}
              className={`tag-button ${
                selectedTags.includes(tag.id) ? "selected" : ""
              }`}
            >
              {tag.tag_name}
            </button>
          ))}
        </div>

        <button type="submit" disabled={!title || !content}>
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditNote;
