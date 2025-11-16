// Ссылки на элементы
const album = document.getElementById("album");
const tracklist = document.getElementById("tracklist");
const modal = document.getElementById("modal");
const modalClose = document.getElementById("modal-close");
const cursor = document.getElementById("cursor");
const openSound = document.getElementById("open-sound");

let open = false;
let modalShown = false;

// Обработчик клика на обложке альбома
album.addEventListener("click", () => {
    open = !open;
    if (open) {
        tracklist.classList.add("open");
        openSound.play();  // Воспроизводим звук раскрытия
    } else {
        tracklist.classList.remove("open");
    }

    if (!modalShown) {
        modal.style.display = "flex";  // Показываем модальное окно
        modalShown = true;
    }
});

// Закрытие модального окна
modalClose.addEventListener("click", () => {
    modal.style.display = "none";
    modalShown = false;
});

// Кислотный курсор
document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX - 10}px`;
    cursor.style.top = `${e.clientY - 10}px`;
});
