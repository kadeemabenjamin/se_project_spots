import { enableValidation, resetFormValidation } from "./validation.js";

const validationConfig = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-btn",
  inactiveButtonClass: "modal__submit-btn_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(validationConfig);

const initialCards = [
  {
    name: "Val Thorens",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
  },
  {
    name: "Restaurant terrace",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
  },
  {
    name: "An outdoor cafe",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
  },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-nussbaumer-from-pexels.jpg",
  },
  {
    name: "Isolated home on the water",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-tom-swinnen-from-pexels.jpg",
  },
  {
    name: "Street view through a window",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-dmitry-zvolskiy-from-pexels.jpg",
  },
];

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector("#cards-list");

function createCard(cardData) {
  const card = cardTemplate.cloneNode(true);
  const cardImg = card.querySelector(".card__image");
  const cardTitle = card.querySelector(".card__title");
  const likeButton = card.querySelector(".card__like-button");
  const deleteButton = card.querySelector(".card__delete-button");

  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });

  deleteButton.addEventListener("click", () => {
    card.remove();
  });

  cardImg.addEventListener("click", () => {
    openImagePreview(cardData);
  });

  return card;
}

function renderInitialCards() {
  initialCards.forEach((item) => {
    cardsList.append(createCard(item));
  });
}

renderInitialCards();

const editProfileModal = document.querySelector("#edit-profile-modal");
const newPostModal = document.querySelector("#new-post-modal");
const previewModal = document.querySelector("#preview-modal");

const editProfileForm = document.querySelector("#edit-profile-form");
const newPostForm = document.querySelector("#new-post-form");

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const editProfileButton = document.querySelector("#profile-edit-btn");
const addPostButton = document.querySelector(".profile__add-button");

const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", closeWithEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", closeWithEsc);
}

function closeWithEsc(evt) {
  if (evt.key === "Escape") {
    const opened = document.querySelector(".modal_is-opened");
    if (opened) closeModal(opened);
  }
}

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("modal_is-opened")) {
      closeModal(modal);
    }
  });
  const closeBtn = modal.querySelector(".modal__close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => closeModal(modal));
  }
});

editProfileButton.addEventListener("click", () => {
  editProfileForm.name.value = profileName.textContent;
  editProfileForm.description.value = profileDescription.textContent;
  resetFormValidation(editProfileForm, validationConfig);
  openModal(editProfileModal);
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = editProfileForm.name.value;
  profileDescription.textContent = editProfileForm.description.value;
  closeModal(editProfileModal);
});

addPostButton.addEventListener("click", () => {
  newPostForm.reset();
  resetFormValidation(newPostForm, validationConfig);
  openModal(newPostModal);
});

newPostForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = newPostForm.title.value;
  const link = newPostForm.link.value;
  const newCard = createCard({ name, link });
  cardsList.prepend(newCard);
  closeModal(newPostModal);
});

function openImagePreview(cardData) {
  previewImage.src = cardData.link;
  previewCaption.textContent = cardData.name;
  openModal(previewModal);
}
