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
	'notes.create': 'Create New Note',

	'notes.wallet': 'Wallet Note',
	'notes.category': 'Category Note',
	'notes.budget': 'Budget Note',

	'notes.items': 'Note Items',
	'notes.items.create': 'Create New Note Item',
	'notes.items.edit': 'Edit Note Item',

	about_us: 'About Us',

	change_password: 'Change Password',

	email_verification: 'Email Verification',

	forgot_password: 'Forgot Password',
	reset_password: 'Reset Password',
};

const content = {
	'content.dont_have_an_account?': "Don't have an account?",
	'content.already_have_an_account?': 'Already have an account?',

	'content.show': 'Show',
	'content.pagination.of': 'of',
	'content.pagination.items': 'items',
	'content.pagination.go_to': 'Go to',

	'content.balance': 'Balance',
	'content.total': 'Total',
	'content.date': 'Date',
	'content.description': 'Description',
	'content.debit': 'Debit',
	'content.credit': 'Credit',

	'content.note_item_delete_confirmation':
		'Are you sure you want to delete this item?',

	'content.note_close_confirmation':
		'Are you sure you want to close this note?',
	'content.note': 'Note',

	'content.what_is': 'What is',
	'content.what_is.Income':
		'Income is a type of note item to record income/value added.',
	'content.what_is.Spend':
		'Spend is a type of note item for recording expenses.',
	'content.what_is.Spend Only In Wallet':
		'Spend Only In Wallet is a type of note item to record expenses only in the wallet.',
	'content.what_is.Transfer or Withdraw':
		'Transfer or Withdraw is a type of note item to record the transfer of money to the selected wallet.',

	'content.our_team': 'Our Team',
	'content.developer': 'Developer',
	'content.owner': 'Owner',
	'content.user': 'User',

	'content.about_app': 'About App',
	'content.version': 'Version',
	'content.or': 'atau',

	'content.forgot_password':
		'We will send an email to the linked account to reset the password.',
};

