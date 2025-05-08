const RoleModel = require ('./roles-models')

const getAll = async (req, res) =>{
    try {
        const roles = await RoleModel.getAllRoles()
        res.json(roles)
    } catch (err) {
        res.status(500).json({message : err.message})
    }
}

const getOne = async ( req, res) => {
    try {
        const role = await RoleModel.getRoleById(req.params.id)
        if(!role) return res.status(404).json({message: 'rol no encontrado ! '})
        res.json(role)
    }catch (err){
        res.status(500).json({message: err.message})
    }
}

const create = async (req, res) => {
    try{
        const newRol = await RoleModel.createRole(req.body)
        res.json(201).json(newRole)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

const update = async (req , res) =>{
    try{
        const updateR = await RoleModel.updateRole(req, params.id, req.body)
        res.json(updateR)
    }catch(err){
        res.status(400).json({message: err.message})
    }
}

const remove = async (  req, res ) =>{
    try{
        const delateR = RoleModel.deleteRole(req.params.id)
        req.json({message : 'Se elimino el rol correctamente '})
    } catch (err){
        req.status(400).json({message: err.message})
    }
}

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
}