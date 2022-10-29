
exports.getIndexPage = ((req, res) => {
    res.status(200).render('index', { pageName: 'index'});
});