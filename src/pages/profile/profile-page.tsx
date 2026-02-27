import UserUpdateForm from "@/entities/users/ui/users-update-form/users-update-form"



function ProfilePage() {
  return (
    <div className="profile-page">
      <h1>Профиль</h1>
      <UserUpdateForm />
    </div>
  )
}

export default ProfilePage