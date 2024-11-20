const getImageLink = (type, id) => {
	// Kiểm tra loại (products hoặc categories) và id có hợp lệ không
	if (type !== 'products' && type !== 'categories' && type !== 'users') {
		throw new Error("Type must be 'products' or 'categories'");
	}

	// Trả về đường link của sản phẩm hoặc danh mục
	return `https://vieque.sirv.com/Images/${type}/${id}.png`;
}

export { getImageLink };