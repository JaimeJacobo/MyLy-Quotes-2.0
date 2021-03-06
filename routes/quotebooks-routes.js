const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Quotebook = require('../models/Quotebook');
const ensureLogin = require('connect-ensure-login');
const Quote = require('../models/Quote');

router.get('/new-quotebook', ensureLogin.ensureLoggedIn('/user/login'), (req, res) => {
	res.render('users/newQuotebook', { user: req.user });
});

router.post('/new-quotebook', (req, res, next) => {
	Quotebook.create(req.body)
		.then((theNewQuotebook) => {
			User.findById(req.user.id)
				.then((theUser) => {
					theUser.quotebooks.push(theNewQuotebook);
					theUser.save();
				})
				.catch((err) => {
					next(err);
				});
			res.redirect('/user/all-my-quotes');
		})
		.catch((err) => {
			next(err);
		});
});

router.get('/all-my-quotes', ensureLogin.ensureLoggedIn('/user/login'), (req, res) => {
	User.findById(req.user._id)
		.populate('quotebooks')
		.then((theUser) => {
			res.render('users/allMyQuotes', { quotes: theUser.quotebooks });
		})
		.catch((err) => {
			next(err);
		});
});

router.get('/quotes/details/:id', (req, res, next) => {
	Quotebook.findById(req.params.id)
		.populate('quotes')
		.then((quotebookFromDB) => {
			res.render('quotes/quotes-details', { quotebook: quotebookFromDB });
		})
		.catch((err) => {
			next(err);
		});
});

router.post('/addQuote/:id', (req, res, next) => {
	Quote.create({
		name: req.body.quoteInput,
		song: req.body.songInput,
		artist: req.body.artistInput,
		quotebook: req.params.id
	})
		.then((createdQuote) => {
			Quotebook.findByIdAndUpdate(req.params.id, { $push: { quotes: createdQuote._id } })
				.then((updatedQuotebook) => {
					res.redirect(`/user/quotes/details/${updatedQuotebook._id}`);
				})
				.catch((err) => {
					next(err);
				});
		})
		.catch((err) => {
			next(err);
		});
});

router.post('/deleteQuote/:id/:quotebookID', (req, res, next) => {
	Quote.findByIdAndDelete(req.params.id)
		.then(() => {
			res.redirect(`/user/quotes/details/${req.params.quotebookID}`);
		})
		.catch((err) => {
			next(err);
		});
});

router.post('/deleteQuotebook/:id', (req, res, next) => {
	Quotebook.findByIdAndDelete(req.params.id)
		.then(() => {
			res.redirect(`/user/all-my-quotes`);
		})
		.catch((err) => {
			next(err);
		});
});

router.get('/edit-quote/:id', ensureLogin.ensureLoggedIn('/user/login'), (req, res) => {
	Quote.findById(req.params.id)
		.then((quoteToEdit) => {
			res.render('quotes/edit-quote', { quote: quoteToEdit });
		})
		.catch((err) => {
			next(err);
		});
});

router.post('/editQuote/:id', (req, res, next) => {
	Quote.findByIdAndUpdate(req.params.id, req.body)
		.then((updatedQuote) => {
			Quotebook.findById(updatedQuote.quotebook)
				.populate('quotes')
				.then((quotebookFromDB) => {
					res.render('quotes/quotes-details', { quotebook: quotebookFromDB });
				})
				.catch((err) => {
					next(err);
				});
		})
		.catch((err) => {
			next(err);
		});
});

// /user/deleteQuotebook/{{quotebook._id}}

module.exports = router;
