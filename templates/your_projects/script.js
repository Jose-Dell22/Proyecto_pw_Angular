function showModal(description) {
    const modal = document.createElement('div');
    modal.classList.add('modal');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    const closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.textContent = '×';
    closeButton.onclick = () => {
        document.body.removeChild(modal);
    };

    modalContent.appendChild(closeButton);
    const modalText = document.createElement('p');
    modalText.textContent = description;
    modalContent.appendChild(modalText);
    modal.appendChild(modalContent);

    document.body.appendChild(modal);
}

document.addEventListener('click', function (event) {
    if (event.target.classList.contains('modal')) {
        document.body.removeChild(event.target);
    }
});
