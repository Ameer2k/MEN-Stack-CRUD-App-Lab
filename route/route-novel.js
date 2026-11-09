const router = require("express").Router();
const Novel = require("../models/Novel");

router.get("/novels/new", (req, res) => {
  res.render("create-novel.ejs", { novel: {} });
});

router.post("/novels", async (req, res) => {
  req.body.gere = (req.body.gere || "")
    .split(",")
    .map((genre) => genre.trim())
    .filter(Boolean);
  await Novel.create(req.body);
  res.redirect("/novels");
});

router.get("/novels", async (req, res) => {
  const novels = await Novel.find();
  res.render("novel-list.ejs", { novels });
});

router.get("/novels/:novelId", async (req, res) => {
  const novel = await Novel.findById(req.params.novelId);
  res.render("novel-details.ejs", { novel });
});

router.get("/novels/:novelId/edit", async (req, res) => {
  const novel = await Novel.findById(req.params.novelId);
  res.render("edit-novel.ejs", { novel });
});

router.put("/novels/:novelId", async (req, res) => {
  req.body.gere = (req.body.gere || "")
    .split(",")
    .map((genre) => genre.trim())
    .filter(Boolean);
  await Novel.findByIdAndUpdate(req.params.novelId, req.body);
  res.redirect(`/novels/${req.params.novelId}`);
});

router.delete("/novels/:novelId", async (req, res) => {
  await Novel.findByIdAndDelete(req.params.novelId);
  res.redirect("/novels");
});

module.exports = router;
