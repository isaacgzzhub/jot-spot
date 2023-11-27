import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNoteThunk } from "../../store/note";
import { fetchTagsThunk } from "../../store/tag";

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
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Create A New Note</h1>

        <label>
          Title
          <p style={{ color: "red", fontSize: 11 }}>{errors.title}</p>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Content
          <p style={{ color: "red", fontSize: 11 }}>{errors.content}</p>
          <textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </label>

        <div>
          {tags.map((tag) => (
            <button
              key={tag.id}
              type="button"
              onClick={() => handleTagSelect(tag.id)}
              className={selectedTags.includes(tag.id) ? "selected" : ""}
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
