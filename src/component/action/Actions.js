import axios from 'axios';

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const TOGGLE_BOOKMARK = 'TOGGLE_BOOKMARK';
export const GO_TO_PREVIOUS_PAGE = 'GO_TO_PREVIOUS_PAGE';

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

export const toggleBookmark = (userId) => ({
  type: TOGGLE_BOOKMARK,
  payload: userId,
});

export const goToPreviousPage = () => ({
  type: GO_TO_PREVIOUS_PAGE,
});

export const fetchGitHubUsers = (page) => {
  return (dispatch) => {
    const perPage = 30;
    const apiUrl = `https://api.github.com/users?per_page=${perPage}&page=${page}`;

    dispatch(fetchUsersRequest());
    axios
      .get(apiUrl)
      .then((response) => {
        const users = response.data;
        dispatch(fetchUsersSuccess(users));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(fetchUsersFailure(errorMessage));
      });
  };
};
