const spinner = document.querySelector(".spinner");
const divColor = document.querySelector(".relative");
function fetchUser() {
  showSpinner();
  fetch("https://randomuser.me/api")
    .then((res) => res.json())
    .then((data) => {
      closeSpinner();
      displayUser(data.results[0]);
    });
}

function displayUser(user) {
  const userDisplay = document.querySelector("#user");

  if (user.gender === "female") {
    divColor.style.backgroundColor = "#b80000";
  } else {
    divColor.style.backgroundColor = "#000661";
  }
  userDisplay.innerHTML = `
  
  <div class="flex justify-between">
  <div class="flex">
    <img
      class="w-48 h-48 rounded-2xl mr-8"
      src="${user.picture.large}"
    />
    <div class="space-y-3">
      <p class="text-xl">
        <span class="font-bold">Name: </span>${user.name.first} ${user.name.last}
      </p>
      <p class="text-xl">
        <span class="font-bold">Email: </span> ${user.email}
      </p>
      <p class="text-xl">
        <span class="font-bold">Phone: </span> ${user.phone}
      </p>
      <p class="text-xl">
        <span class="font-bold">Location: </span> ${user.location.city} ${user.location.country}
      </p>
      <p class="text-xl"><span class="font-bold">Age: </span> ${user.dob.age}</p>
    </div>
  </div>
</div>`;
}

function showSpinner() {
  spinner.style.display = "block";
}

function closeSpinner() {
  spinner.style.display = "none";
}

document.querySelector("#generate").addEventListener("click", fetchUser);

fetchUser();
