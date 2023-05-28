// jshint esversion: 6, node: true
import "./general";

const regeneratorRuntime = require("regenerator-runtime");

import validateRegistrationForm from "./services/formValidation/validateRegistrationForm";
import toastr from "toastr";
import "toastr/toastr.scss";

class Home {
	constructor() {
		this.$navbar = document.getElementById("navbar");
		this.$form = document.getElementById("registrationForm");
		this.$username = document.getElementById("username");
		this.$email = document.getElementById("email");
		this.$phone = document.getElementById("phone");
		this.$profession = document.getElementById("profession");
		this.$experience = document.getElementById("experience");
		this.$comment = document.getElementById("comment");
		this.$submit = document.getElementById("submit");
		this.$loadingIndicator = document.getElementById("loadingIndicator");
		this.onFormSubmit = this.onFormSubmit.bind(this);
		this.$form.onsubmit = this.onFormSubmit;

		this.checkValues();
		this.addEventListeners();
	}

	checkValues(i) {
		let resultsForm = this.getFormValues();
		let resultsValidated = validateRegistrationForm(resultsForm);

		this.highlightInputs(resultsValidated.result);

		if (i == 1) resultsValidated.isValid ? this.submitForm(resultsForm) : {};
	}

	addEventListeners() {
		this.$form.addEventListener("input", () => this.checkValues());
	}

	onFormSubmit(e) {
		e.preventDefault();

		this.checkValues(1);
	}

	getFormValues() {
		return {
			username: this.$username.value,
			email: this.$email.value,
			phone: this.$phone.value,
			profession: this.$profession.value,
			experience: document.querySelector('input[name="experience"]:checked').value,
			comment: this.$comment.value,
		};
	}

	resetForm() {
		this.$username.value = "";
		this.$email.value = "";
		this.$phone.value = "";
		this.$profession.value = "college";
		this.$experience.checked = true;
		this.$comment.value = "";
		this.checkValues();
	}

	highlightInputs(result) {
		// Username
		if (result.username) {
			this.$username.classList.add("is-valid");
			this.$username.classList.remove("is-invalid");
		} else {
			this.$username.classList.remove("is-valid");
			this.$username.classList.add("is-invalid");
		}

		// Email
		if (result.email) {
			this.$email.classList.add("is-valid");
			this.$email.classList.remove("is-invalid");
		} else {
			this.$email.classList.remove("is-valid");
			this.$email.classList.add("is-invalid");
		}

		// Phone
		if (result.phone) {
			this.$phone.classList.add("is-valid");
			this.$phone.classList.remove("is-invalid");
		} else {
			this.$phone.classList.remove("is-valid");
			this.$phone.classList.add("is-invalid");
		}

		// Profession
		if (result.profession) {
			this.$profession.classList.add("is-valid");
			this.$profession.classList.remove("is-invalid");
		} else {
			this.$profession.classList.remove("is-valid");
			this.$profession.classList.add("is-invalid");
			toastr.error("Profession value wasn't an acceptable value.");
		}

		// Experience
		if (result.experience === false) toastr.error("Experience value wasn't an acceptable value.");
	}

	submitForm(formValues) {
		this.toggleSubmissionVisibility(false);

		const requestOptions = {
			method: "POST",
			mode: "cors",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formValues)
		};

		fetch(SERVER_URL, requestOptions)
			.then(res => {
				if (res.status >= 200 && res.status < 300) {
					this.toggleSubmissionVisibility(true);
					toastr.success(`${formValues.username} was successfully registered.`);
					this.resetForm();
				} else {
					this.toggleSubmissionVisibility(true);
					toastr.error(`There was an error with the response status: ${res.status}.`);
				}
			})
			.catch(err => {
				this.toggleSubmissionVisibility(true);
				toastr.error(`There was an error: ${err}.`);
			});
	}

	toggleSubmissionVisibility(b) {
		if (b) {
			this.$submit.classList.remove("visually-hidden");
			this.$loadingIndicator.classList.add("visually-hidden");
		} else {
			this.$submit.classList.add("visually-hidden");
			this.$loadingIndicator.classList.remove("visually-hidden");
		}
	}
}

window.addEventListener("load", () => new Home());