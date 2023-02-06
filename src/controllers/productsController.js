const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
 
/* productosSort = products.sort((a,b) =>a.name ? 1 : a.name < b.name ? -1 :0) */
const controller = {
	// Root - Show all products
	index: (req, res) => {
		
		return res.render('products',{
			products
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const {id} = req.params;
	const producto = products.find(producto=>producto.id ===+id)
return res.render('detail', {
	producto
})	
},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form', {
			products
		})
	},
	
	// Create -  Method to store
	store: (req, res) => {
		const {name, price, discount, category,description,image}=req.body;
		 const nuevoProducto = {
			id: products[products.length - 1].id +1,
			name: name.trim(),
			price: +price,
			discount: +discount,
			category: category,
			description: description.trim(),
			image: image
		 }
		 products.push(nuevoProducto);
		 fs.writeFileSync('../data/productsDataBase.json',JSON.stringify(products, null, 3),'utf-8')
		return res.redirect('products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const { id } = req.params;

		const producto = products.find(producto => producto.id === +id);
		return res.render('product-edit-form', {
		  ...producto,
		  products

	})
	},
	// Update - Method to update
	update: (req, res) => {
		const {name, price, discount, category,description,image} = req.body;
		const id = +req.params.id
		const producto = products.find(producto => producto.id ===+id);
		const productoUpd = {
			id,
			name,
			price: +price,
			discount: +discount,
			category,
			description: description.trim(),
			image: producto.image
		};
		const productoModificado = products.map(producto => {
			if (producto.id === id){
				return productoUpd
			}
			return producto
		})
		fs.writeFileSync('../data/productsDataBase.json',JSON.stringify(productoModificado, null, 3),'utf-8')
	return res.redirect(`/detail/${id}`)
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const id = req.params.id;
		const productoModificado = products.filter(producto => producto.id !== +id);
		fs.writeFileSync('../data/productsDataBase.json',JSON.stringify(productoModificado, null, 3),'utf-8')
		return res.redirect('/products')

	}
};

module.exports = controller;