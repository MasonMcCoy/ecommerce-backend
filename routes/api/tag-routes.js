const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const allTags = await Tag.findAll({
        include: [{model: Product}]
      });
    res.status(200).json(allTags);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{model: Product}]
    })
     res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
   }
});

router.post('/', (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag)
    })
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id
    }
  })
  .then((tag) => {
    return ProductTag.findAll({
      where: { tag_id: req.params.id }
    })
  })
  .then((productTags) => {
    const tagProductIds = productTags.map(({ product_id }) => product_id);
    // PICK IT UP HERE
  })
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id
    }
  })
  .then((dropTag) => {
    res.json(dropTag);
  })
  .catch((err) => res.json(err));
});

module.exports = router;
