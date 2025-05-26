import prisma from "../../prisma/context.js";


const getProfiles = async () => {
    try {
        const profiles = await prisma.profiles.findMany({
            where: {
                deleted: false,
            },
            include : {
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        return profiles;
    } catch (error) {
        throw new Error("Error fetching profiles: " + error.message);
    }
}

const getProfilesById = async (id) => {
    try {
        const profiles = await prisma.profiles.findUnique({
            where: {
                id: parseInt(id), // convertir el id a entero
            },
            include : {
                user: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
            },
        });
        return profiles;
    } catch (error) {
        throw new Error("Error fetching profiles: " + error.message);
    }
}

const updateProfilesById = async (id, data) => {
    try {
        const profiles = await prisma.profiles.update({
            where: {
                id: parseInt(id), // convertir el id a entero
            },
            data: data,
        });
        return profiles;
    } catch (error) {
        throw new Error("Error updating profiles: " + error.message);
    }
}

const createdProfiles = async ({ name, lastname, email, userId }) => {
  // Validar que el usuario exista
  const user = await prisma.users.findUnique({
    where: { id: userId }
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Verificar si ya tiene un perfil
  const existingProfile = await prisma.profiles.findUnique({
    where: { userId }
  });

  if (existingProfile) {
    throw new Error('Profile already exists for this user');
  }

  // Crear perfil
  const profile = await prisma.profiles.create({
    data: {
      name,
      lastName: lastname,
      email,
      userId
    }
  });

  return profile;
};


const deleteProfilesById = async (id) => {
    try{
        const profiles = await prisma.profiles.update({
            where : {
                id: parseInt(id), // convertir el id a entero
            },
            data: {
                deleted: true,
            },
        });
            return profiles;
        }catch (error) {
        throw new Error("Error deleting profiles: " + error.message);
    }
}

const getProfilesByUserId = async (userId) => {
    return await prisma.profiles.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                },
            },
        },
        where: {
            userId: parseInt(userId),
            deleted: false,
        },
    });
}
export {
    getProfiles,
    getProfilesById,
    updateProfilesById,
    createdProfiles,
    deleteProfilesById,
    getProfilesByUserId
}
