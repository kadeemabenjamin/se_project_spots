const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg"
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg"
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg"
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg"
  },
  {
    name: "Tunnel with morning light",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg"
  },
  {
    name: "Mountain house",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg"
  },
  {
    name: "Pexels Landscape",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg"
  }
];

const cardsList = document.getElementById("cards-list");
const cardTemplate = document.getElementById("card-template");

const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");

const editProfileBtn = document.querySelector(".profile__edit-btn");
const editProfileModal = document.getElementById("edit-profile-modal");
const editProfileFormEl = document.getElementById("edit-profile-form");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileNameInput = document.getElementById("profile-name-input");
const editProfileDescriptionInput = document.getElementById("profile-description-input");

const newPostBtn = document.querySelector(".profile__add-btn");
const newPostModal = document.getElementById("new-post-modal");
const newPostFormEl = document.getElementById("new-post-form");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostTitleInput = document.getElementById("card-title-input");
const newPostImageInput = document.getElementById("card-image-input");

const previewModal = document.getElementById("preview-modal");
const previewImage = document.getElementById("preview-image");
const previewCaption = document.getElementById("preview-caption");
const previewCloseBtn = previewModal.querySelector(".modal__close-btn");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  modal.setAttribute("aria-hidden", "false");
  document.addEventListener("keydown", onEscClose);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  modal.setAttribute("aria-hidden", "true");
  document.removeEventListener("keydown", onEscClose);
}

function onEscClose(e) {
  if (e.key === "Escape") {
    const opened = document.querySelector(".modal.modal_is-opened");
    if (opened) closeModal(opened);
  }
}

editProfileBtn.addEventListener("click", () => {
  openModal(editProfileModal);
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
});

editProfileCloseBtn.addEventListener("click", () => {
  closeModal(editProfileModal);
});

newPostBtn.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", () => {
  closeModal(newPostModal);
});

previewCloseBtn.addEventListener("click", () => {
  closeModal(previewModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileNameEl.textContent = editProfileNameInput.value.trim();
  profileDescriptionEl.textContent = editProfileDescriptionInput.value.trim();
  closeModal(editProfileModal);
}

function getCardElement(data) {
  const fragment = cardTemplate.content.cloneNode(true);
  const card = fragment.querySelector(".card");
  const title = fragment.querySelector(".card__title");
  const image = fragment.querySelector(".card__image");
  const likeBtn = fragment.querySelector(".card__like-button");
  const deleteBtn = fragment.querySelector(".card__delete-button");

  title.textContent = data.name;
  image.src = data.link;
  image.alt = data.name;

  likeBtn.addEventListener("click", () => {
    likeBtn.classList.toggle("card__like-button_active");
  });

  deleteBtn.addEventListener("click", () => {
    card.remove();
  });

  image.addEventListener("click", () => {
    previewCaption.textContent = data.name;
    previewImage.src = data.link;
    previewImage.alt = data.name;
    openModal(previewModal);
  });

  return fragment;
}

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const name = newPostTitleInput.value.trim();
  const link = newPostImageInput.value.trim();
  if (!name || !link) return;
  cardsList.prepend(getCardElement({ name, link }));
  newPostFormEl.reset();
  closeModal(newPostModal);
}

editProfileFormEl.addEventListener("submit", handleProfileFormSubmit);
newPostFormEl.addEventListener("submit", handleAddCardSubmit);

initialCards.forEach((item) => {
  cardsList.prepend(getCardElement(item));
});
