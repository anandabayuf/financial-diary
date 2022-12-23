const mongoose = require("mongoose");
const { config } = require("dotenv");

config();

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("MongoDB connection has been established successfully.");
	})
	.catch((error) => {
		console.log("Unable to connect to MongoDB: ", error);
	});

exports.UserSchema = mongoose.model("User", {
	username: {
		type: String,
		unique: true,
		required: true,
		dropDups: true,
	},
	password: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	salt: {
		type: String,
		required: true,
	},
	picture: {
		data: Buffer,
		contentType: String,
	},
});

exports.CategorySchema = mongoose.model("Category", {
	userId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
});

exports.WalletSchema = mongoose.model("Wallet", {
	userId: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
});

exports.NoteSchema = mongoose.model("Note", {
	userId: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
});

exports.NoteItemSchema = mongoose.model("NoteItem", {
	noteId: {
		type: String,
		required: true,
	},
	categoryId: {
		type: String,
		required: true,
	},
	walletId: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	debit: {
		type: Number,
		required: true,
	},
	credit: {
		type: Number,
		required: true,
	},
});

exports.CategoryNoteSchema = mongoose.model("CategoryNote", {
	categoryId: {
		type: String,
		required: true,
	},
	noteId: {
		type: String,
		required: true,
	},
	total: {
		type: Number,
		required: true,
	},
});

exports.WalletNoteSchema = mongoose.model("WalletNote", {
	walletId: {
		type: String,
		required: true,
	},
	noteId: {
		type: String,
		required: true,
	},
	balance: {
		type: Number,
		required: true,
	},
});

// exports.EstimationSchema = mongoose.model("Estimation", {
// 	userId: {
// 		type: String,
// 		required: true,
// 	},
// 	date: {
// 		type: Date,
// 		required: true,
// 	},
// 	balance: {
// 		type: Number,
// 		required: true,
// 	},
// 	remains: {
// 		type: Number,
// 		required: true,
// 	},
// });
