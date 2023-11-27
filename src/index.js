import { refs } from "./js/refs";
import { handleSubmitForm, showMoreImages } from "./js/handleSubmitForm";

refs.searchForm.addEventListener("submit", handleSubmitForm);

refs.btnMore.addEventListener("click", showMoreImages);

