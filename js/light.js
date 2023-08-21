let initialLightContainerHTML = document.querySelector('.light__container').innerHTML;

document.getElementById('light-off').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.light__container .btn-check');

    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
    updateBadge();
    updateOffCounter();
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

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
        updateBadge();
        updateOffCounter();
    });
});

lightOffButton.addEventListener('click', () => {
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
    updateBadge();
    updateOffCounter();
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
        updateOffCounter();
    });
});

const applayButton = document.getElementById("applay-light-el");

applayButton.addEventListener("click", function() {
    const elementsToToggle = document.querySelectorAll(".remove-light-item, .edit-button");

    elementsToToggle.forEach(function(element) {
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

    document.getElementById("edit-light-el").classList.remove("d-none");
    applayButton.classList.add("d-none");
});

document.getElementById('add-light-item').addEventListener('click', function() {
    const newLightName = prompt('Enter new element name');

    if (newLightName) {
        const lightContainer = document.querySelector('.light__bathroom #light__bathroom-container');
        const lastCheckbox = lightContainer.querySelector('.btn-check:last-of-type');
        
        let lastCheckboxNumber = 9;
        if (lastCheckbox) {
            const lastCheckboxId = lastCheckbox.getAttribute('id');
            const lastCheckboxIdNumber = parseInt(lastCheckboxId.replace('btncheck', ''));
            lastCheckboxNumber = lastCheckboxIdNumber;
        }
        
        const newCheckboxNumber = lastCheckboxNumber + 5;
        const newCheckboxId = `btncheck${newCheckboxNumber}`;
        const newRemoveButtonDataTarget = newCheckboxId;

        const newElementHTML = `
            <input type="checkbox" class="btn-check" id="${newCheckboxId}" autocomplete="off">
            <label class="btn btn-outline-dark" for="${newCheckboxId}">
                <i class="fas fa-lightbulb fa-2x"></i> <br> ${newLightName}
                <button class="btn badge text-bg-light remove-light-item" data-target="${newRemoveButtonDataTarget}" type="button">
                    <i class="fa-regular fa-rectangle-xmark fa-lg"></i>
                </button>
            </label>
        `;

        lightContainer.insertAdjacentHTML('beforeend', newElementHTML);

        const newCheckbox = lightContainer.querySelector(`#${newCheckboxId}`);
        const newRemoveButton = lightContainer.querySelector(`[data-target="${newRemoveButtonDataTarget}"]`);
        
        newCheckbox.addEventListener('change', function() {
            updateBadge();
            updateOffCounter();
        });
        
        newRemoveButton.addEventListener('click', function() {
            newCheckbox.remove();
            newRemoveButton.parentElement.remove();
            updateBadge();
            updateOffCounter();
        });
        
        updateOffCounter();
    }
});

document.getElementById('add-light-hall-item').addEventListener('click', function() {
    const newLightName = prompt('Enter new element name');

    if (newLightName) {
        const lightContainer = document.querySelector('.light__hall #light__hall-container');
        const lastCheckbox = lightContainer.querySelector('.btn-check:last-of-type');
        
        let lastCheckboxNumber = 4;
        if (lastCheckbox) {
            const lastCheckboxId = lastCheckbox.getAttribute('id');
            const lastCheckboxIdNumber = parseInt(lastCheckboxId.replace('btncheck', ''));
            lastCheckboxNumber = lastCheckboxIdNumber;
        }
        
        const newCheckboxNumber = lastCheckboxNumber + 10;
        const newCheckboxId = `btncheck${newCheckboxNumber}`;
        const newRemoveButtonDataTarget = newCheckboxId;

        const newElementHTML = `
            <input type="checkbox" class="btn-check" id="${newCheckboxId}" autocomplete="off">
            <label class="btn btn-outline-dark" for="${newCheckboxId}">
                <i class="fas fa-lightbulb fa-2x"></i> <br> ${newLightName}
                <button class="btn badge text-bg-light remove-light-item" data-target="${newRemoveButtonDataTarget}" type="button">
                    <i class="fa-regular fa-rectangle-xmark fa-lg"></i>
                </button>
            </label>
        `;

        lightContainer.insertAdjacentHTML('beforeend', newElementHTML);

        const newCheckbox = lightContainer.querySelector(`#${newCheckboxId}`);
        const newRemoveButton = lightContainer.querySelector(`[data-target="${newRemoveButtonDataTarget}"]`);
        
        newCheckbox.addEventListener('change', function() {
            updateBadge();
            updateOffCounter();
        });
        
        newRemoveButton.addEventListener('click', function() {
            newCheckbox.remove();
            newRemoveButton.parentElement.remove();
            updateBadge();
            updateOffCounter();
        });
        
        updateOffCounter();
    }
});

document.getElementById('add-light-bedroom-item').addEventListener('click', function() {
    const newLightName = prompt('Enter new element name');

    if (newLightName) {
        const lightContainer = document.querySelector('.light__bedroom #light__bedroom-container');
        const lastCheckbox = lightContainer.querySelector('.btn-check:last-of-type');
        
        let lastCheckboxNumber = 8;
        if (lastCheckbox) {
            const lastCheckboxId = lastCheckbox.getAttribute('id');
            const lastCheckboxIdNumber = parseInt(lastCheckboxId.replace('btncheck', ''));
            lastCheckboxNumber = lastCheckboxIdNumber;
        }
        
        const newCheckboxNumber = lastCheckboxNumber + 1;
        const newCheckboxId = `btncheck${newCheckboxNumber}`;
        const newRemoveButtonDataTarget = newCheckboxId;

        const newElementHTML = `
            <input type="checkbox" class="btn-check" id="${newCheckboxId}" autocomplete="off">
            <label class="btn btn-outline-dark" for="${newCheckboxId}">
                <i class="fas fa-lightbulb fa-2x"></i> <br> ${newLightName}
                <button class="btn badge text-bg-light remove-light-item" data-target="${newRemoveButtonDataTarget}" type="button">
                    <i class="fa-regular fa-rectangle-xmark fa-lg"></i>
                </button>
            </label>
        `;

        lightContainer.insertAdjacentHTML('beforeend', newElementHTML);

        const newCheckbox = lightContainer.querySelector(`#${newCheckboxId}`);
        const newRemoveButton = lightContainer.querySelector(`[data-target="${newRemoveButtonDataTarget}"]`);
        
        newCheckbox.addEventListener('change', function() {
            updateBadge();
            updateOffCounter();
        });
        
        newRemoveButton.addEventListener('click', function() {
            newCheckbox.remove();
            newRemoveButton.parentElement.remove();
            updateBadge();
            updateOffCounter();
        });
        
        updateOffCounter();
    }
});
