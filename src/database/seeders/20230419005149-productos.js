'use strict';

/** @type {import('sequelize-cli').Migration} */

const productosJSON = require('../../data/productsDataBase.json');

const productos = productosJSON.map(({id,name,price,discount,category,description,image})=>{
  return{
    id,
    name,
    price,
    discount,
    categoryId : category ? 1 : 0,
    description,
    image,
    visible: true,
    createdAt : new Date(),
    updatedAt : new Date ()

  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
 
      await queryInterface.bulkInsert('Products',productos, {});
   
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('Products', null, {});
     
  }
};
