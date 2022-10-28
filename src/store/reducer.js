import { SET_TODO_INPUT, SET_THEME, SET_EST_INPUT, ADD_TODO, SET_CURRENT_TIME } from './constants';
const initState = {
    todos: [
        { active1: true, id: 1, title: 'Listen to music', numAct: 0, estPomo: 1, note: '', project: {}, taskDone: 0 },
        {
            active1: false,
            id: 2,
            title: 'Playing games',
            taskDone: 0,
            numAct: 0,
            estPomo: 2,
            note: 'Hom nay code nhieu roi!',
            project: {},
        },
        {
            active1: false,
            id: 3,
            title: 'Reading books',
            taskDone: 0,
            numAct: 0,
            estPomo: 3,
            note: 'Hom nay code nhieu roi!',
            project: {},
        },
    ],
    todoInput: '',
    estPomo: 1,
    note: '',
    project: '',
    numAct: 0,
    themes: ['pomo', 'short', 'long'],
    currentTheme: 'pomo',
    pomodoro: 25,
    shorBreak: 5,
    longBreak: 15,
    currentTime: 25,
    //blog:
    blogs: [
        { id: 1, Heading: 'h1', headContent: 'An online Pomodoro Timer to boost your productivity' },
        {
            id: 2,
            headContent: 'What is Pomofocus?',
            contentP:
                'Pomofocus is a customizable pomodoro timer that works on desktop & mobile browser. The aim of this app is to help you focus on any task you are working on, such as study, writing, or coding. This app is inspired by Pomodoro Technique which is a time management method developed by Francesco Cirillo.',
        },
        {
            id: 3,
            headContent: 'How to use the Pomodoro Timer?',
            TagContent: 'ol',
            isOl: true,
            contentList: [
                'Add tasks to work on today',
                'Set estimate pomodoros (1 = 25min of work) for each tasks',
                'Select a task to work on',
                'Start timer and focus on the task for 25 minutes',
                'Take a break for 5 minutes when the alarm ring',
                'Iterate 3-5 until you finish the tasks',
            ],
        },
        {
            id: 4,
            headContent: 'Features',
            TagContent: 'ul',
            isOl: false,
            contentList: [
                'Add tasks to work on today',
                'Set estimate pomodoros (1 = 25min of work) for each tasks',
                'Select a task to work on',
                'Start timer and focus on the task for 25 minutes',
                'Take a break for 5 minutes when the alarm ring',
                'Iterate 3-5 until you finish the tasks',
            ],
        },
    ],
};

function reducer(state, action) {
    switch (action.type) {
        case SET_THEME:
            return {
                ...state,
                currentTheme: action.payload,
            };
        case SET_TODO_INPUT:
            return {
                ...state,
                todoInput: action.payload,
            };
        case SET_EST_INPUT:
            return {
                ...state,
                estPomo: action.payload,
            };
        case ADD_TODO:
            return {
                ...state,
                todos: [
                    ...state.todos,
                    {
                        id: Math.floor(Math.random() * 1001),
                        numAct: 0,
                        note: '',
                        project: '',
                        title: action.payload.todoInput,
                        estPomo: action.payload.estPomodo,
                    },
                ],
            };
        case SET_CURRENT_TIME:
            return {
                ...state,
                currentTime: action.payload,
            };
        default:
            throw new Error('Invalid action');
    }
}

export { initState };
export default reducer;
