import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import methodOverride from "method-override";

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(express.static('public'));

var blogs = [
    {
      "author": "Malik",
      "content": "This is my first ever blog post, and I'm excited to share my thoughts and experiences with you. Summer has always been a special time for me, filled with adventures and memorable moments. From sunny beach days to evening bonfires under the stars, I've cherished every moment. Join me as I reflect on my summer experiences and the lessons learned along the way.",
      "id": 1,
      "createdTimeStamp": 1707560863442,
      "title": "Summer experience"
    },
    {
      "author": "Jasmine",
      "content": "As a digital nomad, I've had the privilege of exploring new horizons in the vast digital world. From remote work opportunities to embracing different cultures, every day brings a new adventure. Join me as I navigate the challenges and triumphs of life on the road, sharing insights and tips for fellow digital wanderers.",
      "id": 2,
      "createdTimeStamp": 1707560863443,
      "title": "Digital Nomad Adventures"
    },
    {
      "author": "Aiden",
      "content": "Storytelling is an art form that has captivated me since childhood. From fairy tales to epic sagas, stories have the power to transport us to different worlds and evoke a range of emotions. Join me as I delve into the intricacies of storytelling, exploring its impact on society and the human experience.",
      "id": 3,
      "createdTimeStamp": 1707560863444,
      "title": "Crafting Narratives"
    },
    {
      "author": "Sophie",
      "content": "In today's digital age, the intersection of technology and humanity is more relevant than ever. From artificial intelligence to social media, technology shapes our lives in profound ways. Join me as I examine the ethical implications of technology, seeking to find a balance between innovation and human values.",
      "id": 4,
      "createdTimeStamp": 1707560863445,
      "title": "Tech Ethics: Finding Balance"
    },
    {
      "author": "Ethan",
      "content": "In a world filled with complexity, I've found solace in the beauty of simplicity in design. From minimalist architecture to sleek interfaces, simplicity enhances both form and function. Join me as I explore the principles of minimalism in design, uncovering its timeless appeal and practical applications.",
      "id": 5,
      "createdTimeStamp": 1707560863446,
      "title": "Minimalism in Design"
    },
    {
      "author": "Liam",
      "content": "Exploring the wonders of nature has always been a passion of mine. From hiking through lush forests to gazing at star-filled skies, nature never fails to inspire awe. Join me as I embark on a journey of discovery, sharing stories and insights from the great outdoors.",
      "id": 6,
      "createdTimeStamp": 1707560863447,
      "title": "Nature's Beauty"
    },
    {
      "author": "Mia",
      "content": "As an avid foodie, I've had the pleasure of indulging in culinary delights from around the world. From street food stalls to fine dining restaurants, each meal tells a unique story. Join me as I explore the rich tapestry of flavors and cultures that make up the world of food.",
      "id": 7,
      "createdTimeStamp": 1707560863448,
      "title": "Culinary Adventures"
    },
    {
      "author": "Noah",
      "content": "The pursuit of knowledge is a lifelong journey that I am deeply passionate about. From delving into ancient philosophies to exploring cutting-edge scientific discoveries, there is always something new to learn. Join me as I dive into the depths of human understanding, seeking wisdom and insight along the way.",
      "id": 8,
      "createdTimeStamp": 1707560863449,
      "title": "Quest for Knowledge"
    },
    {
      "author": "Emma",
      "content": "Music has the power to transcend barriers and unite people from all walks of life. From classical symphonies to modern beats, music speaks to the soul in ways that words cannot. Join me as I explore the magic of music, sharing stories of passion, creativity, and inspiration.",
      "id": 9,
      "createdTimeStamp": 1707560863450,
      "title": "Harmony of Sounds"
    },
    {
      "author": "Oliver",
      "content": "Traveling opens up a world of possibilities, allowing us to experience new cultures and perspectives. From bustling cities to remote villages, each destination offers a glimpse into the beauty of diversity. Join me as I embark on adventures near and far, seeking to broaden my horizons and deepen my understanding of the world.",
      "id": 10,
      "createdTimeStamp": 1707560863451,
      "title": "Wanderlust Chronicles"
    },
    {
      "author": "Ava",
      "content": "Art has always been a source of inspiration and expression for me. From vibrant paintings to intricate sculptures, art has the power to evoke emotions and ignite the imagination. Join me as I explore the world of art, uncovering its beauty and significance in our lives.",
      "id": 11,
      "createdTimeStamp": 1707560863452,
      "title": "Artistic Visions"
    },
    {
      "author": "William",
      "content": "The written word holds a special place in my heart, serving as a gateway to new worlds and ideas. From classic novels to contemporary poetry, literature has the power to transport us to distant lands and provoke deep thought. Join me as I embark on a literary journey, discovering the magic of storytelling through the ages.",
      "id": 12,
      "createdTimeStamp": 1707560863453,
      "title": "Literary Escapes"
    },
    {
      "author": "Isabella",
      "content": "Fashion is more than just clothing; it's a form of self-expression and identity. From runway trends to street style, fashion reflects the ever-evolving nature of culture and society. Join me as I explore the world of fashion, uncovering its influences and celebrating its diversity.",
      "id": 13,
      "createdTimeStamp": 1707560863454,
      "title": "Fashion Forward"
    },
    {
      "author": "James",
      "content": "The bond between humans and animals is a testament to the power of companionship and love. From loyal dogs to majestic horses, animals enrich our lives in countless ways. Join me as I celebrate the beauty of the animal kingdom, sharing stories of friendship, courage, and resilience.",
      "id": 14,
      "createdTimeStamp": 1707560863455,
      "title": "Animal Tales"
    }
  ];

