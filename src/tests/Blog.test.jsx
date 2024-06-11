import { render, screen } from '@testing-library/react'
import Blog from '../components/Blog'
import { expect, test } from 'vitest'

describe('<Blog />', () => {
  test('initially renders only author and title', () => {
    const blog = {
      title: 'titteli',
      author: 'rehtori',
      url: 'uuäräl',
      likes: 0
    }

    render(<Blog blog={blog} />)
    const title = screen.queryByText('titteli', { exact: false })
    const author = screen.queryByText('rehtori', { exact: false })
    expect(title).toBeDefined()
    expect(author).toBeDefined()

    const url = screen.queryByText('uuäräl', { exact: false })
    expect(url).toBeNull()
  })
})