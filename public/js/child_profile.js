const cardsContainer = document.getElementById('cards');
const emptyState = document.getElementById('empty-state');
const modalOverlay = document.getElementById('modalOverlay');
const childForm = document.getElementById('childForm');
const addBtn = document.querySelector('.add-btn');
const cancelBtn = document.getElementById('cancelBtn');

let children = JSON.parse(localStorage.getItem('ak_children')) || [];
let editingIndex = null;

function saveChildren() {
    localStorage.setItem('ak_children', JSON.stringify(children));
}

function updateEmptyState() {
    emptyState.style.display = children.length === 0 ? 'block' : 'none';
}

function getChildPhoto(child) {
    if (child.photo) return child.photo;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="#23608c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="6" ry="6" fill="#eaf7ff"/>
            <circle cx="12" cy="9" r="4" fill="#a4cfe8"/>
            <path d="M4.5,20.5c1.5-3 4.5-5.5 7.5-5.5s6,2.5 7.5,5.5" fill="#bbdef7"/>
        </svg>
    `);
}

function calculateAge(dobString) {
    if (!dobString) return 'Unknown';
    const today = new Date();
    const dob = new Date(dobString);
    if (isNaN(dob)) return 'Unknown';

    let years = today.getFullYear() - dob.getFullYear();
    let months = today.getMonth() - dob.getMonth();
    if (today.getDate() < dob.getDate()) {
        months -= 1;
    }
    if (months < 0) {
        years -= 1;
        months += 12;
    }

    const yearsText = years > 0 ? `${years} year${years > 1 ? 's' : ''}` : '';
    const monthsText = months > 0 ? `${months} month${months > 1 ? 's' : ''}` : '';
    return [yearsText, monthsText].filter(Boolean).join(', ') || '0 months';
}

function renderChildren() {
    cardsContainer.innerHTML = '';

    if (children.length === 0) {
        updateEmptyState();
        return;
    }

    children.forEach((child, index) => {
        const card = document.createElement('article');
        card.className = 'child-card';

        const ageText = calculateAge(child.dob);

        card.innerHTML = `
            <div class="child-avatar"><img src="${getChildPhoto(child)}" alt="${child.name} photo"></div>
            <h3>${child.name}</h3>
            <div class="child-meta">
                <div><i class="ri-bar-chart-line"></i><strong>Age:</strong> ${ageText}</div>
                <div><i class="ri-gender-transgender"></i><strong>Gender:</strong> ${child.gender}</div>
                <div><i class="ri-award-line"></i><strong>Level:</strong> ${child.level}</div>
                <div><i class="ri-timer-flash-line"></i><strong>Experience:</strong> ${child.experience || 'Not set'}</div>
                <div><i class="ri-heart-pulse-line"></i><strong>Medical:</strong> ${child.medical || 'None'}</div>
            </div>
            <div class="detail-block">
                <strong><i class="ri-sun-line"></i> Nap Schedule:</strong>
                <pre class="nap-schedule">${child.nap || 'Not set'}</pre>
            </div>
            <div class="card-actions">
                <button class="btn-sm btn-edit" data-action="edit" data-index="${index}"><i class="ri-edit-2-line"></i> Edit</button>
                <button class="btn-sm btn-delete" data-action="delete" data-index="${index}"><i class="ri-delete-bin-6-line"></i> Delete</button>
            </div>
        `;

        cardsContainer.appendChild(card);
    });

    const addCard = document.createElement('article');
    addCard.className = 'add-card';
    addCard.innerHTML = `
        <div class="add-circle" id="addCardBtn">+</div>
        <label>Add child profile</label>
    `;
    cardsContainer.appendChild(addCard);

    const addCardBtn = document.getElementById('addCardBtn');
    if (addCardBtn) addCardBtn.addEventListener('click', () => addBtn.click());

    updateEmptyState();
}

function openModal() {
    modalOverlay.classList.remove('hidden');
}

function closeModal() {
    modalOverlay.classList.add('hidden');
    childForm.reset();
    editingIndex = null;
    document.getElementById('previewImage').src = 'https://via.placeholder.com/160/9fc9dd/ffffff?text=Preview';
    pictureInput.value = '';
}

async function getPhotoDataUrl(fileInput, existingPhoto) {
    const file = fileInput.files[0];
    if (!file) return existingPhoto || null;

    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
    });
}

function populateForm(child) {
    document.getElementById('childName').value = child.name;
    document.getElementById('childDob').value = child.dob;
    document.getElementById('childGender').value = child.gender;
    document.getElementById('childLevel').value = child.level;
    document.getElementById('childExperience').value = child.experience || '';
    document.getElementById('childMedical').value = child.medical || '';
    document.getElementById('childNap').value = child.nap || '';
    document.getElementById('previewImage').src = getChildPhoto(child);
}

function handlePreviewImage() {
    const pictureInput = document.getElementById('childPicture');
    const previewImage = document.getElementById('previewImage');

    if (pictureInput.files && pictureInput.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
            previewImage.src = e.target.result;
        };
        reader.readAsDataURL(pictureInput.files[0]);
    } else {
        previewImage.src = 'https://via.placeholder.com/160/9fc9dd/ffffff?text=Preview';
    }
}

const pictureInput = document.getElementById('childPicture');
pictureInput.addEventListener('change', handlePreviewImage);

addBtn.addEventListener('click', () => {
    editingIndex = null;
    childForm.reset();
    document.getElementById('previewImage').src = 'https://via.placeholder.com/160/9fc9dd/ffffff?text=Preview';
    pictureInput.value = '';
    openModal();
});

cancelBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
});

childForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('childName').value.trim();
    const dob = document.getElementById('childDob').value;
    const gender = document.getElementById('childGender').value;
    const level = document.getElementById('childLevel').value;
    const experience = document.getElementById('childExperience').value.trim();
    const medical = document.getElementById('childMedical').value.trim();
    const nap = document.getElementById('childNap').value.trim();
    const photoInput = document.getElementById('childPicture');

    if (!name || !dob || !gender || !level) return;

    const existingPhoto = editingIndex !== null ? children[editingIndex].photo : null;
    const photo = await getPhotoDataUrl(photoInput, existingPhoto);

    const childData = { name, dob, gender, level, experience, medical, nap, photo };

    if (editingIndex === null) {
        children.push(childData);
    } else {
        children[editingIndex] = childData;
    }

    saveChildren();
    renderChildren();
    closeModal();
});

cardsContainer.addEventListener('click', (e) => {
    const action = e.target.dataset.action;
    if (!action) return;

    const index = Number(e.target.dataset.index);
    if (Number.isNaN(index)) return;

    if (action === 'delete') {
        children.splice(index, 1);
        saveChildren();
        renderChildren();
        return;
    }

    if (action === 'edit') {
        editingIndex = index;
        populateForm(children[index]);
        openModal();
    }
});

renderChildren();