app.use(bodyParser.urlencoded({ extended: true }), morgan('dev'));
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));


// Get all blogs posts
app.get('/', (req, res) => {
    return res.render('index', {blogsList: blogs});
});

// Get blog post by ID
app.get('/blog/:id', (req, res) => {
    for (let blog of blogs) {
        if(blog["id"] == req.params.id){
            return res.render('blog', {title: blog.title, 
                content: blog.content, 
                author: blog.author,
                createdAt: new Date(blog.createdTimeStamp),
                updatedBy: blog.updatedBy,
                updatedTimeStamp: blog.updatedTimeStamp ? new Date(blog.updatedTimeStamp) : null,
                id: blog.id
            });
        }
    }
    return res.sendStatus(404);
});

// Add a new blog page
app.get('/add/blog', (req, res) => {
    res.render('addBlog.ejs');
});

// Create a new blog post
app.post('/blog', (req, res) => {
    const submit = req.body.submit;
    if(submit === "Cancel"){
      return res.redirect('/');
    }
    if(req.body["author"] == null || req.body["content"] == null || req.body["title"] == null){
        return res.status(400).send('Fields required left empty');
    }
    const blog = {"author": req.body["author"], "content": req.body["content"], "id": blogs.length + 1, "createdTimeStamp": new Date().getTime(), "title": req.body["title"]};
    blogs.push(blog);
    return res.redirect('/blog/' + blog.id);
});

// Edit blog page
app.get('/edit/blog/:id', (req, res) => {
    res.render('editBlog.ejs', {id: req.params.id});
});

// Update an existing blog 
app.put("/blog/:id", (req, res) => {
    const submit = req.body.submit;
    if(submit === "Cancel"){
      return res.redirect('/blog/' + req.params.id);
    }
    if(req.body["updatedBy"] == null || req.body["content"] == null){
        return res.status(400).send('Fields required left empty');
    }
    for (let blog of blogs) {
        if(blog["id"] == req.params.id){
            blog["content"] = req.body["content"];
            blog["updatedTimeStamp"] =  new Date().getTime();
            blog["updatedBy"] = req.body["updatedBy"];
            if(req.body["title"]){
                blog["title"] = req.body["title"];
            }
            console.log(`Blog ${req.params.id} updated successfully`);
            return res.redirect('/blog/' + req.params.id);
        }
    }
    return res.sendStatus(404);
});

// Deletes an existing blog
app.delete('/blog/:id', (req, res) => {
    for (const [index, blog] of blogs.entries()) {
        if (blog["id"] == req.params.id) {
            blogs.splice(index, 1);
            console.log(`Blog ${req.params.id} deleted successfully`);
            return res.redirect("/");
        }
    }
    return res.sendStatus(404);
});

app.listen(port, ()=>{
    console.log(`listening on port on port ${port}`);
});
