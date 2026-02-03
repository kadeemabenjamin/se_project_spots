import "./index.css";
import {
  resetFormValidation,
  validationConfig,
} from "../scripts/validation.js";

import streetViewImg from "../images/1-photo-by-moritz-feldmann-from-pexels.jpg";
import restaurantImg from "../images/2-photo-by-ceiline-from-pexels.jpg";
import outdoorCafeImg from "../images/3-photo-by-tubanur-dogan-from-pexels.jpg";
import bridgeImg from "../images/4-photo-by-maurice-laschet-from-pexels.jpg";
import valThorensImg from "../images/5-photo-by-van-anh-nguyen-from-pexels.jpg";
import isolatedHomeImg from "../images/6-photo-by-moritz-feldmann-from-pexels.jpg";

const initialCards = [
  { name: "Val Thorens", link: valThorensImg },
  { name: "Restaurant terrace", link: restaurantImg },
  { name: "An outdoor cafe", link: outdoorCafeImg },
  {
    name: "A very long bridge, over the forest and through the trees",
    link: bridgeImg,
  },
  { name: "Isolated home on the water", link: isolatedHomeImg },
  { name: "Street view through a window", link: streetViewImg },
];

const cardTemplate = document.querySelector("#card-template").content;
const cardsList = document.querySelector("#cards-list");

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

function closeWithEsc(evt) {
  if (evt.key !== "Escape") return;
  const openedModal = document.querySelector(".modal.modal_is-opened");
  if (openedModal) closeModal(openedModal);
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  document.addEventListener("keydown", closeWithEsc);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  document.removeEventListener("keydown", closeWithEsc);
}

function openImagePreview(cardData) {
  previewImage.src = cardData.link;
  previewImage.alt = cardData.name;
  previewCaption.textContent = cardData.name;
  openModal(previewModal);
}

function getCardElement(cardData) {
  const cardElement = cardTemplate.querySelector(".card").cloneNode(true);
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
    cardElement.remove();
  });

  cardImg.addEventListener("click", () => {
    openImagePreview(cardData);
  });

  return cardElement;
}

initialCards.forEach((cardData) => {
  cardsList.append(getCardElement(cardData));
});

document.querySelectorAll(".modal").forEach((modal) => {
  modal.addEventListener("mousedown", (evt) => {
    if (evt.target === modal) closeModal(modal);
  });

  const closeButton = modal.querySelector("[data-close]");
  if (closeButton)
    closeButton.addEventListener("click", () => closeModal(modal));
});

if (editProfileButton) {
  editProfileButton.addEventListener("click", () => {
    editProfileForm.name.value = profileName.textContent;
    editProfileForm.description.value = profileDescription.textContent;
    resetFormValidation(editProfileForm, validationConfig);
    openModal(editProfileModal);
  });
}

editProfileForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  profileName.textContent = editProfileForm.name.value;
  profileDescription.textContent = editProfileForm.description.value;
  closeModal(editProfileModal);
});

if (addPostButton) {
  addPostButton.addEventListener("click", () => {
    openModal(newPostModal);
  });
}

newPostForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const name = newPostForm.name.value;
  const link = newPostForm.link.value;

  cardsList.prepend(getCardElement({ name, link }));
  closeModal(newPostModal);

  newPostForm.reset();
  resetFormValidation(newPostForm, validationConfig);
});
