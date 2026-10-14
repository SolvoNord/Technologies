/* Only a public form ID belongs here. Never add an API key or a secret. */
window.SOLVONORD_CONFIG = Object.freeze({
  provider: "formsubmit",
  formsubmitActivated: true, // Email activation confirmed by the owner.
  formsubmitUploadMode: "native", // Owner confirmed receipt of the native-upload test image.
  formspreeId: "", // No second live delivery destination.
  formspreeUploads: false,
  testMode: false,
  email: "support@solvonord.com",
  formsubmitRecipient: "solvonord@gmail.com" // Keep the activated recipient until the new address is confirmed.
});
