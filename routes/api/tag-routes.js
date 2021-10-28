const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', (req, res) => {
  Tag.findAll({
    include:[Product]
  }).then(dbTag => {
    if(dbTag.length){
      res.json(dbTag);
    }else{
      res.status(404).json("No tag found")
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json("internal server error")
  })
});

router.get('/:id', (req, res) => {
  Tag.findOne({
    where: {id: req.params.id},
    include: [Product]
  }).then(dbTag => {
    if(dbTag){
      res.json(dbTag)
    }else{
      res.status(404).json("Incorrect tag id")
    }
  }).catch(err => {
    console.log(err);
    res.status(500).json("internal server error")
  })
});

router.post('/', (req, res) => {
  Tag.create(req.body)
  .then((tag) => {
    res.json(tag)
  }).catch(err => {
    console.log(err);
    res.status(500).json("internal server error")
  })
});

router.put('/:id', (req, res) => {
  Tag.update({
    tag_name:req.body.tag_name
  },{
    where:{
      id:req.params.id
    }
  }).then((upTag) => {
    res.json(upTag)
  }).catch(err => {
    console.log(err);
    res.status(500).json("internal server error")
  })
});

router.delete('/:id', (req, res) => {
  Tag.destroy({
    where:{
      id:req.params.id
    }
  }).then(delCat => {
    res.json("entry deleted")
  })
});

module.exports = router;
