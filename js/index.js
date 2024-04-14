function AllBlogs() {
  const blogContainer = document.getElementById("blogContainer");
  const userBlogContainer = document.getElementById("userBlogContainer");

  fetch("https://my-brand-api-arwz.onrender.com/api/blog/posts/allblog", {})
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((blogs) => {
      const blogHTML = blogs
        ?.map((blog) => {
          return `
              <article class="post">
                <input type="hidden" class="blogId" value="${blog.id}">
                <div class="post-thumb">
                  <img src="${blog.image}" alt="">
                  <img src="images/Illustration for cryptocurrency.jpeg" alt="">
                </div>
                <div class="post-info">
                  <div class="category-btn" id="enter">${blog.title}</div>
                  <h3 class="post-title">${blog.category}</a></h3>
                  <p class="post-body">${blog.description}</p>
                <div class="post-profile">
                  <div class="commentIcon">
                  <button type="button" class="commentButton" onclick="openNewCommentDialog('${blog.id}')">
                    <i class="fas fa-comment"></i> Comments
                  </button>
                 </div>

                  <button><a class="readButton" href="post.html?id=${blog._id}">Read</a></button>
                
                    <div class="faire">
                      <div class="editIcon" style="display: none;">
                      <button type="submit" id="editComment">Edit<i class="fas fa-pencil-alt" id="edit"></i></button>
                      </div>
                      <div class="deleteIcon" style="display: none;">
                      <button type="submit" id="deleteComment">Delete<i class="fas fa-trash-alt" id="delete"></i></button>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            `;
        })
        .join("");

      blogContainer.innerHTML = blogHTML;

      userBlogContainer.innerHTML = blogHTML;
      console.log(blogs);
    })
    .catch((error) => {
      console.error("Error fetching blogs:", error);
    });
}
document.addEventListener("DOMContentLoaded", AllBlogs);

var navLinks = document.getElementById("navLinks");
function showMenu() {
  navLinks.style.right = "0";
}
function hideMenu() {
  navLinks.style.right = "-200px";
}

document.getElementById("login").addEventListener("click", function () {
  window.location.href = "login.html";
});

function validateEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(String(email).toLowerCase());
}
function sendEmail() {
  const emailInput = document.getElementById("email");
  const subjectInput = document.getElementById("subject");
  const bodyInput = document.getElementById("body");

  const email = emailInput.value;
  const subject = subjectInput.value;
  const body = bodyInput.value;

  if (!validateEmail(email)) {
    document.getElementById("email-error").textContent =
      "Please enter a valid email address.";
    return;
  }

  if (subject.trim() === "") {
    document.getElementById("subject-error").textContent =
      "Subject cannot be empty.";
    return;
  }

  if (body.length < 1) {
    document.getElementById("body-error").textContent = "Body cannot be empty.";
    return;
  }

  document.getElementById("email-error").textContent = "";
  document.getElementById("subject-error").textContent = "";
  document.getElementById("body-error").textContent = "";

  const formData = {
    from: email,
    subject,
    message: body,
  };

  fetch("https://my-brand-api-arwz.onrender.com/api/connect/sendMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      alert(data.message);

      emailInput.value = "";
      subjectInput.value = "";
      bodyInput.value = "";
    })
    .catch((error) => {
      alert(error.message);
    })
    .finally(() => {
      removeLoader();
    });
}

document
  .getElementById("connectForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const connectForm = document.getElementById("connectForm");

    if (connectForm) {
      connectForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const email = document.getElementById("email")
          ? document.getElementById("email").value
          : null;
        const subject = document.getElementById("subject")
          ? document.getElementById("subject").value
          : null;
        const body = document.getElementById("body")
          ? document.getElementById("body").value
          : null;

        if (!email || !subject || !body) {
          alert("Incomplete form details.");
          return;
        }

        document.getElementById("email-error").textContent = "";
        document.getElementById("subject-error").textContent = "";
        document.getElementById("body-error").textContent = "";

        if (!validateEmail(email)) {
          document.getElementById("email-error").textContent =
            "Please enter a valid email address.";
          return;
        }

        if (subject.trim() === "") {
          document.getElementById("subject-error").textContent =
            "Subject cannot be empty.";
          return;
        }

        if (body.length < 10) {
          document.getElementById("body-error").textContent =
            "Body must be at least 10 characters.";
          return;
        }

        sendEmail();
        alert("Form submitted successfully!");
      });
    }
  });


  // POST =======================
  // Function to fetch and display a single blog post
  
async function displaySingleBlogPost() {
  console.log("uwicyezaaaaaaaaaaaaaaa")
        const urlParams = new URLSearchParams(window.location.search);
      const blogId = urlParams.get('id');

  try {
      // Get the blog ID from the URL parameter

      const response = await fetch(`https://my-brand-api-arwz.onrender.com/api/blog/posts/singleblog/${blogId}`);
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
      const blogPost = await response.json();

      // Populate the HTML elements with the retrieved data
      const postTitleElement = document.querySelector('.postTitle');
      const postImageElement = document.querySelector('.postImage img');
      const postCategoryElement = document.querySelector('.postCategory');
      const postBodyElement = document.querySelector('.postBody');

      postTitleElement.textContent = blogPost.title;
      postImageElement.src = blogPost.image;
      postCategoryElement.textContent = blogPost.category;
      postBodyElement.textContent = blogPost.description;
  } catch (error) {
      console.error('Error fetching and displaying single blog post:', error);
  }
}

// Call the function when the DOM content is loaded
// document.addEventListener('DOMContentLoaded', displaySingleBlogPost);


// COMMENT----------------


function openNewCommentDialog(blogId) {
  const commentDialog = document.getElementById("commentDialog");
  const closeDialogButton = document.getElementById("closeDialog");

  closeDialogButton.addEventListener("click", () => {
    commentDialog.close();
  });

  commentDialog.showModal();

  const commentForm = document.getElementById("commentForm");
  commentForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const commentContent = document.getElementById("commentContent").value;

    const data = { name: username, content: commentContent };

    fetch("https://my-brand-api-arwz.onrender.com/api/blog/posts/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "You have successfully commented") {
          alert("Comment success!");
          commentDialog.close();
        } else {
          alert("Comment failed!");
        }
      })
      .catch((error) => console.error("Error commenting:", error));
  });
}
