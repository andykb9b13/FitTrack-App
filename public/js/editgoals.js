const checkForGoals = async () => {
  try {
    const response = await fetch("/api/user/goals/id", {
      method: "GET",
    });
    const responseData = await response.json();
    console.log("Response Data", responseData);
    return responseData;
  } catch (err) {
    console.log(err);
  }
};

const saveGoalsForm = async function (event) {
  event.preventDefault();

  const totalHoursEl = document.querySelector("#total-hours");
  const daysOfExerciseEl = document.querySelector("#days-of-exercise");
  const targetweightEl = document.querySelector("#target-weight");

  try {
    const goals = await checkForGoals();
    if (goals === null) {
      const response = await fetch("/api/user/goals", {
        method: "POST",
        body: JSON.stringify({
          hours_of_exercise: totalHoursEl.value,
          days_of_exercise: daysOfExerciseEl.value,
          weightloss_goal: targetweightEl.value,
        }),
        headers: { "Content-Type": "application/json" },
      });
      console.log("goals response", response);

      if (response.ok) {
        document.location.replace("/profile");
        alert("Goals created!");
      } else {
        alert("Failed to create goals.");
      }
    } else {
      const response = await fetch("/api/user/goals", {
        method: "PUT",
        body: JSON.stringify({
          hours_of_exercise: totalHoursEl.value,
          days_of_exercise: daysOfExerciseEl.value,
          weightloss_goal: targetweightEl.value,
        }),
        headers: { "Content-Type": "application/json" },
      });
      console.log("goals response", response);
      if (response.ok) {
        document.location.replace("/profile");
        alert("Goals updated!");
      } else {
        alert("Failed to update profile.");
      }
    }
  } catch (err) {
    console.log("error in goals", err);
  }
};

const profileRedirect = async (event) => {
  event.preventDefault();
  document.location.replace("/profile");
};

document.querySelector("#savegoals").addEventListener("click", saveGoalsForm);

document.querySelector("#cancelBtn").addEventListener("click", profileRedirect);

checkForGoals();
