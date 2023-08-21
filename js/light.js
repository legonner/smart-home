let initialLightContainerHTML = document.querySelector('.light__container').innerHTML;

document.getElementById('light-off').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.light__container .btn-check');

    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
    updateBadge();
});

const checkboxes = document.querySelectorAll('.light__container .btn-check');
const badge = document.querySelector('.badge');
const lightOffButton = document.getElementById('light-off');

function updateBadge() {
    const checkedCheckboxes = document.querySelectorAll('.light__container .btn-check:checked');
    const checkedCount = checkedCheckboxes.length;

    if (checkedCount === 0) {
        badge.textContent = 'off';
        badge.classList.add('disabled');
    } else {
        badge.textContent = checkedCount.toString();
        badge.classList.remove('disabled');
    }
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateBadge);
});

lightOffButton.addEventListener('click', () => {
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    updateBadge();
});

document.getElementById("edit-light-el").addEventListener("click", function() {
    initialLightContainerHTML = document.querySelector('.light__container').innerHTML;

    const elementsToToggle = document.querySelectorAll(".d-none");
    const editButton = document.getElementById('edit-light-el');

    editButton.classList.add('d-none');
    elementsToToggle.forEach(function(element) {
        element.classList.remove("d-none");
    });
});

const removeButtons = document.querySelectorAll(".remove-light-item");

removeButtons.forEach(function(button) {
    button.addEventListener("click", function() {
        const targetId = button.getAttribute("data-target");
        const targetInput = document.getElementById(targetId);
        const targetLabel = document.querySelector(`label[for=${targetId}]`);

        if (targetInput && targetLabel) {
            targetInput.remove();
            targetLabel.remove();
        }
        updateBadge();
    });
});

const applayButton = document.getElementById("applay-light-el");

applayButton.addEventListener("click", function() {
    const elementsToToggle = document.querySelectorAll(".remove-light-item, #add-light-item, .edit-button");

    elementsToToggle.forEach(function(element) {
        element.classList.add("d-none");
    });

    document.getElementById("edit-light-el").classList.remove("d-none");
    applayButton.classList.add("d-none");
});
