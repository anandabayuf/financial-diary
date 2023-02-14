const general = {
	login: 'Masuk',
	register: 'Daftar',
};

const content = {
	'content.dont_have_an_account?': 'Belum memiliki akun?',
	'content.already_have_an_account?': 'Sudah memiliki akun?',
};

const label = {
	'form.label.username': 'Nama Pengguna',
	'form.label.password': 'Kata Sandi',
	'form.label.profile_picture': 'Foto Profil',
	'form.label.name': 'Nama',
	'form.label.password_confirmation': 'Konfirmasi Kata Sandi',

	'form.placeholder.username': 'masukkan nama pengguna anda',
	'form.placeholder.password': 'masukkan kata sandi anda',
	'form.placeholder.profile_picture': 'Unggah Gambar',
	'form.placeholder.name': 'masukkan nama anda',
	'form.placeholder.password_confirmation':
		'masukkan kembali kata sandi anda',
};

const menu = {
	'menu.management': 'Manajemen',
	'menu.management.wallet': 'Dompet',
	'menu.management.category': 'Kategori',
	'menu.notes': 'Pencatatan',
	'menu.my_profile': 'Profil Saya',
	'menu.theme_switcher.light': 'Terang',
	'menu.theme_switcher.dark': 'Gelap',
	'menu.logout': 'Keluar',
};

const info = {
	'session.expired': 'Sesi telah berakhir, silakan masuk kembali',
};

const error = {
	'form.required.username': 'Mohon masukkan nama pengguna anda!',
	'form.required.password': 'Mohon masukkan kata sandi anda!',
	'form.required.name': 'Mohon masukkan nama anda!',
	'form.required.password_confirmation':
		'Mohon masukkan kembali kata sandi anda!',

	'form.validation.no_spaces': 'Tidak boleh mengandung spasi!',
	'form.validation.password_not_match': 'Kata sandi tidak sama!',
	'form.validation.upload_only_image':
		'Anda hanya dapat mengunggah berkas JPG/PNG!',
	'form.validation.size_lower_than_2mb': 'Gambar harus kurang dari 2MB!',

	'network.ERR_NETWORK': 'Kesalahan Jaringan',

	'error.unknown_error': 'Terjadi kesalahan yang tidak diketahui',
};

