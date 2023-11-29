import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { editTagThunk } from "../../store/tag";
import "./EditTagForm.css";

function EditTagForm({ tag, onEditDone }) {
  const [tagName, setTagName] = useState(tag.tag_name);
  const dispatch = useDispatch();
  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        onEditDone();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onEditDone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editTagThunk(tag.id, { tag_name: tagName }));
    onEditDone();
  };

  return (
    <form onSubmit={handleSubmit} ref={formRef} className="edit-tag-form">
      <input
        type="text"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        placeholder="Edit tag name"
      />
      <button type="submit">Save Changes</button>
    </form>
  );
}

export default EditTagForm;
