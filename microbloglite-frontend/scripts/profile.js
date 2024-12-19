const user = sessionStorage.getItem("username") || "Guest";
const authToken = sessionStorage.getItem("authToken");
const apiUrl = "http://microbloglite.us-east-2.elasticbeanstalk.com/api/posts";

document.getElementById("post-btn").addEventListener("click", postContent);

async function postContent() {
  const content = document.getElementById("post-input").value;
  console.log("working");
  console.log(authToken)

  const postData = {
    user: user,
    content: content,
  };

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${authToken}`,
    },
    body: JSON.stringify(postData),
  });

  const newPost = await response.json();
  console.log(newPost)
  displayPost(newPost);

  document.getElementById("content-input").value = "";
}

function displayPost(post) {
  const postContainer = document.getElementById("post-container");
  const postTemplate = document.getElementById("post-template").content.cloneNode(true);

  postTemplate.querySelector(".post-author").textContent = post.user;
  postTemplate.querySelector(".post-content").textContent = post.content;

  postContainer.appendChild(postTemplate);
}

// document.getElementById("logout-button").addEventListener("click", logout);

function logout() {
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("authToken");
  showMessage("You have been logged out.", "success");
  window.location.href = "/login";
}
