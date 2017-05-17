const mongoose = require('mongoose');

mongoose.Promise = global.Promise;//TO USE NATIVE MONGO PROMISES

const slug = require('slugs'); //USED TO MAKE FRIENDLY URL


const storeSchema = new mongoose.Schema({

	name: {type:String, trim:true, required: true},

	slug: String,

	description:{type:String, trim:true, required:true},

	tags:[String],

	created: {type: Date, default: Date.now },

	location:{type:{type:String, default: 'Point'}, coordinates:[
		{
			type:Number, required:true
		}
	],
	address:{type:String, required:true}
}

});

storeSchema.pre('save', function(next){
	if(!this.isModified('name')){
		next();
		return;
	}
	else{
		this.slug = slug(this.name);
		next();
	}
});






module.exports = mongoose.model('Store', storeSchema);
