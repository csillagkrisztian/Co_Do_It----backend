"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "test-cases",
      [
        {
          given: "const a = 4, const b = 6",
          result: "[10]",
          createdAt: new Date(),
          updatedAt: new Date(),
          exercise_id: 1,
        },
        {
          given: "const a = 1, const b = 16",
          result: "[17]",
          createdAt: new Date(),
          updatedAt: new Date(),
          exercise_id: 1,
        },
        {
          given: "const a = 4, const b = 6",
          result: "[24]",
          createdAt: new Date(),
          updatedAt: new Date(),
          exercise_id: 2,
        },

        {
          given: "const a = 1, const b = 16",
          result: "[16]",
          createdAt: new Date(),
          updatedAt: new Date(),
          exercise_id: 2,
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
    await queryInterface.bulkDelete("test-cases", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
