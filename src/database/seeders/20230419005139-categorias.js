'use strict';

/** @type {import('sequelize-cli').Migration} */

const categoriesJSON = require('../../data/categoriesDataBase.json')

const categories= categoriesJSON.map(({id, name}) =>{
  return {
    name,
    createdAt: new Date(),
    updatedAt: new Date(),
  }
})

module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('Categories',categories, {});
    
  },

  async down (queryInterface, Sequelize) {

   await queryInterface.bulkDelete('Categories', null, {});
  
  }
};
