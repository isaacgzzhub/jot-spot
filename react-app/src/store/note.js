// constants
const GET_NOTES = "note/GET_NOTES";
const GET_NOTE_BY_ID = "note/GET_NOTE_BY_ID";
const CREATE_NOTE = "note/CREATE_NOTE";
const EDIT_NOTE = "note/EDIT_NOTE";
const DELETE_NOTE = "note/DELETE_NOTE";

// action creators
const getNotes = (notes) => ({
  type: GET_NOTES,
  payload: notes,
});

const getNoteById = (note) => ({
  type: GET_NOTE_BY_ID,
  payload: note,
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

// thunks
export const fetchNotesThunk = () => async (dispatch) => {
  const response = await fetch("/api/notes/");
  if (response.ok) {
    const notes = await response.json();
    dispatch(getNotes(notes));
  }
};

export const fetchNoteByIdThunk = (noteId) => async (dispatch) => {
  const response = await fetch(`/api/notes/${noteId}`);
  if (response.ok) {
    const note = await response.json();
    dispatch(getNoteById(note));
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

// initial state
const initialState = {
  notes: [],
  currentNote: null,
};

// reducer
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_NOTES:
      return { ...state, notes: action.payload };
    case GET_NOTE_BY_ID:
      return { ...state, currentNote: action.payload };
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
