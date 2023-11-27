import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTagThunk } from "../../store/tag";
import "./CreateTagForm.css";

function CreateTagForm() {
  const [tagName, setTagName] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createTagThunk({ tag_name: tagName }));
    setTagName("");
    history.push("/");
  };

  return (
    <form onSubmit={handleSubmit} className="create-tag-form">
      <input
        type="text"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        placeholder="Enter tag name"
        className="create-tag-input"
      />
      <button type="submit" className="create-tag-button">
        Create Tag
      </button>
    </form>
  );
}

export default CreateTagForm;
