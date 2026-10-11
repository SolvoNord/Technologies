/* Only a public form ID belongs here. Never add an API key or a secret. */
window.SOLVONORD_CONFIG = Object.freeze({
  provider: "formsubmit",
  formsubmitActivated: true, // Email activation confirmed by the owner.
  formspreeId: "mqpelgwz", // Previous provider, retained for an explicit fallback configuration.
  formspreeUploads: false,
  testMode: false,
  email: "solvonord@gmail.com"
});
