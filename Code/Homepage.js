// Add to card buttons
document.querySelectorAll('.add-card').forEach(button => {
    button.addEventListener('click', () => {
        const dishName = button.closest('.dish-item').querySelector('h3').innerText;
        alert(`${dishName} added to card!`);
    });
});

// Order buttons
document.querySelectorAll('.btn-order').forEach(button => {
    button.addEventListener('mousedown', () => {
        button.style.transform = "scale(0.95)";
    });
    button.addEventListener('mouseup', () => {
        button.style.transform = "scale(1)";
    });
});