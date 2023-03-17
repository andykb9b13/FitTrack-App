const router = require("express").Router();


//image upload post
router.post('/upload', (req, res) => {
  let sampleFile;
  let uploadPath;
  if(!req.files || Object.keys(req.files).length === 0){
    return res.status(400).send('No files were uploaded.');
  }
  //name of the input is samplefile
  sampleFile = req.files.sampleFile;
  console.log(sampleFile);

})

module.exports = router;