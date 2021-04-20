import axios from "axios";

const addCommentList = document.getElementById("jsCommentList");
const commentNumber = document.getElementById("jsCommentNumber");

const decreaseNumber = () => {
    commentNumber.innerHTML = parseInt(commentNumber.innerHTML) - 1;
}

const deleteComment = (li) => {
    const list = li.parentNode;
    list.removeChild(li);
    decreaseNumber();  
}

export const handleDeleteBtn = async (event) => {
    const id = event.target.previousSibling.dataset.id;
    const response = await axios({
        url: `/api/${id}/comment/delete`,
        method: "POST",
    });

    if(response.status === 200) {
        deleteComment(event.target.parentNode);
    }
}

function init() {
    const deleteBtns = document.getElementsByClassName("jsDeleteComment");
    for(let deleteBtn of deleteBtns)
        deleteBtn.addEventListener("click", handleDeleteBtn);
}

if(addCommentList) {
    init();
}