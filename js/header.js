const checkbox = document.getElementById('flexSwitchCheckChecked');
const label = document.querySelector('.form-check-label');
const container = document.getElementById("container");
const blocks = {
    "bathroom": document.getElementById("bathroom-block"),
    "hall": document.getElementById("hall-block"),
    "bedroom": document.getElementById("bedroom-block")
};

checkbox.addEventListener('change', function() {
    const iconClass = this.checked ? "fa-house-chimney-user" : "fa-house-chimney";
    label.innerHTML = `<i class="fa-solid ${iconClass} fa-lg"></i>`;
});

container.addEventListener("click", function(event) {
    event.preventDefault();
    const target = event.target;
    if (target.tagName === "A" && target.getAttribute("data-block")) {
        const blockToShow = blocks[target.getAttribute("data-block")];
        showBlock(blockToShow);
    } else if (target.id === "smart-home-link") {
        showAllBlocks();
    }
});

function showBlock(block) {
    for (const key in blocks) {
        if (blocks[key] === block) {
            blocks[key].style.display = "block";
        } else {
            blocks[key].style.display = "none";
        }
    }
}

function showAllBlocks() {
    for (const key in blocks) {
        blocks[key].style.display = "block";
    }
}
