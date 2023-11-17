import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { editNoteThunk, fetchNoteByIdThunk } from "../../store/note";

function EditNote() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { noteId } = useParams();
  const note = useSelector((state) => state.note.currentNote);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(fetchNoteByIdThunk(noteId)).then(() => {
      if (note) {
        setTitle(note.title);
        setContent(note.content);
      }
    });
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const payload = {
      id: noteId,
      title,
      content,
    };

    const res = await dispatch(editNoteThunk(noteId, payload));

    if (res && res.errors) {
      setErrors(res.errors);
    } else {
      history.push(`/notes/${noteId}`);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <h1>Edit Note</h1>

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
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditNote;
