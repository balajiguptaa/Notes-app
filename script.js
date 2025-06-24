const notesContainer = document.querySelector('.notes-container');
const createBtn = document.querySelector('.btn');

function updateStorage() {
    const notes = [];
    document.querySelectorAll('.input-Box').forEach(note => {
        notes.push(note.innerHTML);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
}

function attachInputListeners() {
    const notes = document.querySelectorAll('.input-Box');
    notes.forEach(note => {
        note.addEventListener('input', updateStorage);
    });
}

function loadNotes() {
    const savedNotes = JSON.parse(localStorage.getItem("notes") || "[]");
    notesContainer.innerHTML = '';
    savedNotes.forEach(noteContent => {
        let inputBox = document.createElement('p');
        let img = document.createElement('img');

        inputBox.className = 'input-Box';
        inputBox.setAttribute('contenteditable', 'true');
        inputBox.innerHTML = noteContent;

        img.src = 'delete.png';
        img.className = 'delete-icon';

        inputBox.appendChild(img);
        notesContainer.appendChild(inputBox);
    });

    attachInputListeners();
}
loadNotes();

createBtn.addEventListener('click', () => {
    let inputBox = document.createElement('p');
    let img = document.createElement('img');

    inputBox.className = 'input-Box';
    inputBox.setAttribute('contenteditable', 'true');

    img.src = 'delete.png';
    img.className = 'delete-icon';

    inputBox.appendChild(img);
    notesContainer.appendChild(inputBox);
    attachInputListeners();
});

notesContainer.addEventListener('click', function(e) {
    if (e.target.tagName === 'IMG') {
        e.target.parentElement.remove();
        updateStorage();
    }
});

document.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        document.execCommand("insertLineBreak");
        event.preventDefault();
    }
});
