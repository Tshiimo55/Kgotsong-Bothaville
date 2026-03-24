const FORMSUBMIT_ENDPOINT = "https://formsubmit.co/ajax/pkoekoe@gmail.com";

function setFormResult(form, message, state) {
  const result = form.querySelector(".form-result");
  if (!result) return;
  if (!message) {
    result.hidden = true;
    result.textContent = "";
    result.className = "form-result";
    return;
  }
  result.textContent = message;
  result.className = `form-result ${state}`;
  result.hidden = false;
}

async function submitEmailForm(event) {
  event.preventDefault();
  const form = event.currentTarget;

  if (!form.reportValidity()) return;

  const submitButton = form.querySelector('[type="submit"]');
  const originalLabel = submitButton ? submitButton.textContent : "";
  const formData = new FormData(form);
  const interestField = form.querySelector('[name="interest_type"]');

  formData.append("_template", "table");
  formData.append("_captcha", "false");
  formData.append("_honey", "");

  if (interestField) {
    formData.set("_subject", `Kgotsong Website: ${interestField.value}`);
  }

  if (submitButton) {
    submitButton.disabled = true;
    submitButton.textContent = "Sending...";
  }

  setFormResult(form, "", "");

  try {
    const response = await fetch(FORMSUBMIT_ENDPOINT, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });

    const payload = await response.json().catch(() => ({}));

    if (!response.ok || payload.success === "false" || payload.success === false) {
      throw new Error(payload.message || "Submission failed.");
    }

    form.reset();

    const uploadLabel = document.getElementById("upload-label");
    if (uploadLabel) {
      uploadLabel.innerHTML = "Click to upload logo or photo<br><small style='color:rgba(255,255,255,0.72)'>JPG, PNG up to 5MB</small>";
    }

    setFormResult(
      form,
      form.dataset.successMessage || "Your submission has been sent successfully.",
      "success"
    );
  } catch (error) {
    setFormResult(
      form,
      "This form could not be sent right now. Please try again or email pkoekoe@gmail.com directly.",
      "error"
    );
  } finally {
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = originalLabel;
    }
  }
}

function activateSupportTabFromQuery() {
  const body = document.body;
  if (!body.classList.contains("support-page")) return;

  const params = new URLSearchParams(window.location.search);
  const tab = params.get("tab");
  if (!tab) return;

  const button = document.querySelector(`.tab-btn[data-tab="${tab}"]`);
  if (button && typeof openTab === "function") {
    openTab(tab, button);
  }
}

function activateEventInterestFromQuery() {
  const body = document.body;
  if (!body.classList.contains("events-page")) return;

  const params = new URLSearchParams(window.location.search);
  const interest = params.get("interest");
  if (!interest) return;

  const select = document.getElementById("interestType");
  if (select) {
    select.value = interest;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".js-email-form").forEach((form) => {
    form.addEventListener("submit", submitEmailForm);
  });

  activateSupportTabFromQuery();
  activateEventInterestFromQuery();
});
