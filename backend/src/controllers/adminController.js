const { PrismaClient } =
  require("@prisma/client");

const prisma = new PrismaClient();

exports.getAllUsers = async (
  req,
  res
) => {

  try {

    const users =
      await prisma.user.findMany({

        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true
        }

      });

    res.json({

      success: true,

      users

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        "Failed to fetch users"

    });

  }

};

exports.changeRole = async (
  req,
  res
) => {

  try {

    const { role } = req.body;

    const user =
      await prisma.user.update({

        where: {
          id: Number(req.params.id)
        },

        data: {
          role
        }

      });

    res.json({

      success: true,

      user

    });

  } catch (error) {

    res.status(500).json({

      success: false,

      message:
        "Role update failed"

    });

  }

};
