const express = require("express");
// const app = express()
const router = express.Router();
const { addPage } = require("../views");
const { wikiPage } = require("../views");
const { main } = require("../views");
const { Page } = require("../models");

router.get("/", async (req, res) => {
  const pages = await Page.findAll()
  console.log(pages);
  res.send(main(pages));
});

router.post('/', async (req, res, next) => {
  const { title, content, status } = req.body;
  try {
    const page = await Page.create({
      title,
      content,
      status
    });
    //await page.save();
    res.redirect(`/wiki/${page.slug}`);
  } catch (error) {
    next(error);
  }
});

router.get("/add", (req, res) => {
  console.log("retrieve the add a page form");
  res.send(addPage());
});

router.get('/:slug', async (req, res, next) => {

  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug
      }
    });
    res.send(wikiPage(page, 'Joe'));
  } catch (error) {
    next(error)
  }
});

module.exports = router;
