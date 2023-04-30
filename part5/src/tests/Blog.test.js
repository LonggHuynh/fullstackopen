import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from '../components/Blog'

test('renders blog title and author, but not URL or number of likes by default', () => {
    const blog = {
        title: 'Long',
        author: 'Longg',
        url: 'https://lol.com',
        likes: 5,
        user: {
            username: 'Long',
            name: 'Long'
        }
    }

    const { container } = render(<Blog blog={blog} />)

    expect(container.querySelector('.blog-title')).toHaveTextContent('Long')
    expect(container.querySelector('.blog-author')).toHaveTextContent('Longg')
    expect(container.querySelector('.blog-url')).not.toBeInTheDocument()
    expect(container.querySelector('.blog-likes')).not.toBeInTheDocument()
})

test('shows blog URL and number of likes when details button is clicked', () => {
    const blog = {
        title: 'Long',
        author: 'Longg',
        url: 'https://lol.com',
        likes: 5,
        user: {
            username: 'Long',
            name: 'Long'
        }
    }

    const { container } = render(<Blog blog={blog} />)
    const button = screen.getByText('View')
    const user = userEvent.setup()

    user.click(button)

    expect(container.querySelector('.blog-url')).toBeDefined()
    expect(container.querySelector('.blog-likes')).toBeDefined()
})

test('clicking the like button twice calls the event handler twice', async () => {
    const blog = {
        title: 'Long',
        author: 'Longg',
        url: 'https://lol.com',
        likes: 5,
        user: {
            username: 'Long',
            name: 'Long'
        }
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} addLike={mockHandler} />)
    const user = userEvent.setup()
    const viewButton = screen.getByText('View')
    await user.click(viewButton)

    const likeButton = screen.getByText('Like')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
