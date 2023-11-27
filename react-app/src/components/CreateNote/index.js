import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNoteThunk } from "../../store/note";
import { fetchTagsThunk } from "../../store/tag";
import "./CreateNote.css";

function CreateNote() {
  const dispatch = useDispatch();
  const history = useHistory();
  const tags = useSelector((state) => state.tags.tags);
  const [selectedTags, setSelectedTags] = useState([]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchTagsThunk());
  }, [dispatch]);

  const handleTagSelect = (tagId) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tagId)
        ? prevSelectedTags.filter((id) => id !== tagId)
        : [...prevSelectedTags, tagId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      title,
      content,
      tagIds: selectedTags,
    };

    const res = await dispatch(createNoteThunk(payload));

    if (res && res.errors) {
      setErrors(res.errors);
    } else {
      history.push("/notes");
    }
  };

  return (
    <div className="create-note-container">
      <form className="create-note-form" onSubmit={handleSubmit}>
        <h1>Create A New Note</h1>

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
          Create Note
        </button>
      </form>
    </div>
  );
}

export default CreateNote;
