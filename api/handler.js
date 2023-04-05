document.addEventListener('DOMContentLoaded', function () {
	const logOutButton = document.querySelector('#log-out-button')
	logOutButton.addEventListener('click', () => {
		fetch('http://localhost:3000/api/log-out', {
			method: 'POST',
		})
	})
})

const form = document.querySelector('#quote-form')
form.addEventListener('submit', event => {
	event.preventDefault()

	const name = form.elements.name.value
	const email = form.elements.email.value
	const message = form.elements.message.value
	const data = new URLSearchParams()

	data.append('name', name)
	data.append('email', email)
	data.append('message', message)

	fetch('http://localhost:3000/api/contact', {
		method: 'POST',
		body: data,
	})
})
