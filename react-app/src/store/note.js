const GET_NOTES = "note/GET_NOTES";
const GET_MY_NOTES = "note/GET_MY_NOTES";
const GET_NOTE_BY_ID = "note/GET_NOTE_BY_ID";
const SET_FILTERED_NOTES = "note/SET_FILTERED_NOTES";
const CREATE_NOTE = "note/CREATE_NOTE";
const EDIT_NOTE = "note/EDIT_NOTE";
const DELETE_NOTE = "note/DELETE_NOTE";

const getNotes = (notes) => ({
  type: GET_NOTES,
  payload: notes,
});

const getMyNotes = (notes) => ({
  type: GET_MY_NOTES,
  payload: notes,
});

const getNoteById = (note) => ({
  type: GET_NOTE_BY_ID,
  payload: note,
});

const setFilteredNotes = (notes) => ({
  type: SET_FILTERED_NOTES,
  payload: notes,
});

const createNote = (note) => ({
  type: CREATE_NOTE,
  payload: note,
});

const editNote = (note) => ({
  type: EDIT_NOTE,
  payload: note,
});

const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  payload: noteId,
});

export const fetchNotesThunk = () => async (dispatch) => {
  const response = await fetch("/api/notes/");
  if (response.ok) {
    const notes = await response.json();
    dispatch(getNotes(notes));
  }
};

export const fetchMyNotesThunk = () => async (dispatch) => {
  const response = await fetch("/api/notes/user");
  if (response.ok) {
    const notes = await response.json();
    dispatch(getMyNotes(notes));
  }
};

export const fetchNoteByIdThunk = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`);
  if (response.ok) {
    const note = await response.json();
    dispatch(getNoteById(note));
  }
};

export const fetchNotesByTagThunk = (tagId) => async (dispatch) => {
  const response = await fetch(`/api/notes/tag/${tagId}`);
  if (response.ok) {
    const notes = await response.json();
    dispatch(setFilteredNotes(notes));
  }
};

export const createNoteThunk = (payload) => async (dispatch) => {
  const response = await fetch("/api/notes/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const note = await response.json();
    dispatch(createNote(note));
    return note;
  }
};

export const editNoteThunk = (noteId, payload) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (response.ok) {
    const note = await response.json();
    dispatch(editNote(note));
    return note;
  }
};

export const deleteNoteThunk = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`, {
    method: "DELETE",
  });
  if (response.ok) {
    dispatch(deleteNote(noteId));
  }
};

const initialState = {
  notes: [],
  currentNote: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return { ...state, notes: action.payload };
    case GET_MY_NOTES:
      return { ...state, notes: action.payload };
    case GET_NOTE_BY_ID:
      return { ...state, currentNote: action.payload };
    case SET_FILTERED_NOTES:
      return { ...state, notes: action.payload };
    case CREATE_NOTE:
      return { ...state, notes: [...state.notes, action.payload] };
    case EDIT_NOTE:
      const updatedNotes = state.notes.map((note) =>
        note.id === action.payload.id ? action.payload : note
      );
      return { ...state, notes: updatedNotes, currentNote: action.payload };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    default:
      return state;
  }
}
