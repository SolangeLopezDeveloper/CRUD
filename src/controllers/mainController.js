const { Op } = require('sequelize');
const db = require('../database/models')

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
	const insale = db.Product.findAll({
        where : {
            discount : {[Op.ne] : 0
            },
        },
        include:['category']
      });
	  const newest = db.Product.findAll({
		order: [['createdAt','DESC']],
			 limit : 4,
			 include:['category']
		 });


	const visible = db.Product.findAll({
		where: {
		  visible: true
		},
		include: ['category']
	  })

	Promise.all(([insale,newest,visible]))
	.then(([insale,newest,visible])=>{
		return res.render('index',{ 
		insale,
		newest,
		visible,
		toThousand
		});
	})
	
	},
	search: (req, res) => {
		const { keywords } = req.query;

 db.Product.findAll({
  include: ['category'],
      where : {
        [Op.or]:[
          {
        name : {[Op.substring]: `%${keywords}%` }
      },{
        description : {[Op.substring]: `%${keywords}%` }
      }
    ]
  }
    }).then((productos)=>{
      return res.render('results', {
        productos,
        keywords
      })
    }).catch((error) => console.log(error));
   
}};

module.exports = controller;
