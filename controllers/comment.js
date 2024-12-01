const getComments = (req, res) => {
    if (req.query.id != undefined) {
        res.send(`find all comments related to ${req.query.id}`);
    } else {
        res.send('get all comments');
    }
}

const getCommentById = (req, res) => {
    res.send(`get comment of id : ${req.params.id}`);
}

const postComment = (req, res) => {
    res.send('post comment : ' + JSON.stringify(req.body));
}

const putComment = (req, res) => {
    res.send('put comment : ' + JSON.stringify(req.body));
}

const deleteComment = (req, res) => {
    res.send('delete comment : ' + req.params.id);
}

module.exports = {getComments, getCommentById, postComment, putComment, deleteComment}