const label = {
	'label.username': 'Username',
	'label.name': 'Name',
	'label.email': 'Email',
	'label.budget': 'Budget',
	'label.wallet': 'Wallet',
	'label.category': 'Category',
	'label.budget_items': 'Budget Items',

	//button
	'label.cancel': 'Cancel',
	'label.save': 'Save',
	'label.view': 'View',
	'label.edit': 'Edit',
	'label.delete': 'Delete',

	'label.create.wallet': 'Create Wallet',
	'label.create.category': 'Create Category',
	'label.create.note': 'Create Note',
	'label.create.note.wallet': 'Add Wallet to the Note',
	'label.create.note.category': 'Add Category to the Note',
	'label.create.note.budget': 'Add Budget',
	'label.create.note.detail': 'Add to the Note',
	'label.create.note.item': 'Create Item',

	'label.edit.my_profile': 'Edit My Profile',
	'label.edit.wallet': 'Edit Wallet',
	'label.edit.category': 'Edit Category',

	'label.change_password': 'Change Password',

	'label.go_to_home': 'Go to Home Page',

	'label.forgot_password': 'Forgot Password?',
	'label.send_email_reset_password': 'Send Reset Password Email',
	'label.back_to_login': 'Back to Login',
	'label.reset_password': 'Reset Password',

	'label.close_note': 'Close Note',

	'label.action': 'Action',
	'label.year': 'Year',
	'label.month': 'Month',
	'label.all_year': 'All Year',
	'label.status': 'Status',
	'label.closed': 'Closed',
	'label.all': 'All',
	'label.active': 'Active',
	'label.balance': 'Balance',
	'label.total': 'Total',
	'label.budget.balance': 'Balance Budget',
	'label.budget.total': 'Total Budget',
	'label.spent': 'Spent',
	'label.remains': 'Remains',
	'label.date': 'Date',
	'label.description': 'Description',
	'label.debit': 'Debit',
	'label.credit': 'Credit',

	'label.no_data': 'No Data',
	'label.page': 'Page',

	'label.Income': 'Income',
	'label.Spend Only In Wallet': 'Spend only in Wallet',
	'label.Transfer or Withdraw': 'Transfer or Withdraw',
	'label.Spend': 'Spend',

	'form.label.username': 'Username',
	'form.label.email': 'Email',
	'form.label.password': 'Password',
	'form.label.profile_picture': 'Profile Picture',
	'form.label.name': 'Name',
	'form.label.password_confirmation': 'Password Confirmation',
	'form.label.wallet_name': 'Wallet Name',
	'form.label.category_name': 'Category Name',
	'form.label.note_month': 'Note Month',
	'form.label.note.wallet': 'Select Wallet you want to add to the Note',
	'form.label.note.category': 'Select Category you want to add to the Note',
	'form.label.note.wallet.budget': 'Add Wallet to create Budget',
	'form.label.note.category.budget': 'Add Category to create Budget',
	'form.label.wallet': 'Wallet',
	'form.label.category': 'Category',
	'form.label.total_budget': 'Total Budget',
	'form.label.balance_budget': 'Balance Budget',
	'form.label.date': 'Date',
	'form.label.description': 'Description',
	'form.label.item_type': 'Item Type',
	'form.label.income_amount': 'Income Amount',
	'form.label.spend_amount': 'Spend Amount',
	'form.label.transfer_amount': 'Transfer or Withdraw Amount',
	'form.label.transfer_to': 'Transfer or Withdraw to Wallet',
	'form.label.transfer_from': 'Transfer or Withdraw from Wallet',
	'form.label.spend_wallet': 'Spend from Wallet',
	'form.label.old_password': 'Old Password',
	'form.label.new_password': 'New Password',
	'form.label.new_password_confirmation': 'New Password Confirmation',

	'form.placeholder.username': 'input your username',
	'form.placeholder.email': 'input your email',
	'form.placeholder.password': 'input your password',
	'form.placeholder.profile_picture': 'Upload Image',
	'form.placeholder.name': 'input your name',
	'form.placeholder.password_confirmation': 're-input your password',
	'form.placeholder.wallet_name': 'input wallet name',
	'form.placeholder.category_name': 'input category name',
	'form.placeholder.note_month': 'select note month',
	'form.placeholder.wallet': 'select wallet',
	'form.placeholder.category': 'select category',
	'form.placeholder.total_budget': 'input total budget',
	'form.placeholder.balance_budget': 'input balance budget',
	'form.placeholder.date': 'select date',
	'form.placeholder.description': 'input description',
	'form.placeholder.item_type': 'select item type',
	'form.placeholder.income_amount': 'input income amount',
	'form.placeholder.spend_amount': 'input spend amount',
	'form.placeholder.transfer_amount': 'input transfer or withdraw amount',
	'form.placeholder.transfer_to': 'select destination wallet',
	'form.placeholder.old_password': 'input your old password',
	'form.placeholder.new_password': 'input your new password',
	'form.placeholder.new_password_confirmation': 're-input your new password',

	'form.extra.wallet': 'Wallet cannot be changed',
	'form.extra.category': 'Category cannot be changed',

	'search.placeholder.management_wallet': 'Search Wallet Name',
	'search.placeholder.management_category': 'Search Category Name',
	'search.placeholder.note.detail.wallet_tab': 'Search Wallet Name',
	'search.placeholder.note.detail.category_tab': 'Search Category Name',
	'search.placeholder.note.detail.budget_tab': 'Search Budget Item Name',
	'search.placeholder.note.items': 'Search item description',

	'placeholder.select_year': 'Select year to show',
};

const menu = {
	'menu.management': 'Management',
	'menu.management.wallet': 'Wallets',
	'menu.management.category': 'Category',
	'menu.notes': 'Notes',
	'menu.my_profile': 'My Profile',
	'menu.change_password': 'Change Password',
	'menu.about_us': 'About Us',
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

	'title.note.detail': 'Note',

	'title.note.detail.budget_tab': 'Budgeting Note',
	'title.note.detail.budget_tab.create': 'Add Budget Note',
	'title.note.detail.budget_tab.edit.wallet': 'Edit Wallet Budget',
	'title.note.detail.budget_tab.edit.category': 'Edit Category Budget',

	'title.note.detail.wallet_tab': 'Wallet Note',
	'title.note.detail.wallet_tab.create': 'Add Wallet to the Note',

	'title.note.detail.category_tab': 'Category Note',
	'title.note.detail.category_tab.create': 'Add Category to the Note',

	'title.note.detail_note_not_found': 'Monthly Note',

	'title.note.item.delete': 'Delete Item',
	'title.note.close': 'Close Note',
};

const info = {
	'session.expired': 'Session has expired, please log in again',
};

