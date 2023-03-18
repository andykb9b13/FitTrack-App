const ctx = document.getElementById("activityGraph").getContext("2d");
// const second = document.getElementById("secondChart");
// const third = document.getElementById("thirdChart");
let activityChart = new Chart(ctx, {
  type: "bar",
  data: {
    datasets: [],
  },
});

const getActivities = async () => {
  try {
    const response = await fetch("/api/graph/all", {
      method: "GET",
    });
    console.log("This is the response for getActivities", response);
    const data = response.json();
    activityData(data);
  } catch (err) {
    console.log(err);
  }
};

const activityData = async (userData) => {
  const data = await userData;
  activityChart.destroy();
  activityChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: data.map((row) => row.entry_date),
      datasets: [
        {
          label: "Duration",
          data: data.map((row) => row.duration),
          borderWidth: 2,
          borderColor: "rgb(19, 37, 66)",
          backgroundColor: "rgb(219, 247, 98)",
          type: "line",
          order: 0,
        },
        {
          label: "Distance",
          data: data.map((row) => row.distance),
          borderWidth: 2,
          backgroundColor: "rgb(140, 197, 227)",
          borderColor: "rgb(19, 37, 66)",
          order: 1,
        },
      ],
    },
    options: {
      plugins: {
        title: {
          display: true,
          positon: "top",
          align: "center",
          text: "Your Weekly Fitness!",
        },
      },
      scales: {
        y: {
          position: "left",
          beginAtZero: true,
          title: {
            display: true,
            text: "Time (Minutes)",
          },
          ticks: {
            color: "black",
          },
          grid: {
            color: "black",
          },
        },
        x: {
          title: {
            display: true,
            text: "Date (YYYY/MM/DD)",
          },
          ticks: {
            color: "black",
          },
          grid: {
            color: "black",
          },
        },
      },
    },
  });
};

getActivities();

// TODO can I combine the three routes to use string literal to input a parameter into the http request?
const getRunningData = async () => {
  try {
    const response = await fetch("/api/graph/running", {
      method: "GET",
    });
    const data = response.json();
    console.log("This is the data from getRunningData", data);
    activityData(data);
  } catch (err) {
    console.log(err);
  }
};

const getSwimmingData = async () => {
  try {
    const response = await fetch("/api/graph/swimming", {
      method: "GET",
    });
    const data = response.json();
    console.log("This is the data from getRunningData", data);
    activityData(data);
  } catch (err) {
    console.log(err);
  }
};

const getBikingData = async () => {
  try {
    const response = await fetch("/api/graph/biking", {
      method: "GET",
    });
    const data = response.json();
    console.log("This is the data from getRunningData", data);
    activityData(data);
  } catch (err) {
    console.log(err);
  }
};

document
  .querySelector("#allActivitiesBtn")
  .addEventListener("click", getActivities);
document.querySelector("#runningBtn").addEventListener("click", getRunningData);
document
  .querySelector("#swimmingBtn")
  .addEventListener("click", getSwimmingData);
document.querySelector("#bikingBtn").addEventListener("click", getBikingData);
