const host = "https://webdev-hw-api.vercel.app/api/v2/todos";

export const getTodo = ({ token }) => {
	return fetch(host, {
		method: "GET",
		headers: {
			Authorization: token,
		},
	})
		.then((response) => {
			if (response.status === 401) {
				// token = prompt("Введите верный пароль");
				// fetchTodosAndRender();
				throw new Error("Нет авторизации");
			}
			return response.json();
		})
}

export const addTodo = ({ token, text }) => {
	return fetch(host, {
		method: "POST",
		body: JSON.stringify({
			text,
		}),
		headers: {
			Authorization: token,
		},
	})
		.then((response) => {
			return response.json();
		})
}

export const deleteTodo = ({ token, id }) => {
	return fetch("https://webdev-hw-api.vercel.app/api/todos/" + id, {
		method: "DELETE",
		headers: {
			Authorization: token,
		},
	})
		.then((response) => {
			return response.json();
		})
}

export const loginUser = ({ login, password }) => {
	return fetch("https://webdev-hw-api.vercel.app/api/user/login", {
		method: "POST",
		body: JSON.stringify({
			login,
			password,
		})
	})
		.then((response) => {
			if (response.status === 400) {
				throw new Error("Entered not true login or password");
			}
			return response.json();
		})
}

export const authorizationUser = ({ name, login, password }) => {
	return fetch("https://webdev-hw-api.vercel.app/api/user", {
		method: "POST",
		body: JSON.stringify({
			name,
			login,
			password,
		})
	})
		.then((response) => {
			if (response.status === 400) {
				throw new Error("User with such data already exists");
			}
			return response.json();
		})
}