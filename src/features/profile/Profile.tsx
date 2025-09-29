import { useState, type ChangeEvent } from "react";
import { Edit3, Save, X, Eye, EyeOff, User, Camera, Check } from "lucide-react";
import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

import { useChangeNameMutation, useChangePasswordMutation } from "./profileApi";

const ProfileCard = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const [changeName] = useChangeNameMutation();
  const [changePassword, { error }] = useChangePasswordMutation();
  const userDetails = {
    name: user?.name,
    avatar: user?.avatar,
    email: user?.email,
    password: user?.password,
  };

  const [profile, setProfile] = useState(userDetails);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Edit states for individual fields
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingPassword, setIsEditingPassword] = useState(false);

  // Form states
  const [editedName, setEditedName] = useState(profile.name);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Password visibility states
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Error states
  const [passwordError, setPasswordError] = useState("");

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Name editing handlers
  const handleEditName = () => {
    setIsEditingName(true);
    setEditedName(profile.name);
  };

  const handleSaveName = () => {
    const updatedUser = { ...profile, name: editedName };
    setProfile(updatedUser);
    changeName({ name: editedName });
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setIsEditingName(false);
  };

  const handleCancelName = () => {
    setEditedName(profile.name);
    setIsEditingName(false);
  };

  // Password editing handlers
  const handleEditPassword = () => {
    setIsEditingPassword(true);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError("");
  };

  const handleSavePassword = async () => {
    // Validate new password
    if (passwordForm.newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }

    // Validate password confirmation
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }

    // Save new password
    const passwords = {
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
    };

    try {
      await changePassword(passwords).unwrap();
      setProfile({ ...profile, password: passwordForm.newPassword });
      setIsEditingPassword(false);
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordError("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err?.data?.message);
      setPasswordError(err?.data?.message || "Something went wrong");
    }
  };

  const handleCancelPassword = () => {
    setIsEditingPassword(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setPasswordError("");
  };

  return (
    <div className="mx-auto mt-8 max-w-md overflow-hidden rounded-2xl bg-white shadow-xl">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
        <div className="flex items-start justify-between">
          <h2 className="text-xl font-bold">Profile</h2>
        </div>
      </div>

      {/* Profile Content */}
      <div className="p-6">
        {/* Profile Picture */}
        <div className="-mt-16 mb-6 flex justify-center">
          <div className="relative">
            <div className="h-24 w-24 overflow-hidden rounded-full border-4 border-white bg-gray-200 shadow-lg">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Profile"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-300 to-gray-400">
                  <User size={32} className="text-gray-600" />
                </div>
              )}
            </div>
            <label className="absolute right-0 bottom-0 cursor-pointer rounded-full bg-blue-500 p-2 transition-colors hover:bg-blue-600">
              <Camera size={14} className="text-white" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Profile Fields */}
        <div className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Full Name
            </label>
            {isEditingName ? (
              <div className="space-y-3">
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <div className="flex gap-2">
                  <button
                    onClick={handleSaveName}
                    className="flex items-center gap-2 rounded-lg bg-green-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={handleCancelName}
                    className="flex items-center gap-2 rounded-lg bg-gray-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-600"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span className="font-medium text-gray-900">
                  {profile.name}
                </span>
                <button
                  onClick={handleEditName}
                  className="rounded-md bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
                >
                  <Edit3 size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Email Field (Read-only) */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
              <span className="font-medium text-gray-900">{profile.email}</span>
              <div className="flex items-center text-green-600">
                <Check size={16} />
              </div>
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              Password
            </label>
            {isEditingPassword ? (
              <div className="space-y-3">
                {/* Current Password */}
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Enter current password"
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 transition-colors hover:text-gray-700"
                  >
                    {showCurrentPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {/* New Password */}
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 transition-colors hover:text-gray-700"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-500 transition-colors hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>

                {/* Error Message */}
                {passwordError && (
                  <p className="text-sm text-red-600">{passwordError}</p>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <button
                    onClick={handleSavePassword}
                    className="flex items-center gap-2 rounded-lg bg-green-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-green-600"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={handleCancelPassword}
                    className="flex items-center gap-2 rounded-lg bg-gray-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-gray-600"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
                <span className="font-medium text-gray-900">••••••••••</span>
                <button
                  onClick={handleEditPassword}
                  className="rounded-md bg-blue-500 p-2 text-white transition-colors hover:bg-blue-600"
                >
                  <Edit3 size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
