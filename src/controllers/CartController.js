class CartController {
  async create(req, res) {
    const { id } = req.body;

    return res.status(201).json({ id });
  }
}

module.exports = CartController;
