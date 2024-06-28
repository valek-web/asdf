import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  login: null,
  email: null,
  surname: null,
  name: null,
  patronymic: null,
  form_education: null,
  is_teacher: null,
  speciality: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.login = action.payload.login;
      state.email = action.payload.email;
      state.surname = action.payload.surname;
      state.name = action.payload.name;
      state.patronymic = action.payload.patronymic;
      state.form_education = action.payload.form_education;
      state.is_teacher = action.payload.is_teacher;
      state.speciality = action.payload.speciality;
    },
    removeUser(state) {
      state.login = null;
      state.email = null;
      state.surname = null;
      state.name = null;
      state.patronymic = null;
      state.form_education = null;
      state.is_teacher = null;
      state.speciality = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
