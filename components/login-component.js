import { loginUser, authorizationUser } from "../api.js";

export const renderLoginComponent = ({ appEl, setToken, fetchTodosAndRender }) => {

	let isLoadingForm = true;

	const renderForm = () => {
		const appHtml = `
		<h1>Список задач</h1>
				<div class="form">
					<h3 class="form-title">Форма ${isLoadingForm ? "авторизации" : "регистрации"}</h3>
					<div class="form-row">
					${isLoadingForm ? "" : `Имя
					<input type="text" id="name-input" class="input" placeholder="Gleb" />
					<br>`}
						Логин
						<input type="text" id="login-input" class="input" placeholder="User" />
						<br>
						Пароль
						<input type="password" id="password-input" class="input" placeholder="Password" />
					</div>
					<br />
					<button class="button" id="login-button">${isLoadingForm ? "Войти" : "Зарегистрироваться"}</button>
					<button class="button" id="switching-button">Перейти ${isLoadingForm ? "к регистрации" : "ко входу"}</button>
				</div>`
		appEl.innerHTML = appHtml;

		document.getElementById("login-button")
			.addEventListener("click", () => {
				if (isLoadingForm) {
					const login = document.getElementById("login-input");
					const password = document.getElementById("password-input");

					if (!login.value) {
						alert("Enter login");
						return;
					}
					if (!password.value) {
						alert("Enter password");
						return;
					}

					loginUser({
						login: login.value,
						password: password.value,
					})
						.then((user) => {
							setToken(`Bearer ${user.user.token}`);
							fetchTodosAndRender();
						})
						.catch((error) => {
							alert("You entered not true login or password");
							console.log(error);
						})
				} else {
					const name = document.getElementById("name-input");
					const login = document.getElementById("login-input");
					const password = document.getElementById("password-input");

					if (!name.value) {
						alert("Enter name");
						return;
					}
					if (!login.value) {
						alert("Enter login");
						return;
					}
					if (!password.value) {
						alert("Enter password");
						return;
					}

					authorizationUser({
						name: name.value,
						login: login.value,
						password: password.value,
					})
						.then((user) => {
							setToken(`Bearer ${user.user.token}`);
							fetchTodosAndRender();
						})
						.catch((error) => {
							alert("User with such data already exists");
							console.log(error);
						})
				}

			})

		document.getElementById("switching-button")
			.addEventListener("click", () => {
				isLoadingForm = !isLoadingForm;
				renderForm();
			})
	}
	renderForm();
}