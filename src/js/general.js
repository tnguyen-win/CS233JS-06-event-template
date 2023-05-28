/* jshint esversion: 6 */
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/styles.css";
import "bootstrap";

export function displayNavbar() {
	let p;
	let h;
	const n = document.getElementById("navbar");

	h = window.location.hostname === "localhost" ? "/" : window.location.hostname === "citstudent.lanecc.edu" ? "/~nguyent409/CS233JS/lab06/" : window.location.hostname === "citstudent.lanecc.net" ? "/~nguyent409/CS233JS/lab06/" : {};
	p = location.pathname === `${h}` ? [" active", "", ""] : location.pathname === `${h}status.html` ? ["", " active", ""] : location.pathname === `${h}about.html` ? ["", "", " active"] : ["", "", ""];

	n.innerHTML = `
		<nav class="navbar navbar-expand-sm bg-primary navbar-dark">
			<div class="container-fluid">
				<ul class="navbar-nav">
					<li class="navbar-brand">Event Application</li>
					<li class="nav-item">
						<a class="nav-link${p[0]}" href="./">Home</a>
					</li>
					<li li class="nav-item">
						<a class="nav-link${p[1]}" href="./status.html">Status</a>
					</li>
					<li class="nav-item">
						<a class="nav-link${p[2]}" href="./about.html">About</a>
					</li>
				</ul>
			</div>
		</nav>
	`
}

displayNavbar();