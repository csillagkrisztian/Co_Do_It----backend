"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "testCases",
      [
        {
          given: "const a = 4; const b = 6;",
          result: "[10]",
          createdAt: new Date(),
          updatedAt: new Date(),
          exerciseId: 1,
        },
        {
          given: "const a = 1; const b = 16;",
          result: "[17]",
          createdAt: new Date(),
          updatedAt: new Date(),
          exerciseId: 1,
        },
        {
          given: "const a = 4; const b = 6;",
          result: "[24]",
          createdAt: new Date(),
          updatedAt: new Date(),
          exerciseId: 2,
        },

        {
          given: "const a = 1; const b = 16;",
          result: "[16]",
          createdAt: new Date(),
          updatedAt: new Date(),
          exerciseId: 2,
        },
      ],
      {}
    );
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("testCases", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
