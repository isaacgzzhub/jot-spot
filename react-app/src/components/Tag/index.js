import React from "react";
import EditTagForm from "../EditTagForm";
import DeleteTagButton from "../DeleteTagButton";

function Tag({ tag, onEdit }) {
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEdit = () => {
    setIsEditing(true);
    if (onEdit) onEdit(tag.id);
  };

  const handleEditDone = () => {
    setIsEditing(false);
  };

  return (
    <div className="tag">
      {isEditing ? (
        <EditTagForm tag={tag} onEditDone={handleEditDone} />
      ) : (
        <>
          <span className="tag-name">{tag.tag_name}</span>
          <button onClick={handleEdit} className="edit-tag-button">
            Edit
          </button>
          <DeleteTagButton tagId={tag.id} />
        </>
      )}
    </div>
  );
}

export default Tag;
