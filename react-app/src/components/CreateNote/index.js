import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createNoteThunk } from "../../store/note";

function CreateNote() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);

    const payload = {
      title,
      content,
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

        <button type="submit" disabled={!title || !content}>
          Create Note
        </button>
      </form>
    </div>
  );
}

export default CreateNote;
