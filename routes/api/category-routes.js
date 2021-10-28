const router = require('express').Router();
const { Category, Product, Tag } = require('../../models');

// The `/api/categories` endpoint
router.get('/', (req, res) => {
  Category.findAll({
    include:[Product]
  }).then(dbCategory =>{
    if(dbCategory.length){
      res.json(dbCategory);
    }else{
      res.status(404).json("No category found")
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json("internal server error")
  })
});

router.get('/:id', (req, res) => {
  Category.findOne({
    where: {id: req.params.id},
    include: [Product]
  }).then(dbCategory =>{
    if(dbCategory){
      res.json(dbCategory)
    }else{
      res.status(404).json("Incorrect category id")
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json("Internal server error")
  })
});

router.post('/', (req, res) => {
  Category.create(req.body)
  .then((category) => {
    res.json(category)
  }).catch(err => {
    console.log(err);
    res.status(500).json("Internal server error")
  })
});

router.put('/:id', (req, res) => {
  Category.update({
    category_name:req.body.category_name
  },{
      where:{
        id:req.params.id
      }
  }).then((upCat) => {
    res.json(upCat)
  }).catch(err => {
    console.log(err);
    res.status(500).json("Internal server error")
  })
});

router.delete('/:id', (req, res) => {
  Category.destroy({
    where:{
      id:req.params.id
    }
  }).then(delCat => {
    res.json("entry deleted")
  })
});

module.exports = router;
