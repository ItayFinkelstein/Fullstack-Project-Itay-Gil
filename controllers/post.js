const getPosts = async(req, res, next) => {
    res.send('get all posts')
}

const getPostById = (req, res) => {
    res.send(`get post of id : ${req.params.id}`);
}

const savePost = (req, res) => {
    res.send('save post : ' + JSON.stringify(req.body));
}

const updatePost = (req, res) => {
    res.send('put post : ' + JSON.stringify(req.body));
}

const deletePost = (req, res) => {
    res.send('delete post : ' + req.params.id);
}

module.exports = {getPosts, getPostById, savePost, updatePost, deletePost};