import { SET_TODO_INPUT, SET_THEME, SET_EST_INPUT, ADD_TODO, SET_CURRENT_TIME, SET_VALUE_NOTE } from './constants';

export const setTodoInput = (payload) => ({
    type: SET_TODO_INPUT,
    payload,
});

export const setTheme = (payload) => ({
    type: SET_THEME,
    payload,
});

export const setEstInput = (payload) => ({
    type: SET_EST_INPUT,
    payload,
});

export const saveAddTodo = (payload) => ({
    type: ADD_TODO,
    payload,
});

export const setCurrentTime = (payload) => ({
    type: SET_CURRENT_TIME,
    payload,
});

export const setValueNote = (payload) => ({
    type: SET_VALUE_NOTE,
    payload,
});
