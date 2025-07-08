const API_URL = "http://localhost:5000/api/";

const uploadPost = async () => {
  const fileInput = document.querySelector("#post-img");
  const caption = document.querySelector("#caption").value.trim();
  const token = localStorage.getItem("token");
  console.log("token: ", token);

  if (fileInput.files.length === 0 || !caption) {
    alert("Please upload a image and add caption");
    return;
  }

  const file = fileInput.files[0];

  const formData = new FormData();
  formData.append("image", file);
  formData.append("caption", caption);

  try {
    console.log(
      "Trying to send post with caption:",
      caption,
      "and file:",
      file
    );
    const res = await fetch(API_URL + "posts", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    console.log("uploadPost function completed");
    let data;
    try {
      data = await res.json();
    } catch (jsonErr) {
      console.log("Failed to parse JSON:", jsonErr);
      alert("Server error: Invalid response format.");
      return;
    }

    console.log("Upload response:", res.ok);
    console.log("status code", res.status);
    console.log("Upload data:", data);
    if (res.ok) {
      alert("Post uploaded successfully");
      document.querySelector(".upload-form").reset();
      document.querySelector(".form-container").classList.add("hidden");
    } else {
      alert("Upload failed: " + (data.message || "unknown error"));
    }
    
  } catch (err) {
    console.log("error while upload :", err);
    alert("Something went wrong while uploading: " + err.message);
  }
};

document.querySelector(".upload-form").addEventListener("submit", (e) => {
  console.log("Form submit event fired");
  e.preventDefault();
  console.log("Default prevented, calling uploadPost");
  uploadPost();
});

document.querySelector(".cancel-post").addEventListener("click", (e) => {
  e.preventDefault();
  document.querySelector(".form-container").classList.add("hidden");
});
