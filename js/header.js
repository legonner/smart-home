const checkbox = document.getElementById('flexSwitchCheckChecked');
const label = document.querySelector('.form-check-label');

checkbox.addEventListener('change', function() {
    if (this.checked) {
        label.innerHTML = '<i class="fa-solid fa-house-chimney-user fa-lg"></i>';
    } else {
        label.innerHTML = '<i class="fa-solid fa-house-chimney fa-lg"></i>';
    }
});