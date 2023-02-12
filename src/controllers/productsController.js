const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
 

const controller = {
	// Root - Show all products
	
	products: (req, res) => {
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		return res.render('products',{
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		const {id} = req.params;
	const producto = products.find(producto=>producto.id ===+id);
return res.render('detail', {
	...producto,
	toThousand

	
})	
},

	// Create - Form to create
	create: (req, res) => {
		return res.render('product-create-form'
		)
	},
	
	// Create -  Method to store
	store: (req, res) => {


		const {name, price, discount, category,description}=req.body;

		 const nuevoProducto = {
			id: products[products.length - 1].id +1,
			name: name.trim(),
			description: description.trim(),
			price: +price,
			discount: +discount,
			image: null,
			category
			};
		 products.push(nuevoProducto);

		 fs.writeFileSync(productsFilePath,JSON.stringify(products, null, 3),'utf-8')

		

		return res.redirect('/products')
	},

	// Update - Form to edit
	edit: (req, res) => {
		const { id } = req.params;

		const producto = products.find(producto => producto.id === +id);

		return res.render('product-edit-form', {
		  ...producto
})
	},
	// Update - Method to update
	update: (req, res) => {


		const {name, price, discount, category,description} = req.body;
		const {id} =req.params;
		const producto = products.find(producto => producto.id ===+id);
		
		const productoModificado = {
			id: +id,
			name: name.trim(),
			description: description.trim(),
			price: +price,
			discount: +discount,
			image: producto.image,
			category,
		
		}

		const productosModificados = products.map(producto => {
			if (producto.id === +id){
				return productoModificado
			}
			return producto
		});
		
		fs.writeFileSync(productsFilePath,JSON.stringify(productosModificados, null, 3),'utf-8')
	
	return res.redirect(`/products/detail/` + id)
	},
 
	destroyConfirm : (req,res) => {
		const id = req.params.id;
		const producto = products.find(producto => producto.id === +id);
	
		return res.render('productsDestroy',{
		  ...producto
		})
	  },
	// Delete - Delete one product from DB
	destroy : (req, res) => {
		const id = req.params.id;
		const productsModificados = products.filter(producto => producto.id !== +id);
		fs.writeFileSync(productsFilePath,JSON.stringify(productsModificados, null, 3),'utf-8')
		return res.redirect('/products')

	}
};

module.exports = controller;