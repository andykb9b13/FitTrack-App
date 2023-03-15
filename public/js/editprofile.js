const saveProfileForm = async function (event) {
  event.preventDefault();

  const ageEl = document.querySelector("#age-input");
  const locationEl = document.querySelector("#location-input");
  const heightEl = document.querySelector("#height-input");
  const startingWeightEl = document.querySelector("#starting-weight-input");

  const response = await fetch("/api/user/edit/profile", {
    method: "POST",
    body: JSON.stringify({
      name: ageEl.value,
      location: locationEl.value,
      height: heightEl.value,
      starting_weight: startingWeightEl.value,
    }),
    headers: { "Content-Type": "application/json" },
  });
  console.log(response);

  if (response.ok) {
    document.location.replace("/profile");
    alert("Profile updated!");
  } else {
    alert("Failed to update profile.");
  }
};

const profileRedirect = async (event) => {
  event.preventDefault();
  document.location.replace("/profile");
};

document
  .querySelector("#saveProfileBtn")
  .addEventListener("click", saveProfileForm);

document
  .querySelector("#cancelChangesBtn")
  .addEventListener("click", profileRedirect);
