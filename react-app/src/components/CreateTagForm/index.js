import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTagThunk } from "../../store/tag";

function CreateTagForm() {
  const [tagName, setTagName] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTagThunk({ tag_name: tagName }));
    setTagName("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={tagName}
        onChange={(e) => setTagName(e.target.value)}
        placeholder="Enter tag name"
      />
      <button type="submit">Create Tag</button>
    </form>
  );
}

export default CreateTagForm;
