function checkIfAdmin() {
    // Get admin role from localStorage
    const role = localStorage.getItem('userRole');
    
    if (role === 'admin') {
        return true;
    } else {
        return false;
    }
}

function updateAdminIcons() {
    const isAdmin = checkIfAdmin();
    
    // Get all admin-only icons
    const adminIcons = document.querySelectorAll('.admin-only');

    // Show/hide icons based on admin status
    adminIcons.forEach(icon => {
        if (isAdmin) {
            icon.style.display = 'inline-block'; // Show admin-only icons
        } else {
            icon.style.display = 'none'; // Hide admin-only icons
        }
    });
}

function openDeleteModal(questionId) {
    // Function to open the delete confirmation modal

    // Set the question to be deleted (questionId)
    questionToDelete = questionId;

    // Open the modal
    M.Modal.getInstance(deleteModal).open();
}

function finishModal() {
    const modal = document.querySelector('#modal-create');
    createForm.reset();
    createForm.removeAttribute('data-edit-id');

    document.getElementById("fake-options-container").innerHTML = "";
    fakeIndex = 0;

    M.Modal.getInstance(modal).close();
    updateAdminIcons();
}

function openEditModal(q) {
    const modal = document.querySelector('#modal-create');
    const form = document.querySelector('#create-form');

    form['question'].value = q.question;
    form['answer'].value = q.answer;

    updateModalCategorySelect(q.category);

    // Status switch (true/false)
    document.getElementById("status").checked = q.status === true;

    // Fake options
    const container = document.getElementById("fake-options-container");
    container.innerHTML = "";

    if (q.options) {
        q.options
            .filter(opt => opt !== q.answer)
            .forEach(opt => addFakeOptionField(opt));
    }

    M.updateTextFields();
    form.setAttribute('data-edit-id', q.id);
    
    M.Modal.getInstance(modal).open();
}

function showLoggedOptions(user) {
    if (!user) {
        document.querySelectorAll(".guest-only").forEach(btn => {
            btn.style.display = "block";
        });
        document.querySelectorAll(".logged-only").forEach(btn => {
            btn.style.display = "none";
        });
        document.querySelectorAll(".admin-only").forEach(btn => {
            btn.style.display = "none";
        });
        return;
    }

    db.collection('users').doc(user.uid).get().then(doc => {
        const data = doc.data();
        if (data) {
            document.querySelectorAll(".guest-only").forEach(btn => {
                btn.style.display = "none";
            });
            document.querySelectorAll(".logged-only").forEach(btn => {
                btn.style.display = "block";
            });
        }

        if (data && data.role === 'admin') {
            document.querySelectorAll(".admin-only").forEach(btn => {
                btn.style.display = "block";
            });
        }
    });
}

// signup
const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = signupForm['signup-email'].value;
    const password = signupForm['signup-password'].value;

    // signup user
    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        return db.collection('users').doc(cred.user.uid).set({
            name: signupForm['signup-name'].value,
            email: email,
            role: "common"
        });
    }).then(() => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('users').doc(user.uid).get().then(doc => {
                    const role = doc.data().role;
                    localStorage.setItem('userRole', role);
                });
            }
        });

        const modal = document.querySelector('#modal-signup');
        M.Modal.getInstance(modal).close();
        signupForm.reset();
        signupForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        signupForm.querySelector('.error').innerHTML = err.message;
    });
});

// logout
const logout = document.querySelector('#btn-logout');
logout.addEventListener('click', (e) => {
    e.preventDefault();
    auth.signOut();
});

// listen for auth status changes
auth.onAuthStateChanged((user) => {
    showLoggedOptions(user);
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // get user info
    const email = loginForm['login-email'].value;
    const password = loginForm['login-password'].value;

    auth.signInWithEmailAndPassword(email, password).then((cred) => {
        auth.onAuthStateChanged(user => {
            if (user) {
                db.collection('users').doc(user.uid).get().then(doc => {
                    const role = doc.data().role;
                    localStorage.setItem('userRole', role);
                });
            }
        });

        const modal = document.querySelector('#modal-login');
        M.Modal.getInstance(modal).close();
        loginForm.reset();
        loginForm.querySelector('.error').innerHTML = '';
    }).catch(err => {
        loginForm.querySelector('.error').innerHTML = err.message;
    });
});

// Add admin
const manageForm = document.querySelector('#manage-form');
manageForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.querySelector('#manage-email').value;

    db.collection('users')
        .where('email', '==', email)
        .get()
        .then(snapshot => {
            if (!snapshot.empty) {
                snapshot.forEach(doc => {
                    doc.ref.update({ role: 'admin' });
                });
                manageForm.reset();
                manageForm.querySelector('.error').innerHTML = '';
                M.Modal.getInstance(document.querySelector('#modal-manage-account')).close();
                M.toast({ html: 'Administrador adicionado com sucesso!', classes: 'green' });
            } else {
                manageForm.querySelector('.error').innerHTML = 'Nenhum usuário encontrado com esse email.';
            }
        })
        .catch(err => {
            console.error("Erro ao definir admin:", err);
            manageForm.querySelector('.error').innerHTML = 'Erro ao adicionar administrador.';
        });
});

// create new question or edit
const createForm = document.querySelector('#create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const editId = createForm.getAttribute('data-edit-id');

    const correct = createForm['answer'].value;    
    const fakeOptions = [...document.querySelectorAll('.fake-option-input')]
        .map(inp => inp.value.trim())
        .filter(v => v !== "");

    const options = [correct, ...fakeOptions];

    const questionData = {
        question: createForm['question'].value,
        answer: correct,
        category: createForm['category'].value,
        options,
        status: document.getElementById('status').checked
    };

    const action = editId
        ? db.collection('questions').doc(editId).update(questionData)
        : db.collection('questions').add(questionData);

    action.then(() => finishModal());
});

const deleteModal = document.querySelector('#modal-delete');
const deleteConfirmBtn = document.querySelector('#delete-confirm-btn');
const cancelDeleteBtn = document.querySelector('#cancel-delete-btn');

// Store the question to delete temporarily
let questionToDelete = null;

// Event listener for the "Delete" button in the confirmation modal
deleteConfirmBtn.addEventListener('click', () => {
    if (questionToDelete) {
        db.collection('questions').doc(questionToDelete).delete().then(() => {
            M.Modal.getInstance(deleteModal).close();
            questionToDelete = null;

            // Update admin icons after the modal action
            updateAdminIcons();
        }).catch(err => {
            console.error('Error deleting question:', err);
        });
    }
});

// Event listener for the "Cancel" button in the confirmation modal
cancelDeleteBtn.addEventListener('click', () => {
    M.Modal.getInstance(deleteModal).close();
    questionToDelete = null; 
});
