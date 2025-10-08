import { useDispatch, useSelector } from "react-redux";
import {
  useGetUsersQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "./adminUsersApi";
import { useEffect, useState } from "react";
import { setUsers } from "./adminUsersSlice";
import type { ApiResponse, User } from "../auth/authTypes";
import { type RootState } from "../../app/store";
import Swal from "sweetalert2";

// import components
import UserEditForm from "./userEditForm";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [openEditForm, setOpenEditForm] = useState<boolean>(false);
  const [selecteUser, setSelectedUser] = useState<User | undefined>(undefined);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const usersFromState = useSelector((state: RootState) => state.users.users);

  const {
    data: users,
    isLoading: isUsersLoading,
    error: usersError,
  } = useGetUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (users?.data) {
      dispatch(setUsers({ users: users.data }));
    }
  }, [users, dispatch]);

  const handleDelete = async (userId: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response: ApiResponse<User[] | []> =
            await deleteUser(userId).unwrap();

          if (!response.data) {
            console.error("data not found");
            return;
          }

          const updatedUsers = response.data;
          dispatch(setUsers({ users: updatedUsers }));

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          console.error(error);
        }

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const handleEdit = async (user: User) => {
    setOpenEditForm(true);
    setSelectedUser(user);
  };

  const handleOnCancel = () => {
    setOpenEditForm(false);
    setSelectedUser(undefined);
  };

  const handleOnSubmit = async (data: Partial<User>) => {
    // console.log("selected user:", selecteUser);
    const user = {
      ...selecteUser,
      name: data.name,
      role: data.role,
    };

    // console.log("updated user:", user);
    try {
      const response = await updateUser(user).unwrap();
      const updatedUsers = response.data || [];

      console.log("server response:", response);
      dispatch(setUsers({ users: updatedUsers }));
      handleOnCancel();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error);
    }
  };

  if (isUsersLoading) {
    return <>Loading...</>;
  }

  if (usersError) {
    console.error(usersError);
    return <>Error loading data</>;
  }

  if (openEditForm) {
    return (
      <>
        <UserEditForm
          user={selecteUser}
          onCancel={handleOnCancel}
          onSubmit={handleOnSubmit}
        />
      </>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="mb-6 text-3xl font-bold text-gray-800">Admin Dashboard</h1>
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <div className="p-4">
          <h2 className="mb-4 text-xl font-semibold text-gray-700">
            User Management
          </h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Role
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {usersFromState.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {user.email || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                    {user.role || "User"}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                    <button
                      onClick={() => handleEdit(user)}
                      className="mr-4 cursor-pointer text-green-600 hover:text-green-800"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="cursor-pointer text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
