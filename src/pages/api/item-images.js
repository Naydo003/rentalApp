import nc from "next-connect";
import { prisma } from '../../database/db'
const cloudinary = require('cloudinary').v2;   // an online storage specifically for images. Has certian functionality that is usefule for images such as cropping, compressing etc.
const { CloudinaryStorage } = require('multer-storage-cloudinary');  // This is an npm that helps us use multer and cloudinary together
const multer  = require('multer');
const DatauriParser = require('datauri/parser')
const path = require('path')



// all in .env file. .env must be in base level.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = multer.memoryStorage()

// new CloudinaryStorage({
//   cloudinary,
//   params: {
//     folder: 'rentalApp',
//     allowedFormats: ['jpeg', 'png', 'jpg']
//   }
// });

// const upload = multer({ storage: storage })

const upload = multer({
  storage,
  fileFilter: function(req, file, cb) {
    if (ALLOWED_FORMATS.includes(file.mimetype)) {
      cb(null, true)
    } else {
      cb(new Error('Not supported file type!'), false)
    }
  },
  limits: {
    fileSize: 50000000
  }
});

// create a neew Data URI parser
const parser = new DatauriParser();

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})

.use(multer().any())
.post(async (req, res) => {
  console.log("req")

  console.log(req.files)
  // get parsed image and video from multer
  const images = req.files.filter((file) => file.fieldname === 'images');
  const video = req.files.filter((file) => file.fieldname === 'video');

  // map through images array and upload each image to cloudinary and create record in database
  const addedImages = await Promise.all(images.map(async (img, index) => {

    // Cloudinary requires 64bit file type. DaturiParser first does this conversion.
    let uploadedImageResponse
    try {
      const base64Image = parser.format(path.extname(img.originalname).toString(), img.buffer);
      uploadedImageResponse = await cloudinary.uploader.upload(base64Image.content, {folder: 'rentalApp'});
    } catch (err) {
      console.log('error with cloudinary upload')

      return 'error with cloudinary upload'
    }

    if (uploadedImageResponse) {
      try {
        const itemId = JSON.parse(req.body.itemId)
        const newItemPhoto = await prisma.itemPhotos.create({
        data: {
          item: { connect: { id: itemId } },
          imageUrl: uploadedImageResponse.secure_url,
          order: index + 1                                       // Need to be able to change the order
        }}) 
        return newItemPhoto
      } catch (err) {
        console.log(err)
        return 'error with prisma upload'
      }
    }
  }))
  console.log("addedImages")
  console.log(addedImages)

  res.status(201).json(addedImages)
  console.log('end a')

})

// disable body parser - needed for multipart data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler