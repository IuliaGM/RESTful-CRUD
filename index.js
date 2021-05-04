const express = require('express');
const app = express();
const ejs = require('ejs')
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override')


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set(path.join(__dirname, 'views'));
app.set('views engine', 'ejs');



let posts = [
  {
    id: uuid(),
    user: 'Bella',
    title: '10 tips for your next trips',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, maxime et fugit saepe quo nemo veritatis ipsa doloribus quam pariatur velit. Molestiae, fuga vitae maiores aspernatur libero assumenda pariatur reiciendis.'
  },
  {
    id: uuid(),
    user: 'Linda',
    title: 'Your next holiday detination for 2021',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, maxime et fugit saepe quo nemo veritatis ipsa doloribus quam pariatur velit. Molestiae, fuga vitae maiores aspernatur libero assumenda pariatur reiciendis.'
  },
  {
    id: uuid(),
    user: 'Tom',
    title: 'How the pandemic will look like this winter',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, maxime et fugit saepe quo nemo veritatis ipsa doloribus quam pariatur velit. Molestiae, fuga vitae maiores aspernatur libero assumenda pariatur reiciendis.'
  },
  {
    id: uuid(),
    user: 'Billy',
    title: '5 tips to stay hydrated',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, maxime et fugit saepe quo nemo veritatis ipsa doloribus quam pariatur velit. Molestiae, fuga vitae maiores aspernatur libero assumenda pariatur reiciendis.'
  },
]

//__RESTfull compliant routes for performing CRUD operations
//INDEX route: GET /comments - list all comments;
//CREATE route: POST /comments - create a new comment;
//SHOW route: GET /comments/:id - Get one comment(using ID);
//UPDATE route: PATCH /comments/:id/edit - Update one comment;
//DESTROY route: DELETE /comments/:id - Destroy one comment;
// __replacing posts with comments

//index route
app.get('/posts', (req, res) => {
  res.render('posts/index.ejs', { posts })
})

//Create route
app.get('/posts/new', (req, res) => {
  res.render('posts/new.ejs')
})

app.post('/posts', (req, res) => {
  console.log(req.body);
  const { user, title, text } = req.body;
  posts.push({ user, title, text, id: uuid() })
  res.redirect('/posts');
})

//Show route (Read)
app.get('/posts/:id', (req, res) => {
  const { id } = req.params;
  const singlePost = posts.find(user => user.id === id);
  res.render('posts/show.ejs', { singlePost })
})

//Update route
app.patch('/posts/:id', (req, res) => {
  const { id } = req.params;
  const newTitle = req.body.title;
  const newText = req.body.text;
  const oldPost = posts.find(user => user.id === id)
  oldPost.title = newTitle;
  oldPost.text = newText;
  res.redirect('/posts')
})

//Update route method-override
app.get('/posts/:id/edit', (req, res) => {
  const { id } = req.params;
  const singlePost = posts.find(user => user.id === id);
  res.render('posts/edit.ejs', { singlePost })
})

//Delete route
app.delete('/posts/:id', (req, res) => {
  const { id } = req.params;
  posts = posts.filter(user => user.id !== id);
  res.redirect('/posts')
})







app.listen(8080, () => {
  console.log('On port 8080!')
})