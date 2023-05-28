// jshint esversion: 6, node: true, -W031
import "./general";

const regeneratorRuntime = require("regenerator-runtime");

import { Chart, registerables } from "chart.js";

class Status {
	constructor() {
		Chart.register(...registerables);

		this.$loadingIndicator = document.getElementById("loadingIndicator");
		this.$errorMessage = document.getElementById("loadingError");
		this.$tabArea = document.getElementById("tabArea");
		this.$professionTab = document.getElementById("professionTab");
		this.$experienceTab = document.getElementById("experienceTab");
		this.$chartArea = document.getElementById("chartArea");
		this.$professionCanvas = document.getElementById("professionChart");
		this.$experienceCanvas = document.getElementById("experienceChart");
		this.service = {
			allData: [],
			professionData: [],
			experienceData: []
		};
		this.loadData();
		this.addEventListeners();
	}

	groupData(data, property) {
		return data.map(val => val[property]).reduce((acc, val, i) => {
			acc[val] = (acc[val] || 0) + 1;

			return acc;
		}, {}
		);
	}

	loadData() {
		fetch(SERVER_URL)
			.then((res) => res.ok ? res.json() : (() => { throw new Error(res.status); })())
			.then(data => {
				this.allData = data;
				this.professionData = this.groupData(data, "profession");
				this.experienceData = this.groupData(data, "experience");
				this.$loadingIndicator.classList.add("visually-hidden");
				this.$tabArea.classList.remove("visually-hidden");
				this.$chartArea.classList.remove("visually-hidden");
				this.loadProfession();
				this.loadExperience();
			})
			.catch(err => {
				this.$loadingIndicator.classList.add("visually-hidden");
				this.$errorMessage.classList.remove("visually-hidden");
				console.log(`[ERROR] ${err}.`);
			});

	}

	addEventListeners() {
		this.$professionTab.onclick = this.loadProfession.bind(this);
		this.$experienceTab.onclick = this.loadExperience.bind(this);
	}

	hideCharts() {
		this.$experienceTab.classList.remove("active");
		this.$professionTab.classList.remove("active");
		this.$professionCanvas.classList.add("visually-hidden");
		this.$experienceCanvas.classList.add("visually-hidden");
	}

	loadExperience(e = null) {
		if (e) e.preventDefault();

		this.hideCharts();
		this.$experienceCanvas.classList.remove("visually-hidden");
		this.$experienceTab.classList.add("active");

		const chartData = {
			datasets: [{
				data: [this.experienceData.beginner, this.experienceData.intermediate, this.experienceData.advanced],
				backgroundColor: [
					"rgba(255, 99, 132, 0.6)",
					"rgba(54, 162, 235, 0.6)",
					"rgba(255, 206, 86, 0.6)"
				],
				borderColor: [
					"white",
					"white",
					"white"
				],
				borderWidth: 1
			}],
			labels: [
				"Beginner",
				"Intermediate",
				"Advanced"
			]
		};

		try {
			this.myChart = new Chart(this.$experienceCanvas, {
				type: "pie",
				data: chartData,
				options: {}
			});
		} catch { }
	}

	loadProfession(e = null) {
		if (e) e.preventDefault();

		this.hideCharts();
		this.$professionCanvas.classList.remove("visually-hidden");
		this.$professionTab.classList.add("active");

		const chartData = {
			datasets: [{
				data: [this.professionData.school, this.professionData.college, this.professionData.trainee, this.professionData.employee],
				backgroundColor: [
					"rgba(255, 99, 132, 0.6)",
					"rgba(54, 162, 235, 0.6)",
					"rgba(255, 206, 86, 0.6)"
				],
				borderColor: [
					"white",
					"white",
					"white"
				],
				borderWidth: 1
			}],
			labels: [
				"School Students",
				"College Students",
				"Trainees",
				"Employees"
			]
		};

		try {
			this.myChart = new Chart(this.$professionCanvas, {
				type: "pie",
				data: chartData,
				options: {}
			});
		} catch { }
	}
}

window.addEventListener("load", () => new Status());