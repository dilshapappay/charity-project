const dbClient = require('../config/db');

exports.getRoles = async (req, res) => {
  try {
    const result = await dbClient.query('SELECT * FROM public."Role" WHERE "IsDeleted" = false');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve role' });
  }
};

exports.getRoleById=async(req,res)=>{
  const { id } = req.params;
  try{
      const result=await dbClient.query('SELECT * FROM "Role" WHERE Id=$1',
          [id]
      );
      if (result.rows.length > 0) {
          res.json(result.rows[0]); 
      } else {
          res.status(404).json({ message: 'Role not found' });
      }
  } catch (error) {
      
      console.error('Error retrieving role by ID:', error);
      res.status(500).json({ error: 'Failed to retrieve role' });
  }
}
exports.createRoles = async (req, res) => {
  const {RoleName } = req.body;

  try {
    const result = await dbClient.query(
      `INSERT INTO public."Role"("RoleName","CreatedOn","IsDeleted")
	VALUES ($1,$2,false) RETURNING *`,  
      [RoleName,new Date().toDateString()]
    );
    res.status(201).json({ message: 'Role added successfully', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add role' });
  }
};



exports.deleteRoles = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await dbClient.query(
     `UPDATE public."Role" SET "IsDeleted" = true WHERE "Id" = $1 RETURNING *`,
      [id]
    );
    if (result.rowCount > 0) {
      res.json({ message: 'Role deleted successfully' });
    } else {
      res.status(404).json({ message: 'Role not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete role' });
  }
};