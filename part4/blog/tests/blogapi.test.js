const blogs = require('../utils/fake_blogs')
const supertest = require('supertest')
const mongoose = require('mongoose')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

console.log(blogs.blogs[0])

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

beforeEach(async () => {
    await Blog.deleteMany({})

    const blogObjects = blogs.blogs
        .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(note => note.save())
    await Promise.all(promiseArray)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(blogs.blogs.length)
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('id is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()

})

test('a valid blog can be added ', async () => {
    const newBlog = {
        content: 'async/await simplifies making async calls',
        important: true,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogs.blogs.length + 1)

})

describe('deletion of blog post', () => {
    test('delete a single blogpost', async () => {
        const blogsAtStart = await blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await blogsInDb()

        expect(blogsAtEnd).toHaveLength(blogs.blogs.length - 1)

        const titles = blogsAtEnd.map(r => r.title)

        expect(titles).not.toContain(blogToDelete.title)
    })
})

// describe('editing a blog post', () => {
//     test('edits a post', async () => {
//         const blogsAtStart = await blogsInDb()
//         const blogToEdit = blogsAtStart[0]

//         await api
//         .edit(`/api/blogs/${blogToEdit.id}`)

//     })
// })

afterAll(async () => {
    await mongoose.connection.close()
})