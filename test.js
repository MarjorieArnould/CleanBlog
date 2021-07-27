const mongoose = require('mongoose')
const BlogPost = require('./models/BlogPost')

mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true, useUnifiedTopology: true }
);

BlogPost.create({
    title: 'Le super livre qui va nous servir de test',
    body: 'Il était une fois beaucoup de blabla'
},(error, blogpost) => {
    console.log(error, blogpost)
})