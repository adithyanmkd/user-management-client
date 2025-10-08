import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { type User } from "../../shared/types";

interface UsersState {
  users: User[] | [];
}

const initialState: UsersState = {
  users: [],
};

const setUsersFunc = (
  state: UsersState,
  action: PayloadAction<{ users: User[] | [] }>,
) => {
  state.users = action.payload.users;
};

const adminUsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: setUsersFunc,
  },
});

export const { setUsers } = adminUsersSlice.actions;
export default adminUsersSlice.reducer;
