export const CONTACT_MODAL_EVENT = "portfolio:open-contact";

export const openContactModal = () => {
  window.dispatchEvent(new Event(CONTACT_MODAL_EVENT));
};
