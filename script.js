document.addEventListener("DOMContentLoaded", function () {
    const introScreen = document.getElementById("introScreen");
    const mainContent = document.getElementById("mainContent");
    const countdownElement = document.getElementById("countdown");

    // Countdown Logic
    let countdownValue = 3; // Countdown value
    countdownElement.innerText = countdownValue;

    const countdownInterval = setInterval(() => {
        countdownValue--;
        countdownElement.innerText = countdownValue;

        if (countdownValue <= 0) {
            clearInterval(countdownInterval);
            introScreen.classList.add('hidden'); // Hide intro screen
            mainContent.classList.remove('hidden'); // Show main content
        }
    }, 1000);

    // Check for existing likes in local storage
    let likeCount1 = localStorage.getItem("likeCount1") ? parseInt(localStorage.getItem("likeCount1")) : 0;
    let likeCount2 = localStorage.getItem("likeCount2") ? parseInt(localStorage.getItem("likeCount2")) : 0;

    // Display initial like counts
    document.getElementById("likeCount1").innerText = likeCount1;
    document.getElementById("likeCount2").innerText = likeCount2;

    // Like button click event handlers
    document.getElementById("likeButton1").addEventListener("click", function () {
        if (!this.classList.contains("disabled")) {
            likeCount1++;
            localStorage.setItem("likeCount1", likeCount1); // Store the like count
            document.getElementById("likeCount1").innerText = likeCount1; // Update UI
            disableLikeButtons(); // Disable all like buttons after liking
            this.textContent = `👍 Liked (${likeCount1})`; // Update button text
        }
    });

    document.getElementById("likeButton2").addEventListener("click", function () {
        if (!this.classList.contains("disabled")) {
            likeCount2++;
            localStorage.setItem("likeCount2", likeCount2); // Store the like count
            document.getElementById("likeCount2").innerText = likeCount2; // Update UI
            disableLikeButtons(); // Disable all like buttons after liking
            this.textContent = `👍 Liked (${likeCount2})`; // Update button text
        }
    });

    // Disable like buttons after one is clicked
    function disableLikeButtons() {
        document.getElementById("likeButton1").classList.add("disabled");
        document.getElementById("likeButton2").classList.add("disabled");
        document.getElementById("likeButton1").disabled = true;
        document.getElementById("likeButton2").disabled = true;
    }

    // Comment submission
    document.getElementById("submitComment1").addEventListener("click", function () {
        const comment = document.getElementById("comment1").value.trim();
        if (comment) {
            addCommentToSection(comment, "commentsSection1");
            document.getElementById("comment1").value = ""; // Clear the comment box
            saveComment(comment, "comments1"); // Save comment to local storage
        }
    });

    document.getElementById("submitComment2").addEventListener("click", function () {
        const comment = document.getElementById("comment2").value.trim();
        if (comment) {
            addCommentToSection(comment, "commentsSection2");
            document.getElementById("comment2").value = ""; // Clear the comment box
            saveComment(comment, "comments2"); // Save comment to local storage
        }
    });

    // Function to add a comment to the comments section
    function addCommentToSection(comment, sectionId) {
        const commentsSection = document.getElementById(sectionId);
        const commentElement = document.createElement("div");
        commentElement.innerText = comment;
        commentsSection.appendChild(commentElement);
    }

    // Save comment to local storage
    function saveComment(comment, key) {
        const comments = JSON.parse(localStorage.getItem(key)) || [];
        comments.push(comment);
        localStorage.setItem(key, JSON.stringify(comments));
    }

    // Initialize comments from local storage
    const comments1 = JSON.parse(localStorage.getItem('comments1')) || [];
    const comments2 = JSON.parse(localStorage.getItem('comments2')) || [];
    comments1.forEach(comment => addCommentToSection(comment, 'commentsSection1'));
    comments2.forEach(comment => addCommentToSection(comment, 'commentsSection2'));
});
