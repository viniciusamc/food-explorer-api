class CartController(
  async function create(req, res) {
    const { id } = req.params;

    return res.status(201).json({ id });
  }
)

module.exports = CartController;
