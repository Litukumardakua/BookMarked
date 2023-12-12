import {
  FETCH_USERS_REQUEST,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAILURE,
  TOGGLE_BOOKMARK,
  GO_TO_PREVIOUS_PAGE
} from "../action/Actions.js";

const initialState = {
  loading: false,
  users: [],
  error: "",
  isAtStart: true,
  currentPage: 1,
  totalPages: 1,
};

const usersReducer = (state = initialState, action) => {
  console.log("check state", state.users);
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_USERS_SUCCESS:
      const updatedUsers = [...state.users];
      action.payload.forEach((newUser) => {
        const existingIndex = updatedUsers.findIndex(
          (user) => user.id === newUser.id
        );
        if (existingIndex > -1) {
          // Merge the new user data and preserve the 'bookmarked' property of the old user
          updatedUsers[existingIndex] = {
            ...newUser,
            bookmarked: updatedUsers[existingIndex].bookmarked,
          };
        } else {
          updatedUsers.push(newUser);
        }
      });
      return {
        ...state,
        loading: false,
        isAtStart: false,
        users: updatedUsers,
        currentPage: state.currentPage + 1,
        totalPages: 2,
      };
    case GO_TO_PREVIOUS_PAGE:
      return {
        ...state,
        currentPage: state.currentPage - 1,
        isAtStart: state.currentPage - 1 === 1,
      };
    case FETCH_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case TOGGLE_BOOKMARK:
      const userId = action.payload;
      const bookmarkedUsers = state.users.map((user) =>
        user.id === userId ? { ...user, bookmarked: !user.bookmarked } : user
      );
      return {
        ...state,
        users: bookmarkedUsers,
      };
    default:
      return state;
  }
};

export default usersReducer;
