(() => {
    const elementSelectors = {
        playButton: '.hero__play',
        popup: '.popup',
        popupVideo: '.popup--video',
        popupClose: '.popup__close-icon-wrap'
    }

    document.querySelector(elementSelectors.playButton).addEventListener('click', () => {
        renderPopup();
    })
    document.querySelector('body').addEventListener('click', e => {
        if (e.target.closest(elementSelectors.popupClose)) {
            const popup = e.target.closest(elementSelectors.popup);
            popup.parentNode.removeChild(popup);
        }
    })

    const renderPopup = () => {
        const markup = `
            <div class="popup popup--video">
                <iframe src="https://www.youtube.com/embed/NpEaa2P7qZI?&autoplay=1" allowfullscreen class="popup__video"></iframe>
                <div class="popup__background"></div>
                <div class="popup__close-icon-wrap">
                    <img class="popup__close-icon" src="./imgs/icons/cross.svg">
                </div>
            </div>
        `;

        document.querySelector('body').insertAdjacentHTML('beforeend', markup);
    }
})()