const multer = require("multer");

const storage = multer.diskStorage({

  destination: (
    req,
    file,
    cb
  ) => {

    cb(
      null,
      "src/uploads/"
    );

  },

  filename: (
    req,
    file,
    cb
  ) => {

    cb(
      null,
      Date.now() +
      "-" +
      file.originalname
    );

  }

});

const fileFilter = (
  req,
  file,
  cb
) => {

  const allowedTypes = [

  "application/pdf",

  "text/plain",

  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",

  "image/png",

  "image/jpeg",

  "image/jpg"

];

  if (
    allowedTypes.includes(
      file.mimetype
    )
  ) {

    cb(null, true);

  } else {

    cb(

      new Error(
        "Only PDF, TXT, DOCX allowed"
      ),

      false

    );

  }

};

const upload = multer({

  storage,

  limits: {

    fileSize:
      5 * 1024 * 1024

  },

  fileFilter

});

module.exports = upload;
