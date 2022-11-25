module.exports = (req, res, next) => {
    console.log(req.session.userID)
    if (req.session.userID) next();
    else res.redirect("/");
}