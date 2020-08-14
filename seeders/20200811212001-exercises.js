"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "exercises",
      [
        {
          description: "Find the pattern",
          explanation: "this is an explanation of the exercise! DO IT!",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
          isPublic: true,
        },
        {
          description: "Find the answer",
          explanation: "this is an explanation of the exercise! DO IT!",
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 1,
          isPublic: true,
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
    await queryInterface.bulkDelete("exercises", null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
