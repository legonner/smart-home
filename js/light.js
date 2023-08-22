const initialLightContainerHTML = document.querySelector('.light__container').innerHTML;
const lightContainerBathroom = document.querySelector('.light__bathroom #light__bathroom-container');
const lightContainerHall = document.querySelector('.light__hall #light__hall-container');
const lightContainerBedroom = document.querySelector('.light__bedroom #light__bedroom-container');
const checkboxes = document.querySelectorAll('.light__container .btn-check');
const badge = document.querySelector('.badge');
const lightOffButton = document.getElementById('light-off');
const removeButtons = document.querySelectorAll(".remove-light-item");
const applayButton = document.getElementById("applay-light-el");
const editButton = document.getElementById('edit-light-el');

editButton.addEventListener("click", function () {
    const elementsToToggle = document.querySelectorAll(".d-none");

    editButton.classList.add('d-none');
    elementsToToggle.forEach(function (element) {
        element.classList.remove("d-none");
    });
});

lightOffButton.addEventListener('click', () => {
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    const newCheckboxes = document.querySelectorAll('.new-checkbox');
    newCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    
    updateBadge();
    updateOffCounter();
});

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function () {
        updateBadge();
        updateOffCounter();
    });
});

removeButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        const targetId = button.getAttribute("data-target");
        const targetInput = document.getElementById(targetId);
        const targetLabel = document.querySelector(`label[for=${targetId}]`);

        if (targetInput && targetLabel) {
            targetInput.remove();
            targetLabel.remove();
        }
        updateBadge();
        updateOffCounter();
    });
});

applayButton.addEventListener("click", function () {
    const elementsToToggle = document.querySelectorAll(".remove-light-item, .edit-button");

    elementsToToggle.forEach(function (element) {
        element.classList.add("d-none");
    });

    const addButtonSelectors = [
        '#add-light-item',
        '#add-light-hall-item',
        '#add-light-bedroom-item'
    ];

    addButtonSelectors.forEach(selector => {
        const addButton = document.querySelector(selector);
        if (addButton) {
            addButton.classList.add("d-none");
        }
    });

    editButton.classList.remove("d-none");
    applayButton.classList.add("d-none");
});

document.getElementById('add-light-item').addEventListener('click', function () {
    const newLightName = prompt('Enter new element name');

    if (newLightName) {
        addLightElement(lightContainerBathroom, newLightName);
    }
});

document.getElementById('add-light-hall-item').addEventListener('click', function () {
    const newLightName = prompt('Enter new element name');

    if (newLightName) {
        addLightElement(lightContainerHall, newLightName);
    }
});

document.getElementById('add-light-bedroom-item').addEventListener('click', function () {
    const newLightName = prompt('Enter new element name');

    if (newLightName) {
        addLightElement(lightContainerBedroom, newLightName);
    }
});

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

function updateOffCounter() {
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

function addLightElement(container, lightName) {
    const lastCheckbox = container.querySelector('.btn-check:last-of-type');

    let lastCheckboxNumber = 0;
    if (lastCheckbox) {
        const lastCheckboxId = lastCheckbox.getAttribute('id');
        const lastCheckboxIdNumber = parseInt(lastCheckboxId.replace('btncheck', ''));
        lastCheckboxNumber = lastCheckboxIdNumber;
    }

    const newCheckboxNumber = lastCheckboxNumber + 10;
    const newCheckboxId = `btncheck${newCheckboxNumber}`;
    const newRemoveButtonDataTarget = newCheckboxId;

    const newElementHTML = `
        <input type="checkbox" class="btn-check new-checkbox" id="${newCheckboxId}" autocomplete="off">
        <label class="btn btn-outline-dark" for="${newCheckboxId}">
            <i class="fas fa-lightbulb fa-2x"></i> <br> ${lightName}
            <button class="btn badge text-bg-light remove-light-item" data-target="${newRemoveButtonDataTarget}" type="button">
                <i class="fa-regular fa-rectangle-xmark fa-lg"></i>
            </button>
        </label>
    `;

    container.insertAdjacentHTML('beforeend', newElementHTML);

    const newCheckbox = container.querySelector(`#${newCheckboxId}`);
    const newRemoveButton = container.querySelector(`[data-target="${newRemoveButtonDataTarget}"]`);

    newCheckbox.addEventListener('change', function () {
        updateBadge();
        updateOffCounter();
    });

    newRemoveButton.addEventListener('click', function () {
        newCheckbox.remove();
        newRemoveButton.parentElement.remove();
        updateBadge();
        updateOffCounter();
    });

    updateOffCounter();
    
    lightOffButton.addEventListener('click', () => {
        newCheckbox.checked = false;
        updateBadge();
        updateOffCounter();
    });
}
