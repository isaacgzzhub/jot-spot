import React from "react";
import { useDispatch } from "react-redux";
import { deleteTagThunk } from "../../store/tag";

function DeleteTagButton({ tagId }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this tag?")) {
      dispatch(deleteTagThunk(tagId));
    }
  };

  return (
    <button onClick={handleDelete} className="delete-tag-button">
      Delete Tag
    </button>
  );
}

export default DeleteTagButton;
