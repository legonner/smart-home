document.getElementById('light-off').addEventListener('click', function() {
    const checkboxes = document.querySelectorAll('.light__container .btn-check');

    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false;
    });
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

