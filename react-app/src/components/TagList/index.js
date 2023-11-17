import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTagsThunk } from "../../store/tag";
import Tag from "../Tag";

function TagList() {
  const dispatch = useDispatch();
  const tags = useSelector((state) => state.tags.tags);

  useEffect(() => {
    dispatch(fetchTagsThunk());
  }, [dispatch]);

  return (
    <div className="tag-list">
      <h2>Tags</h2>
      {tags.map((tag) => (
        <Tag key={tag.id} tag={tag} />
      ))}
    </div>
  );
}

export default TagList;
