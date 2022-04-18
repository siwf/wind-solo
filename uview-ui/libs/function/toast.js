function toast(title, duration = 2500) {
	uni.showToast({
		title: title,
		icon: 'none',
		duration: duration
	})
}

export default toast
