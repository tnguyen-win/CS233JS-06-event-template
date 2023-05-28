export default function validateRegistrationForm(formValues) {
	const result = {
		username: validateUserName(formValues.username),
		email: validateEmail(formValues.email),
		phone: validatePhone(formValues.phone),
		profession: validateProfession(formValues.profession),
		experience: validateExperience(formValues.experience),
	};

	let field, isValid = true;

	for (field in result) isValid = isValid && result[field];

	return {
		isValid,
		result,
	};

}

function validateUserName(name) {
	/*
		[USED SOURCES]
		1. Regular expression = https://www.sitepoint.com/using-regular-expressions-to-check-string-length/
		2. Maximum 15 characters suggestion = https://www.goldfries.com/computing/choosing-your-social-media-username/
	*/
	const r = /^[a-zA-Z]{3,15}$/;

	return r.test(name);
}

function validateEmail(email) {
	/*
		[USED SOURCES]
		• Regular expression = https://www.w3resource.com/javascript/form/email-validation.php
	*/
	const r = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

	return r.test(email);
}

function validatePhone(phone) {
	const r = /^\d{3}-\d{3}-\d{4}$/;

	return r.test(phone);
}

function validateProfession(profession) {
	const r = ["school", "college", "trainee", "employee"];

	return r.includes(profession) ? true : false;
}

function validateExperience(experience) {
	/*
		[USED SOURCES]
		• https://stackoverflow.com/a/38075457
	*/
	const r = [/beginner/, /intermediate/, /advance/];

	return r.some(re => re.test(experience));
}