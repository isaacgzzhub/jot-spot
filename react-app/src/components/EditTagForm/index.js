import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { editTagThunk } from "../../store/tag";

function EditTagForm({ tag, onEditDone }) {
  const [tagName, setTagName] = useState(tag.tag_name);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(editTagThunk(tag.id, { tag_name: tagName }));
    onEditDone();
  };

  return (
    <form onSubmit={handleSubmit}>
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
