import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createTagThunk } from "../../store/tag";

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