const backend = {
	//success
	'login.success': 'Berhasil masuk',
	'register.success': 'Berhasil daftar',
	'authtoken.success': 'Token valid',

	'user.success.create': 'Berhasil membuat pengguna',
	'user.success.get_all': 'Berhasil mendapatkan semua data pengguna',
	'user.success.get': 'Berhasil mendapatkan data pengguna',
	'user.success.edit': 'Berhasil mengubah data pengguna',
	'user.succcess.delete': 'Berhasil menghapus data pengguna',

	'category.success.create': 'Berhasil membuat kategori',
	'category.success.get_all': 'Berhasil mendapatkan kategori',
	'category.success.get': 'Berhasil mendapatkan data kategori',
	'category.success.edit': 'Berhasil mengubah data kategori',

	'wallet.success.create': 'Berhasil membuat dompet',
	'wallet.success.get_all': 'Berhasil mendapatkan dompet',
	'wallet.success.get': 'Berhasil mendapatkan data dompet',
	'wallet.success.edit': 'Berhasil mengubah data dompet',

	'note.success.create': 'Berhasil membuat pencatatan',
	'note.success.get_all': 'Berhasil mendapatkan pencatatan',
	'note.success.get': 'Berhasil mendapatkan data pencatatan',

	'categorynote.success.create':
		'Berhasil menambahkan kategori pada pencatatan',
	'categorynote.success.get_all': 'Berhasil mendapatkan pencatatan kategori',
	'categorynote.success.get_available':
		'Berhasil mendapatkan pencatatan kategori yang tersedia',
	'categorynote.success.get': 'Berhasil mendapatkan data pencatatan kategori',
	'categorynote.success.edit': 'Berhasil mengubah data pencatatan kategori',
	'categorynote.success.edit_estimated':
		'Berhasil mengubah data total anggaran pencatatan kategori',

	'walletnote.success.create': 'Berhasil menambahkan dompet pada pencatatan',
	'walletnote.success.get_all': 'Berhasil mendapatkan pencatatan dompet',
	'walletnote.success.get_available':
		'Berhasil mendapatkan pencatatan dompet yang tersedia',
	'walletnote.success.get': 'Berhasil mendapatkan data pencatatan dompet',
	'walletnote.success.edit': 'Berhasil mengubah data pencatatan dompet',
	'walletnote.success.edit_estimated':
		'Berhasil mengubah data saldo anggaran pencatatan dompet',

	'noteitem.success.create': 'Berhasil membuat item pencatatan',
	'noteitem.success.get_all': 'Berhasil mendapatkan item pencatatan',
	'noteitem.success.get': 'Berhasil mendapatkan data item pencatatan',
	'noteitem.success.edit': 'Berhasil mengubah data item pencatatan',
	'noteitem.success.delete': 'Berhasil menghapus data item pencatatan',

	//failed
	'login.failed': 'Gagal masuk',
	'login.exception.001':
		'Anda telah memasukkan nama pengguna atau kata sandi yang salah',

	'register.failed': 'Gagal mendaftar',
	'register.exception.001': 'Nama pengguna sudah digunakan',

	'authtoken.failed': 'Token tidak valid',
	'auth.exception.001': 'Klien dilarang mengakses sumber daya yang valid',

	'user.failed.create': 'Gagal membuat pengguna',
	'user.exception.001': 'Nama pengguna sudah digunakan',
	'user.failed.get_all': 'Gagal mendapatkan semua data pengguna',
	'user.failed.get': 'Gagal mendapatkan data pengguna',
	'user.failed.edit': 'Gagal mengubah data pengguna',
	'user.failed.delete': 'Gagal menghapus data pengguna',

	'category.failed.create': 'Gagal membuat kategori',
	'category.failed.get_all': 'Gagal mendapatkan kategori',
	'category.failed.get': 'Gagal mendapatkan data kategori',
	'category.failed.edit': 'Gagal mengubah data kategori',

	'wallet.failed.create': 'Gagal membuat dompet',
	'wallet.failed.get_all': 'Gagal mendapatkan dompet',
	'wallet.failed.get': 'Gagal mendapatkan data dompet',
	'wallet.failed.edit': 'Gagal mengubah data dompet',

	'note.failed.create': 'Gagal membuat pencatatan',
	'note.exception.001': 'Pencatatan dengan bulan tersebut sudah tersedia',
	'note.failed.get_all': 'Gagal mendapatkan pencatatan',
	'note.failed.get': 'Gagal mendapatkan data pencatatan',

	'categorynote.failed.create': 'Gagal menambahkan kategori pada pencatatan',
	'categorynote.exception.001':
		'Kategori ini sudah dimasukkan ke dalam pencatatan',
	'categorynote.failed.get_all': 'Gagal mendapatkan pencatatan kategori',
	'categorynote.failed.get_available':
		'Gagal mendapatkan pencatatan kategori yang tersedia',
	'categorynote.failed.get': 'Gagal mendapatkan data pencatatan kategori',
	'categorynote.failed.edit': 'Gagal mengubah data pencatatan kategori',
	'categorynote.failed.edit_estimated':
		'Gagal mengubah data total anggaran pencatatan kategori',

	'walletnote.failed.create': 'Gagal menambahkan dompet pada pencatatan',
	'walletnote.exception.001':
		'Dompet ini sudah dimasukkan ke dalam pencatatan',
	'walletnote.failed.get_all': 'Gagal mendapatkan pencatatan dompet',
	'walletnote.failed.get_available':
		'Gagal mendapatkan pencatatan dompet yang tersedia',
	'walletnote.failed.get': 'Gagal mendapatkan data pencatatan dompet',
	'walletnote.failed.edit': 'Gagal mengubah data pencatatan dompet',
	'walletnote.failed.edit_estimated':
		'Gagal mengubah data saldo anggaran pencatatan dompet',

	'noteitem.failed.create': 'Gagal membuat item pencatatan',
	'noteitem.exception.001': 'Jumlah pendapatan harus nol atau angka positif',
	'noteitem.exception.002':
		'Jumlah transfer atau penarikan harus nol atau angka positif',
	'noteitem.exception.003': 'Jumlah total harus nol atau angka positif',
	'noteitem.exception.004': 'Jenis dari item pencatatan tidak valid',
	'noteitem.exception.005':
		'The range of note is from 26-XX-XXXX to 25-XX-XXXX',
	'noteitem.failed.get_all': 'Gagal mendapatkan item pencatatan',
	'noteitem.failed.get': 'Gagal mendapatkan data item pencatatan',
	'noteitem.failed.edit': 'Gagal mengubah data item pencatatan',
	'noteitem.failed.delete': 'Gagal menghapus data item pencatatan',
};

const id = {
	...general,
	...content,
	...label,
	...menu,
	...info,
	...error,
	...backend,
};

export default id;
