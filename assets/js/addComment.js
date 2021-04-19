import axios from "axios";
import { handleDeleteBtn } from "./deleteComment";

const addCommentForm = document.getElementById("jsAddComment");
const commentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const increaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML) + 1;
}

const addComment = (comment, id) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.dataset.id = id;
    span.innerHTML = comment;
    const a = document.createElement("a");
    a.innerHTML = "❌";
    a.className = "jsDeleteComment";
    li.appendChild(span);
    li.appendChild(a);
    commentList.prepend(li);
    a.addEventListener("click", handleDeleteBtn);
    increaseNumber();
}

const sendComment = async (comment) => {
    const videoId = window.location.href.split("/videos/")[1];
    const response = await axios({
        url: `/api/${videoId}/comment`,
        method: "POST",
        data: {
          comment
        }
    });

    if(response.status === 200) {
        addComment(comment, response.data);
    }
}

const handleSubmit = (event) => {
    event.preventDefault();
    const commentInput = addCommentForm.querySelector("input");
    const comment = commentInput.value;
    sendComment(comment);
    commentInput.value = "";
}

function init() {
    addCommentForm.addEventListener("submit", handleSubmit);
}

if(addCommentForm) {
    init();
}