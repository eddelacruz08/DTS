function alert_no_flash(message, status_icon){
	const Toast = Swal.mixin({
		toast: true,
		position: 'top-end',
		showConfirmButton: false,
		timer: 3000,
		timerProgressBar: true,
		didOpen: (toast) => {
		  toast.addEventListener('mouseenter', Swal.stopTimer)
		  toast.addEventListener('mouseleave', Swal.resumeTimer)
		}
	  })
	  
	  Toast.fire({ 
		icon: status_icon,
		title: message
	  })
}

function alert_error(message){
	Swal.fire(
		'Opps!',
		message,
		'error'
	  );
}

// function alert_success(message){
// 	 Swal.fire(
// 	  'Success!',
// 	  message,
// 	  'success'
// 	);
// }

function alert_warning(message){
	 Swal.fire(
	  'Warning!',
	  message,
	  'warning'
	);
}

function alert_login_success(message){
	 Swal.fire(
	  'Login Success!',
	  message,
	  'success'
	);
}

function confirmDelete(route, id){
	Swal.fire({
		title: 'Are you sure?',
		text: "You won't be able to revert this!",
		icon: 'question',
		showCancelButton: true,
		confirmButtonColor: '#3085d6',
		cancelButtonColor: '#d33',
		confirmButtonText: 'Yes, delete it!',
		allowOutsideClick: false,
	}).then((result) => {
		if (result.isConfirmed) {
			Swal.fire({
				title: 'Processing...',
				html: 'Please wait.',
				icon: 'info',
				timer: 1000,
				timerProgressBar: true,
				allowOutsideClick: false,
				didOpen: () => {
					Swal.showLoading()
				},
			}).then((result) => {
				$.ajax({
					url: route + id,
					success: function (response) {
                        if(response.status_icon == 'success'){
                            alert_no_flash(response.status_text, response.status_icon)
                            defectItemListViewReload();
                        }else{
                            alert_no_flash(response.status_text, response.status_icon)
                        }
					}
				});
			});
		}
	});
}



