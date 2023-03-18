const saveProfileForm = async function (event) {
  event.preventDefault();

  const ageEl = document.querySelector("#age-input");
  const locationEl = document.querySelector("#location-input");
  const heightEl = document.querySelector("#height-input");
  const startingWeightEl = document.querySelector("#starting-weight-input");

  let imageUrl = "";

  console.log("This is imageUrl outside the fetch", imageUrl);

  const response = await fetch("/api/user/editprofile", {
    method: "POST",
    body: JSON.stringify({
      age: ageEl.value,
      location: locationEl.value,
      height: heightEl.value,
      starting_weight: startingWeightEl.value,
      image_url: imageUrl,
    }),
    headers: { "Content-Type": "application/json" },
  });
  console.log("This is imageUrl in the fetch", imageUrl);
  console.log(response);

  if (response.ok) {
    document.location.replace("/profile");
    alert("Profile updated!");
  } else {
    alert("Failed to update profile.");
  }
};

var myWidget = cloudinary.createUploadWidget(
  { cloudName: "dezrrgciy", uploadPreset: "zxklratf" },
  (error, result) => {
    if (!error && result && result.event === "success") {
      console.log("Done! Here is the image info: ", result.info);
      // This console has the info! result.info.secure_url is it I think.
      console.log("This is secure Url", result.info.secure_url);
      imageUrl = result.info.secure_url;
    }
  }
);

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

document.getElementById("upload_widget").addEventListener(
  "click",
  function () {
    myWidget.open();
  },
  false
);
