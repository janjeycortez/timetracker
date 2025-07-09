let loginTime = null;

function formatTime(date) {
  return date.toLocaleString();
}

function login() {
  const name = document.getElementById('name').value.trim();
  if (!name) {
    alert("Please enter your name.");
    return;
  }

  loginTime = new Date();
  document.getElementById('status').innerText = `Logged in at ${formatTime(loginTime)}`;

  const data = {
    name: name,
    loginTime: loginTime.toISOString(),
    logoutTime: "",
    duration: "",
    eventType: "login"
  };

  sendToGoogleForm(data);
}

function logout() {
  const name = document.getElementById('name').value.trim();
  if (!name || !loginTime) {
    alert("Please login first.");
    return;
  }

  const logoutTime = new Date();
  const durationMs = logoutTime - loginTime;
  const duration = new Date(durationMs).toISOString().substr(11, 8);

  const data = {
    name: name,
    loginTime: loginTime.toISOString(),
    logoutTime: logoutTime.toISOString(),
    duration: duration,
    eventType: "logout"
  };

  document.getElementById('status').innerText =
    `Logged out at ${formatTime(logoutTime)}\nDuration: ${duration}`;

  loginTime = null;

  sendToGoogleForm(data);
}

// ✅ Replace this with your actual Form POST URL and entry IDs
function sendToGoogleForm(data) {
  const formUrl = "https://docs.google.com/forms/d/e/1FAIpQLSc9x1APGrWRf4ioDJHnJS6mDlvVGfimVoBQUjqdNHtb8Cn1-w/formResponse";

  const formData = new FormData();
  formData.append("entry.1515818444", data.name);
  formData.append("entry.1116493686", data.loginTime);
  formData.append("entry.915935133", data.logoutTime);
  formData.append("entry.1070680001", data.duration);
  formData.append("entry.1799809689", data.eventType);

  fetch(formUrl, {
    method: "POST",
    body: formData,
    mode: "no-cors"  // ✅ This bypasses CORS entirely
  })
  .then(() => {
    console.log("✅ Sent via Google Form");
  })
  .catch(err => {
    console.error("❌ Form error", err);
  });
}
