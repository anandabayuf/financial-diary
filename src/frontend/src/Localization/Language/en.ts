const general = {
	login: 'Login',
	register: 'Register',

	my_profile: 'My Profile',
	edit_my_profile: 'Edit My Profile',

	management: 'Management',
	'management.wallet': 'Management Wallet',
	'management.wallet.create': 'Create New Wallet',
	'management.wallet.edit': 'Edit Wallet',

	'management.category': 'Management Category',
	'management.category.create': 'Create New Category',
	'management.category.edit': 'Edit Category',

	notes: 'Notes',
	'notes.create': 'Buat Pencatatan',
};

const content = {
	'content.dont_have_an_account?': "Don't have an account?",
	'content.already_have_an_account?': 'Already have an account?',

	'content.show': 'Tampilkan',
	'content.pagination.of': 'of',
	'content.pagination.items': 'items',
	'content.pagination.go_to': 'Go to',
};

const label = {
	'label.username': 'Username',
	'label.name': 'Name',

	//button
	'label.cancel': 'Cancel',
	'label.save': 'Save',
	'label.view': 'View',
	'label.edit': 'Edit',

	'label.create.wallet': 'Create Wallet',
	'label.create.category': 'Create Category',
	'label.create.note': 'Create Note',

	'label.edit.my_profile': 'Edit My Profile',
	'label.edit.wallet': 'Edit Wallet',
	'label.edit.category': 'Edit Category',

	'label.action': 'Action',
	'label.year': 'Year',
	'label.month': 'Month',

	'label.no_data': 'No Data',
	'label.page': 'Page',

	'form.label.username': 'Username',
	'form.label.password': 'Password',
	'form.label.profile_picture': 'Profile Picture',
	'form.label.name': 'Name',
	'form.label.password_confirmation': 'Password Confirmation',
	'form.label.wallet_name': 'Wallet Name',
	'form.label.category_name': 'Category Name',

	'form.placeholder.username': 'input your username',
	'form.placeholder.password': 'input your password',
	'form.placeholder.profile_picture': 'Upload Image',
	'form.placeholder.name': 'input your name',
	'form.placeholder.password_confirmation': 're-input your password',
	'form.placeholder.wallet_name': 'input wallet name',
	'form.placeholder.category_name': 'input category name',

	'search.placeholder.management_wallet': 'Search Wallet Name',
	'search.placeholder.management_category': 'Search Category Name',
};

const menu = {
	'menu.management': 'Management',
	'menu.management.wallet': 'Wallets',
	'menu.management.category': 'Category',
	'menu.notes': 'Notes',
	'menu.my_profile': 'My Profile',
	'menu.theme_switcher.light': 'Light',
	'menu.theme_switcher.dark': 'Dark',
	'menu.logout': 'Logout',
};

const titlepage = {
	'title.management.wallet': 'Wallet - Management',
	'title.management.wallet.create': 'Create New Wallet - Management',
	'title.management.wallet.edit': 'Edit Wallet - Management',

	'title.management.category': 'Category - Management',
	'title.management.category.create': 'Buat Kategori Baru - Manajemen',
	'title.management.category.edit': 'Ubah Kategori - Manajemen',
};

const info = {
	'session.expired': 'Session has expired, please log in again',
};

const error = {
	'form.required.username': 'Please input your username!',
	'form.required.password': 'Please input your password!',
	'form.required.name': 'Please input your name!',
	'form.required.password_confirmation': 'Please re-input your password!',
	'form.required.wallet_name': 'Please input wallet name!',
	'form.required.category_name': 'Please input category name!',

	'form.validation.no_spaces': 'No spaces allowed!',
	'form.validation.password_not_match': "Password doesn't match!",
	'form.validation.upload_only_image': 'You can only upload JPG/PNG file!',
	'form.validation.size_lower_than_2mb': 'Image must smaller than 2MB!',

	'network.ERR_NETWORK': 'Network Error',

	'error.unknown_error': 'Unknown error has occurred',
};

