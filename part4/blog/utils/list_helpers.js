const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((acc, blog) => {
        acc += blog.likes
        return acc
    }, 0)
}

const mostLiked = blogs => {
    counter = 0
    return blogs.reduce((acc, blog) => {
        if (blog.likes > counter) {
            { counter = blog.likes }
            acc = blog
        }
        return acc
    }, {})
}

module.exports = {
    dummy,
    totalLikes,
    mostLiked,
}





function mostLiked2(blogs) {
    return blogs.reduce(function (acc, blog) {
        if (blog.likes > acc.likes) {
            return { blog: blog, likes: blog.likes };
        } else {
            return acc;
        }
    }, { blog: null, likes: 0 }).blog;
}


