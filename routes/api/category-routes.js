const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const allCategories = await Category.findAll({
        include: [{model: Product}]
      });
    res.status(200).json(allCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{model: Product}]
    })
     res.status(200).json(category);
  } catch (err) {
    res.status(500).json(err);
   }
});

router.post('/', (req, res) => {
  // create a new category
  Category.create(req.body)
  .then((tag) => {
    res.status(200).json(tag)
  })
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((category) => {
    return Product.findAll({
      where: { category_id: req.params.id }
    })
  })
  .then((newCat) => {
    res.json(newCat);
  })
  .catch((err) => {
    res.json(err)
  });
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deletedCat = Category.destroy({
      where: {
        id: req.params.id
      }
    })

    if (!deletedCat) {
      res.status(404).json("Invalid Category!");
    }

    res.status(200).json("Category successfully deleted.");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
