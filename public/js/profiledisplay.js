const deleteUser = async () => {
  try {
    const confirmedDelete = confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmedDelete) {
      const response = await fetch("/api/user/id", {
        method: "DELETE",
      });
      if (response.ok) {
        document.location.replace("/signup");
        alert("Account Deleted!");
      } else {
        alert("Failed to delete account");
      }
    } else return;
  } catch (err) {
    console.log(err);
  }
};

document.querySelector("#deleteBtn").addEventListener("click", deleteUser);
