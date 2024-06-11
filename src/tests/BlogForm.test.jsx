import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from '../components/BlogForm'
import { expect } from 'vitest'

describe('<BlogForm />', async () => {
  test('post method is called with right parameters', async () => {
    const addBlog = vi.fn()

    const container = render(
      <BlogForm addBlog={addBlog} />
    ).container

    const user = userEvent.setup()

    const fields = ['Title', 'Author', 'Url']

    for (let name of fields) {
      const field = container.querySelector(`input[name="${name}"]`)
      await user.type(field, `typed ${name}`)
    }

    const submitButton = screen.getByText('create')
    await user.click(submitButton)

    expect(addBlog.mock.calls).toHaveLength(1)
    for (let name of fields) {
      expect(addBlog.mock.calls[0][0][name.toLowerCase()]).toBe(`typed ${name}`)
    }
  })
})