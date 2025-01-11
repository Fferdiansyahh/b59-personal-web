"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("Myprojects", [
      {
        name: "Ferdian",
        sdate: new Date(),
        edate: new Date(),
        message:
          "Can you help translate this site into a foreign language ? Please email us with details if you can help",
        technologies: "node.js",
        image: "http://localhost:3030/Asset/image/mobil.jpg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Farhan",
        sdate: new Date(),
        edate: new Date(),
        message:
          "The first line of Lorem Ipsum, 'Lorem ipsum dolor sit amet..', comes from a line in section 1.10.32.",
        technologies: "node.js",
        image: "http://localhost:3030/Asset/image/motor.jpeg",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("Myproject", null, {});
  },
};
