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
                  <h3 class="post-title"><a href="post.html">${blog.category}</a></h3>
                  <p class="post-body">${blog.description}</p>
                  <div class="post-profile">
                    <div class="commentIcon">
                    <button type="submit" id="theComment"><i class="fas fa-comment" id="comment"></i> Comments</button>
                    </div>
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
