const login = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'login' }).click()
}

const createUser = async (request, username, name, password) => {
  await request.post('/api/users', {
    data: {
      name: name,
      username: username,
      password: password
    }
  })
}

const postBlog = async (page, title, author, url) => {
  await page.getByRole('button', { name: 'Create new blog' }).click()
  await page.getByTestId('titlefield').fill(title)
  await page.getByTestId('authorfield').fill(author)
  await page.getByTestId('urlfield').fill(url)
  await page.getByRole('button', { name: 'create' }).click()
  await page.getByText(`${title} - ${author}`).waitFor()
}

module.exports =  { login, postBlog, createUser }