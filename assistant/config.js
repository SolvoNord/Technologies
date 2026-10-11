/* Only a public form ID belongs here. Never add an API key or a secret. */
window.SOLVONORD_CONFIG = Object.freeze({
  provider: "formsubmit",
  formsubmitActivated: true, // Email activation confirmed by the owner.
  formsubmitUploadMode: "email", // Switch to native only after inbox attachment verification.
  formspreeId: "mqpelgwz", // Previous provider, retained for an explicit fallback configuration.
  formspreeUploads: false,
  testMode: false,
  email: "solvonord@gmail.com"
});
