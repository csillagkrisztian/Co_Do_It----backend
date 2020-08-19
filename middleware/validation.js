function validation(model, idParam, resource) {
  return async function (req, res, next) {
    try {
      const id = eval(`req.params.${idParam}`);
      if (!id) {
        res.status(400).send({
          message: `${idParam} is a wrong idParam, check again in your route parameters`,
          example: `"somethingId (found in "/:somethingId")`,
        });
      }
      const item = await model.findByPk(id);
      if (!item) {
        res.status(404).send({
          message: `${model.name} ID ${id} not found`,
        });
      }
      req[resource] = item;
      next();
    } catch (error) {
      res.status(400).send({
        message:
          "Something else went wrong, try to check the validation fuction arguments",
      });
    }
  };
}

module.exports = { validation };
