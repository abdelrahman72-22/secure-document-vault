const { PrismaClient } =
  require("@prisma/client");

const prisma =
  new PrismaClient();

exports.getAllDocuments =
  async (req, res) => {

    try {

      const documents =
        await prisma.document.findMany({

          include: {
            owner: true
          }

        });

      res.json({

        success: true,

        documents

      });

    } catch (error) {

      res.status(500).json({

        success: false,

        message:
          "Failed to fetch documents"

      });

    }

  };
