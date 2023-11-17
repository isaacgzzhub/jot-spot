const GET_TAGS = "tag/GET_TAGS";
const CREATE_TAG = "tag/CREATE_TAG";
const EDIT_TAG = "tag/EDIT_TAG";
const DELETE_TAG = "tag/DELETE_TAG";

const getTags = (tags) => ({
  type: GET_TAGS,
  payload: tags,
});

const createTag = (tag) => ({
  type: CREATE_TAG,
  payload: tag,
});

const editTag = (tag) => ({
  type: EDIT_TAG,
  payload: tag,
});

const deleteTag = (tagId) => ({
  type: DELETE_TAG,
  payload: tagId,
});

export const fetchTagsThunk = () => async (dispatch) => {
  const response = await fetch("/api/tags/");
  if (response.ok) {
    const tags = await response.json();
    dispatch(getTags(tags));
  }
};

export const createTagThunk = (payload) => async (dispatch) => {
  const response = await fetch("/api/tags/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const tag = await response.json();
    dispatch(createTag(tag));
    return tag;
  }
};

export const editTagThunk = (tagId, payload) => async (dispatch) => {
  const response = await fetch(`/api/tags/${tagId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const tag = await response.json();
    dispatch(editTag(tag));
    return tag;
  }
};

export const deleteTagThunk = (tagId) => async (dispatch) => {
  const response = await fetch(`/api/tags/${tagId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteTag(tagId));
  }
};

const initialState = {
  tags: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_TAGS:
      return { ...state, tags: action.payload };
    case CREATE_TAG:
      return { ...state, tags: [...state.tags, action.payload] };
    case EDIT_TAG:
      const updatedTags = state.tags.map((tag) =>
        tag.id === action.payload.id ? action.payload : tag
      );
      return { ...state, tags: updatedTags };
    case DELETE_TAG:
      return {
        ...state,
        tags: state.tags.filter((tag) => tag.id !== action.payload),
      };
    default:
      return state;
  }
}
