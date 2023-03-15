// js file for manipulating elements on profile page

const activityRedirect = async (event) => {
  event.preventDefault();
  document.location.replace("/activity");
};

const goToEdit = async () => {
  document.location.replace("/edit");
};

document.querySelector("#edit-profile").addEventListener("click", goToEdit);
document
  .querySelector("#activityBtn")
  .addEventListener("click", activityRedirect);
