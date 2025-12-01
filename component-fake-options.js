let fakeIndex = 0;

document.getElementById("add-fake-option-btn").addEventListener("click", () => {
    fakeIndex++;

    const container = document.getElementById("fake-options-container");
    const id = `fake-option-${fakeIndex}`;

    container.insertAdjacentHTML("beforeend", `
        <div class="input-field col s12 fake-option">
            <input type="text" id="${id}" class="fake-option-input" required />
            <label for="${id}">Alternativa Errada ${fakeIndex}</label>
            <a class="remove-fake-option red-text" data-id="${id}">
                <a class="remove-fake-option" data-id="${id}">
                    ×
                </a>
            </a>
        </div>
    `);

    // Activate Materialize labels
    M.updateTextFields();
});

// Remove option
document.addEventListener("click", (e) => {
    if (e.target.closest(".remove-fake-option")) {
        const id = e.target.closest(".remove-fake-option").dataset.id;
        document.getElementById(id).closest(".fake-option").remove();
    }
});
