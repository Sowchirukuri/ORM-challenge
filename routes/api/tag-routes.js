const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// Get all tags
router.get('/', async (req, res) => {
  try {
    const tagsData = await Tag.findAll({
      include: [{ model: Product, through: ProductTag, as: 'products' }],
    });
    res.status(200).json(tagsData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get one tag
router.get('/:id', async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product, through: ProductTag, as: 'products' }],
    });

    if (!tagData) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create new tag
router.post('/', async (req, res) => {
  try {
    const newTag = await Tag.create(req.body);

    res.status(201).json(newTag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Update tag
router.put('/:id', async (req, res) => {
  try {
    const updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json(updatedTag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Delete tag
router.delete('/:id', async (req, res) => {
  try {
    const deletedTag = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedTag) {
      res.status(404).json({ message: 'Tag not found' });
      return;
    }

    res.status(200).json(deletedTag);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

module.exports = router;
