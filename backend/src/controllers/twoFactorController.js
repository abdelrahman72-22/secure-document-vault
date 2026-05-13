const speakeasy = require("speakeasy");

const QRCode = require("qrcode");

const { PrismaClient } =
  require("@prisma/client");

const prisma = new PrismaClient();

exports.generate2FA = async (
  req,
  res
) => {

  try {

    const user =
  await prisma.user.findUnique({

    where: {
      id: req.user.id
    }

  });

let secret;

if (user.twoFactorSecret) {

  secret = {
    base32:
      user.twoFactorSecret,

    otpauth_url:
      speakeasy.otpauthURL({

        secret:
          user.twoFactorSecret,

        label:
          `SecureVault (${req.user.email})`,

        issuer:
          "SecureVault",

        encoding:
          "base32"

      })

  };

} else {

  secret =
    speakeasy.generateSecret({

      name:
        `SecureVault (${req.user.email})`

    });

  await prisma.user.update({

    where: {
      id: req.user.id
    },

    data: {

      twoFactorSecret:
        secret.base32

    }

  });

}

QRCode.toDataURL(

  secret.otpauth_url,

  (err, data_url) => {

    res.json({

      success: true,

      qrCode: data_url

    });

  }

);


  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        "2FA generation failed"

    });

  }

};

exports.verify2FA = async (
  req,
  res
) => {

  try {

    const { token } = req.body;

    const user =
      await prisma.user.findUnique({

        where: {
          id: req.user.id
        }

      });

    const verified =
      speakeasy.totp.verify({

        secret:
          user.twoFactorSecret,

        encoding: "base32",

        token

      });

    if (!verified) {

      return res.status(400).json({

        success: false,

        message:
          "Invalid OTP"

      });

    }

    res.json({

      success: true,

      message:
        "2FA verified"

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        "Verification failed"

    });

  }

};
