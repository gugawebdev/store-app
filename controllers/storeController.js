const mongoose = require('mongoose');
const Store = require('../models/storeModel');


exports.HomePage = (req, res) => {
	res.render('index', {title:'Home'});
};

exports.AddStore = (req, res) => {
	res.render('addStore', {title: 'Add store'});
};

exports.createStore = async (req, res) =>{

	try{
		const store = new Store(req.body);
		await store.save();
		req.flash('success', `${store.name} succesfully added to our store list!`);
		res.redirect('/store/' + `${store.slug}`);
	}

	catch(err){

		req.flash('error', 'Was not possible add your database. Please, fill correctly the fields and try again!');
		res.redirect('/add');
	}

};

exports.getStores = async (req, res) =>{
	try{
		const stores = await Store.find();
		console.log(stores);
		res.render('stores', {title: 'Store list', stores}); // or dataStore:stores
	}
	catch(err){
		console.log('Could not find the stores in the database', err);
		res.redirect('/');
	}
};

exports.editStore = async (req, res) =>{

	try{
		const result = await Store.findById(req.params.storeId);
		res.render('editStore', {title:`Edit ${result.name}`, storeData:result});
		console.log(result);
	}
	catch(err){
		console.log(err);
		req.flash('error', 'Could not find this store. Pleace, check again!');
		res.redirect('/stores');
	}

};

exports.updateStore = async (req, res) =>{
	try{

		const store = await Store.findByIdAndUpdate(req.params.storeId, req.body).exec();
		req.flash('success', 'Store updated succesfully');
		res.redirect('/stores');

	}
	catch(err){
		throw new Error(err);
		res.redirect('/stores');
	}
};
