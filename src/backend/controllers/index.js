const authController = require("./auth.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");
const userController = require("./user.controller");
const categoryController = require("./category.controller");
const walletController = require("./wallet.controller");
const noteController = require("./note.controller");
const categoryNoteController = require("./categorynote.controller");
const walletNoteController = require("./walletnote.controller");

module.exports = (app) => {
	app.use("/api/auth", authController);
	app.use("/api/user", [isAuthenticated], userController);
	app.use("/api/category", [isAuthenticated], categoryController);
	app.use("/api/wallet", [isAuthenticated], walletController);
	app.use("/api/note", [isAuthenticated], noteController);
	app.use("/api/category-note", [isAuthenticated], categoryNoteController);
	app.use("/api/wallet-note", [isAuthenticated], walletNoteController);
};