const error = {
	'form.required.username': 'Please input your username!',
	'form.required.email': 'Please input your email!',
	'form.required.password': 'Please input your password!',
	'form.required.name': 'Please input your name!',
	'form.required.password_confirmation': 'Please re-input your password!',
	'form.required.wallet_name': 'Please input wallet name!',
	'form.required.category_name': 'Please input category name!',
	'form.required.note_month': 'Please input note month!',
	'form.required.note.detail': 'Please select at least 1!',
	'form.required.wallet': 'Please select wallet!',
	'form.required.category': 'Please select category!',
	'form.required.total_budget': 'Please input total budget!',
	'form.required.balance_budget': 'Please input balance budget!',
	'form.required.date': 'Please select date!',
	'form.required.description': 'Please input description!',
	'form.required.item_type': 'Please select item type!',
	'form.required.income_amount': 'Please input income amount!',
	'form.required.spend_amount': 'Please input spend amount!',
	'form.required.transfer_amount':
		'Please input transfer or withdraw amount!',
	'form.required.transfer_to': 'Please select destination wallet!',
	'form.required.old_password': 'Please input your old password!',
	'form.required.new_password': 'Please input your new password!',
	'form.required.new_password_confirmation':
		'Please re-input your new password!',

	'form.validation.no_spaces': 'No spaces allowed!',
	'form.validation.password_not_match': "Password doesn't match!",
	'form.validation.upload_only_image': 'You can only upload JPG/PNG file!',
	'form.validation.size_lower_than_2mb': 'Image must smaller than 2MB!',
	'form.validation.only_number': 'Please input only number!',
	'form.validation.email': 'Please input valid email!',

	'network.ERR_NETWORK': 'Network Error',

	'error.unknown_error': 'Unknown error has occurred',
};

const backend = {
	//success
	'login.success': 'Successfully sign in',
	'register.success':
		'Successfully register. Please verify your email address to use Financial Diary App.',
	'authtoken.success': 'Token is valid',
	'verify_email.success': 'Sucessfully verify email',

	'forgot_password.success': 'Successfully sent reset password email',
	'forgot_password.send_email_success':
		'We have sent an email to the linked account to reset the password, please check your email',

	'reset_password.success': 'Successfully reset password',

	'user.success.create': 'Successfully create user',
	'user.success.get_all': 'Successfully get all users data',
	'user.success.get': 'Successfully get user data',
	'user.success.edit': 'Successfully edit user data',
	'user.succcess.delete': 'Successfully delete user data',

	'change_password.success': 'Successfully change password',

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
	'note.success.closed': 'Successfully close note',

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
	'login.exception.002':
		'Email has not been verified, please verify in order to use the Financial Diary App',

	'register.failed': 'Failed to register',
	'register.exception.001': 'Username or email is already taken',

	'authtoken.failed': 'Token is not valid or expired',
	'auth.exception.001':
		'A client is forbidden from accessing a valid resource',

	'verify_email.failed': 'Failed to verify email',
	'verify_email.exception.001': 'Email already verified',
	'verify_email.exception.002': 'Token is not valid or expired',

	'forgot_password.failed': 'Failed to send forgot password email',
	'forgot_password.exception.001':
		'Email has not been verified, please verify in order to use the Financial Diary App',
	'forgot_password.exception.002':
		'User with that email address or username not found',

	'reset_password.failed': 'Failed to reset password',
	'reset_password.exception.001': 'Token is not valid or expired',

	'user.failed.create': 'Failed to create user',
	'user.exception.001': 'Username is already taken',
	'user.failed.get_all': 'Failed to get all users data',
	'user.failed.get': 'Failed to get user data',
	'user.failed.edit': 'Failed to edit user data',
	'user.failed.delete': 'Failed to delete user data',

	'change_password.failed': 'Failed to change password',
	'change_password.exception.001': 'Incorrect password',
	'change_password.exception.002':
		'You have entered the same password as before. If you want to change the password, please enter a new password',

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
	'note.exception.002': 'Note is closed',
	'note.exception.003': 'Note is already closed',
	'note.failed.close': 'Failed to close note',

	'categorynote.failed.create': 'Failed to create category note',
	'categorynote.exception.001':
		'Cannot add category, there is Category which has been added',
	'categorynote.failed.get_all': 'Failed to get category note',
	'categorynote.failed.get_available':
		'Failed to get available category note',
	'categorynote.failed.get': 'Failed to get category note data',
	'categorynote.failed.edit': 'Failed to edit category note data',
	'categorynote.failed.edit_estimated':
		'Failed to edit category note budget total data',

	'walletnote.failed.create': 'Failed to create wallet note',
	'walletnote.exception.001':
		'Cannot add wallet, there is Wallet which has been added',
	'walletnote.failed.get_all': 'Failed to get wallet note',
	'walletnote.failed.get_available': 'Failed to get available wallet note',
	'walletnote.failed.get': 'Failed to get wallet note data',
	'walletnote.failed.edit': 'Failed to edit wallet note data',
	'walletnote.failed.edit_estimated':
		'Failed to edit wallet note budget total data',

	'noteitem.failed.create': 'Failed to create user note item',
	'noteitem.exception.001': 'Income amount must be zero or positive number',
	'noteitem.exception.002': 'Transfer amount must be zero or positive number',
	'noteitem.exception.003': 'Total amount must be zero or positive number',
	'noteitem.exception.004': 'Invalid type of note item',
	'noteitem.exception.005': 'The date does not match the note date range',
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
