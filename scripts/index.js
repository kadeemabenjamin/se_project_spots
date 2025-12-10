import { resetFormValidation } from "./validation.js";

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

const cardTemplate = document.querySelector("#card-template");
const cardsList = document.querySelector("#cards-list");

function createCard(cardData) {
  const cardElement = cardTemplate.content.firstElementChild.cloneNode(true);
  const cardImg = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector(".card__like-button");
  const deleteButton = cardElement.querySelector(".card__delete-button");
  cardImg.src = cardData.link;
  cardImg.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  likeButton.addEventListener("click", () => {
    likeButton.classList.toggle("card__like-button_active");
  });
  deleteButton.addEventListener("click", () => {
    const item = deleteButton.closest(".card");
    if (item) item.remove();
  });
  cardImg.addEventListener("click", () => {
    openImagePreview(cardData);
  });
  return cardElement;
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

const editProfileButton = document.querySelector(".profile__edit-btn");
const addPostButton = document.querySelector(".profile__add-btn");

const previewImage = previewModal.querySelector(".modal__image");
const previewCaption = previewModal.querySelector(".modal__caption");

function handleEsc(evt) {
  if (evt.key === "Escape") {
    const opened = document.querySelector(".modal_is-opened");
    if (opened) closeModal(opened);
  }
}

function overlayClickHandler(evt) {
  if (evt.target.classList && evt.target.classList.contains("modal")) {
    closeModal(evt.target);
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  modal.addEventListener("click", overlayClickHandler);
  document.addEventListener("keydown", handleEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  modal.removeEventListener("click", overlayClickHandler);
  document.removeEventListener("keydown", handleEsc);
}

document.querySelectorAll(".modal").forEach((modal) => {
  const closeBtn = modal.querySelector(".modal__close-btn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      closeModal(modal);
    });
  }
});

editProfileButton.addEventListener("click", () => {
  editProfileForm.querySelector("#profile-name-input").value =
    profileName.textContent;
  editProfileForm.querySelector("#profile-description-input").value =
    profileDescription.textContent;
  resetFormValidation(editProfileForm, {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "modal__submit-btn_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  });
  const inputs = Array.from(editProfileForm.querySelectorAll(".modal__input"));
  const submitBtn = editProfileForm.querySelector(".modal__submit-btn");
  const allValid = inputs.every((i) => i.validity.valid);
  if (submitBtn) {
    if (allValid) {
      submitBtn.classList.remove("modal__submit-btn_disabled");
      submitBtn.disabled = false;
    } else {
      submitBtn.classList.add("modal__submit-btn_disabled");
      submitBtn.disabled = true;
    }
  }
  openModal(editProfileModal);
});

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = editProfileForm.querySelector(
    "#profile-name-input"
  ).value;
  profileDescription.textContent = editProfileForm.querySelector(
    "#profile-description-input"
  ).value;
  closeModal(editProfileModal);
});

addPostButton.addEventListener("click", () => {
  openModal(newPostModal);
});

newPostForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = newPostForm.querySelector("#card-title-input").value.trim();
  const link = newPostForm.querySelector("#card-image-input").value.trim();
  const cardEl = createCard({ name, link });
  cardsList.prepend(cardEl);
  newPostForm.reset();
  resetFormValidation(newPostForm, {
    formSelector: ".modal__form",
    inputSelector: ".modal__input",
    submitButtonSelector: ".modal__submit-btn",
    inactiveButtonClass: "modal__submit-btn_disabled",
    inputErrorClass: "modal__input_type_error",
    errorClass: "modal__error_visible",
  });
  closeModal(newPostModal);
});

function openImagePreview(cardData) {
  previewImage.src = cardData.link;
  previewImage.alt = cardData.name;
  previewCaption.textContent = cardData.name;
  openModal(previewModal);
}
