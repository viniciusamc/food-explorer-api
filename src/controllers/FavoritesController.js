class FavoritesController {
  async create(req, res) {
    const { id } = req.params;

    return res.status(201).json({ id });
  }
}

module.exports = FavoritesController;
