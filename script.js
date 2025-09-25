const spinner = document.querySelector(".spinner");
const buttonText = document.querySelector("#button-text");
const generateBtn = document.querySelector("#generate");
const userDisplay = document.querySelector("#user");

const fetchUser = async () => {
  try {
    showSpinner();
    const res = await fetch("https://randomuser.me/api");
    if (!res.ok) throw new Error("Network error");
    const data = await res.json();
    await new Promise((r) => setTimeout(r, 500));
    closeSpinner();
    displayUser(data.results[0]);
  } catch (e) {
    closeSpinner();
    showError("Could not load user. Please try again.");
  }
};

function displayUser(user) {
  const fullName = `${user.name.first} ${user.name.last}`;
  const location = `${user.location.city}, ${user.location.country}`;
  const gender = user.gender
    ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1)
    : "";

  userDisplay.innerHTML = `
    <div class="rounded-3xl p-5 bg-white/80 backdrop-blur-xl border border-white/50 shadow-[0_8px_24px_rgba(0,0,0,0.08)] animate-[fadeIn_0.35s_ease]">
      <div class="flex items-center gap-4">
        <img class="w-20 h-20 rounded-2xl object-cover shadow-md ring-4 ring-white/80" src="${
          user.picture.large
        }" alt="${fullName}" />
        <div class="min-w-0">
          <p class="text-lg font-semibold text-gray-900 truncate">${fullName}</p>
          <p class="text-sm text-gray-600">${user.dob.age} • ${gender}</p>
          <p class="text-sm text-gray-600 truncate">${location}</p>
        </div>
      </div>

      <div class="mt-4 grid grid-cols-1 gap-3">
        ${infoRow(
          "Email",
          user.email,
          "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
          "from-blue-500/15 to-blue-500/10",
          "text-blue-600"
        )}
        ${infoRow(
          "Phone",
          user.phone,
          "M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z",
          "from-emerald-500/15 to-emerald-500/10",
          "text-emerald-600"
        )}
        ${infoRow(
          "Username",
          user.login.username,
          "M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z",
          "from-indigo-500/15 to-indigo-500/10",
          "text-indigo-600"
        )}
        ${infoRow(
          "Birthday",
          formatDate(user.dob.date),
          "M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z",
          "from-amber-500/15 to-amber-500/10",
          "text-amber-600"
        )}
      </div>
    </div>
  `;
}

function infoRow(label, value, path, bgGrad, iconColor) {
  return `
    <div class="flex items-center gap-3 rounded-2xl p-4 bg-white/60 border border-white/60 hover:bg-white/80 transition-colors">
      <div class="shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${bgGrad} flex items-center justify-center">
        <svg class="w-5 h-5 ${iconColor}" fill="currentColor" viewBox="0 0 24 24">
          <path d="${path}"/>
        </svg>
      </div>
      <div class="min-w-0">
        <p class="text-xs uppercase tracking-wide text-gray-500">${label}</p>
        <p class="text-sm font-medium text-gray-900 truncate">${value}</p>
      </div>
    </div>
  `;
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function showError(msg) {
  userDisplay.innerHTML = `
    <div class="rounded-2xl p-5 bg-white/80 border border-white/60 text-center">
      <p class="text-sm text-red-600 font-medium">${msg}</p>
    </div>
  `;
}

function showSpinner() {
  spinner.classList.remove("hidden");
  buttonText.textContent = "Generating...";
  generateBtn.disabled = true;
}

function closeSpinner() {
  spinner.classList.add("hidden");
  buttonText.textContent = "Generate User";
  generateBtn.disabled = false;
}

document.querySelector("#generate").addEventListener("click", fetchUser);
fetchUser();