const backend = {
	//success
	'login.success': 'Successfully sign in',
	'register.success': 'Successfully register',
	'authtoken.success': 'Token is valid',

	'user.success.create': 'Successfully create user',
	'user.success.get_all': 'Successfully get all users data',
	'user.success.get': 'Successfully get user data',
	'user.success.edit': 'Successfully edit user data',
	'user.succcess.delete': 'Successfully delete user data',

	'category.success.create': 'Successfully create category',
	'category.success.get_all': 'Successfully get categories',
	'category.success.get': 'Successfully get category data',
	'category.success.edit': 'Successfully edit category data',

	'wallet.success.create': 'Successfully create wallet',
	'wallet.success.get_all': 'Successfully get wallet',
	'wallet.success.get': 'Successfully get wallet data',
	'wallet.success.edit': 'Successfully edit wallet data',

	'note.success.create': 'Successfully create note',
	'note.success.get_all': 'Successfully get note',
	'note.success.get': 'Successfully get note data',

	'categorynote.success.create': 'Successfully create category on note',
	'categorynote.success.get_all': 'Successfully get category note',
	'categorynote.success.get_available':
		'Successfully get available category note',
	'categorynote.success.get': 'Successfully get category note data',
	'categorynote.success.edit': 'Successfully edit category note data',
	'categorynote.success.edit_estimated':
		'Successfully edit category note budget total data',

	'walletnote.success.create': 'Successfully create wallet on note',
	'walletnote.success.get_all': 'Successfully get wallet note',
	'walletnote.success.get_available':
		'Successfully get available wallet note',
	'walletnote.success.get': 'Successfully get wallet note data',
	'walletnote.success.edit': 'Successfully edit wallet note data',
	'walletnote.success.edit_estimated':
		'Successfully edit wallet note budget balance data',

	'noteitem.success.create': 'Successfully create note item',
	'noteitem.success.get_all': 'Successfully get note item',
	'noteitem.success.get': 'Successfully get note item data',
	'noteitem.success.edit': 'Successfully edit note item data',
	'noteitem.success.delete': 'Successfully delete note item data',

	//failed
	'login.failed': 'Failed to sign in',
	'login.exception.001': 'You have entered an invalid username or password',

	'register.failed': 'Failed to register',
	'register.exception.001': 'Username is already taken',

	'authtoken.failed': 'Token is not valid',
	'auth.exception.001':
		'A client is forbidden from accessing a valid resource',

	'user.failed.create': 'Failed to create user',
	'user.exception.001': 'Username is already taken',
	'user.failed.get_all': 'Failed to get all users data',
	'user.failed.get': 'Failed to get user data',
	'user.failed.edit': 'Failed to edit user data',
	'user.failed.delete': 'Failed to delete user data',

	'category.failed.create': 'Failed to create user category',
	'category.failed.get_all': 'Failed to get user category',
	'category.failed.get': 'Failed to get user category data',
	'category.failed.edit': 'Failed to edit user category data',

	'wallet.failed.create': 'Failed to create user wallet',
	'wallet.failed.get_all': 'Failed to get user wallet',
	'wallet.failed.get': 'Failed to get user wallet data',
	'wallet.failed.edit': 'Failed to edit user wallet data',

	'note.failed.create': 'Failed to create user note',
	'note.exception.001': 'Note with the month is already available',
	'note.failed.get_all': 'Failed to get user note',
	'note.failed.get': 'Failed to get user note data',

	'categorynote.failed.create': 'Failed to create category note',
	'categorynote.exception.001':
		'Cannot add category, there is Category which has been added',
	'categorynote.failed.get_all': 'Failed to get category note',
	'categorynote.failed.get_available':
		'Failed to get available category note',
	'categorynote.failed.get': 'Failed to get category note data',
	'categorynote.failed.edit': 'Failed to edit category note data',
	'categorynote.failed.edit_estimated':
		'Failed to edit category note estimated total data',

	'walletnote.failed.create': 'Failed to create wallet note',
	'walletnote.exception.001':
		'Cannot add wallet, there is Wallet which has been added',
	'walletnote.failed.get_all': 'Failed to get wallet note',
	'walletnote.failed.get_available': 'Failed to get available wallet note',
	'walletnote.failed.get': 'Failed to get wallet note data',
	'walletnote.failed.edit': 'Failed to edit wallet note data',
	'walletnote.failed.edit_estimated':
		'Failed to edit wallet note estimated total data',

	'noteitem.failed.create': 'Failed to create user note item',
	'noteitem.exception.001': 'Income amount must be zero or positive number',
	'noteitem.exception.002': 'Transfer amount must be zero or positive number',
	'noteitem.exception.003': 'Total amount must be zero or positive number',
	'noteitem.exception.004': 'Cannot add item. Invalid type item',
	'noteitem.exception.005':
		'Cannot add item. The range of note is from 26-XX-XXXX to 25-XX-XXXX',
	'noteitem.failed.get_all': 'Failed to get user note item',
	'noteitem.failed.get': 'Failed to get user note item data',
	'noteitem.failed.edit': 'Failed to edit user note item data',
	'noteitem.failed.delete': 'Failed to delete user note item data',
};

const en = {
	...general,
	...content,
	...label,
	...menu,
	...titlepage,
	...info,
	...error,
	...backend,
};

export default en;
