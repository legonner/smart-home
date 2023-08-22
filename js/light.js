function createCheckbox(id, label) {
    const checkboxId = `btncheck${id}`;
    return `
        <input type="checkbox" class="btn-check new-checkbox" id="${checkboxId}" autocomplete="off">
        <label class="btn btn-outline-dark" for="${checkboxId}">
            <i class="fas fa-lightbulb fa-2x"></i> <br> ${label}
            <button class="btn badge text-bg-light remove-light-item" data-target="${checkboxId}" type="button">
                <i class="fa-regular fa-rectangle-xmark fa-lg"></i>
            </button>
        </label>`;
}

const lightContainers = {
    bathroom: document.querySelector('.light__bathroom #light__bathroom-container'),
    hall: document.querySelector('.light__hall #light__hall-container'),
    bedroom: document.querySelector('.light__bedroom #light__bedroom-container')
};

const checkboxes = document.querySelectorAll('.light__container .btn-check');
const badge = document.querySelector('.badge');
const lightOffButton = document.getElementById('light-off');
const removeButtons = document.querySelectorAll('.remove-light-item');
const applyButton = document.getElementById('applay-light-el');
const editButton = document.getElementById('edit-light-el');

function updateBadgeAndCounter() {
    const checkedCount = document.querySelectorAll('.light__container .btn-check:checked').length;
    badge.textContent = checkedCount === 0 ? 'off' : checkedCount.toString();
    badge.classList.toggle('disabled', checkedCount === 0);
}

function handleLightOffButtonClick() {
    checkboxes.forEach(checkbox => checkbox.checked = false);
    document.querySelectorAll('.new-checkbox').forEach(checkbox => checkbox.checked = false);
    updateBadgeAndCounter();
}

function handleRemoveButtonClick(button) {
    const targetId = button.getAttribute('data-target');
    const targetInput = document.getElementById(targetId);
    const targetLabel = document.querySelector(`label[for=${targetId}]`);

    if (targetInput && targetLabel) {
        targetInput.remove();
        targetLabel.remove();
    }
    updateBadgeAndCounter();
}

function handleApplyButtonClick() {
    const elementsToToggle = document.querySelectorAll('.remove-light-item, .edit-button');

    elementsToToggle.forEach(element => {
        element.classList.add('d-none');
    });

    ['#add-light-item', '#add-light-hall-item', '#add-light-bedroom-item'].forEach(selector => {
        const addButton = document.querySelector(selector);
        if (addButton) {
            addButton.classList.add('d-none');
        }
    });

    editButton.classList.remove('d-none');
    applyButton.classList.add('d-none');
}

function addLightElement(container, lightName) {
    const lastCheckbox = container.querySelector('.btn-check:last-of-type');
    const lastCheckboxIdNumber = lastCheckbox ? parseInt(lastCheckbox.getAttribute('id').replace('btncheck', '')) : 0;
    const incrementStep = 10;
    const newCheckboxNumber = lastCheckboxIdNumber + incrementStep;
    const newCheckboxId = `btncheck${newCheckboxNumber}`;
    const newRemoveButtonDataTarget = newCheckboxId;

    const newElementHTML = createCheckbox(newCheckboxNumber, lightName);
    container.insertAdjacentHTML('beforeend', newElementHTML);

    const newCheckbox = container.querySelector(`#${newCheckboxId}`);
    const newRemoveButton = container.querySelector(`[data-target="${newRemoveButtonDataTarget}"]`);

    function handleNewRemoveButtonClick() {
        newCheckbox.remove();
        newRemoveButton.parentElement.remove();
        updateBadgeAndCounter();
    }

    newCheckbox.addEventListener('change', updateBadgeAndCounter);
    newRemoveButton.addEventListener('click', handleNewRemoveButtonClick);

    updateBadgeAndCounter();

    lightOffButton.addEventListener('click', () => {
        newCheckbox.checked = false;
        updateBadgeAndCounter();
    });
}

function handleAddButtonClick(container) {
    const newLightName = prompt('Enter new element name');
    if (newLightName) {
        addLightElement(container, newLightName);
    }
}

function toggleEdit() {
    const elementsToToggle = document.querySelectorAll('.d-none');

    elementsToToggle.forEach(element => {
        element.classList.toggle('d-none');
    });

    editButton.classList.add('d-none');
}

function setupEventListeners() {
    lightOffButton.addEventListener('click', handleLightOffButtonClick);

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateBadgeAndCounter);
    });

    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleRemoveButtonClick(button);
        });
    });

    applyButton.addEventListener('click', () => {
        handleApplyButtonClick();
        editButton.classList.remove('d-none');
    });

    document.getElementById('add-light-item').addEventListener('click', () => {
        handleAddButtonClick(lightContainers.bathroom);
    });

    document.getElementById('add-light-hall-item').addEventListener('click', () => {
        handleAddButtonClick(lightContainers.hall);
    });

    document.getElementById('add-light-bedroom-item').addEventListener('click', () => {
        handleAddButtonClick(lightContainers.bedroom);
    });

    editButton.addEventListener('click', toggleEdit);
}

setupEventListeners();
