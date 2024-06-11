import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../components/Blog'
import { expect, test } from 'vitest'


describe('<Blog />', () => {
  const user = {
    username: 'uname',
    name: 'kimmo'
  }

  const blog = {
    title: 'titteli',
    author: 'rehtori',
    url: 'uuäräl',
    likes: 3,
    user: user
  }

  test('initially renders only author and title', () => {
    render(<Blog blog={blog} />)
    const title = screen.queryByText('titteli', { exact: false })
    const author = screen.queryByText('rehtori', { exact: false })
    expect(title).toBeDefined()
    expect(author).toBeDefined()

    const url = screen.queryByText('uuäräl')
    const likes = screen.queryByText('3')
    expect(url).toBeNull()
    expect(likes).toBeNull()
  })

  test('renders other info after button is pressed', async () => {
    render(
      <Blog user={user} blog={blog} />
    )

    const mockUser = userEvent.setup()
    const button = screen.getByText('view')
    await mockUser.click(button)

    const url = screen.queryByText('uuäräl')
    const likes = screen.queryByText('3', { exact: false })
    const userField = screen.queryAllByText(user.name)
    expect(url).not.toBeNull()
    expect(likes).not.toBeNull()
    expect(userField).not.toBeNull()

    const title = screen.queryByText('titteli', { exact: false })
    const author = screen.queryByText('rehtori', { exact: false })
    expect(title).toBeDefined()
    expect(author).toBeDefined()
  })
})