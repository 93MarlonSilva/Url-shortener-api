const postUrl = {
    posts: [
      {
        id: 1,
        content: $criaPost
      }
    ],
    readPosts() {
        postUrl.posts.forEach(({content}) => {
        postUrl.criaPost({ content: content });
        })
        
    },

    criaPost(dados) {
       postUrl.posts.push({
       id: postUrl.posts.length + 1,
       content: dados.content
       });
    }
};

// Get data form
const $meuForm = document.querySelector('form');


// Crud: Read
postUrl.readPosts();

// Crud: Create
$meuForm.addEventListener('submit', function criaPost(infos) {
    infos.preventDefault();
    const $campoCriaPost = document.querySelector('input[name = "postUrl"]');
    postUrl.criaPost({content: $campoCriaPost});

    $campoCriaPost.value = '';
})

// Crud: Delete