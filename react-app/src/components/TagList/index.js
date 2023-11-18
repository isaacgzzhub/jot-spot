import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { fetchTagsThunk } from "../../store/tag";
import Tag from "../Tag";
import "./TagList.css";

function TagList() {
  const dispatch = useDispatch();
  const history = useHistory();
  const tags = useSelector((state) => state.tags.tags);

  useEffect(() => {
    dispatch(fetchTagsThunk());
  }, [dispatch]);

  const handleAddTagClick = () => {
    history.push("/create-tag");
  };

  return (
    <div className="tag-list">
      <button className="add-tag-button" onClick={handleAddTagClick}>
        + Add Tag
      </button>
      <h2>Tags</h2>
      {tags.map((tag) => (
        <Tag key={tag.id} tag={tag} />
      ))}
    </div>
  );
}

export default TagList;
