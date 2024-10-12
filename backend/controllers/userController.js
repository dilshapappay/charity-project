const dbClient = require('../config/db');

exports.getUsers = async (req, res) => {
  try {
    const result = await dbClient.query('SELECT * FROM "User"');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

exports.getUserById=async(req,res)=>{
  const { id } = req.params;
  try{
      const result=await dbClient.query('SELECT * FROM "User" WHERE "Id"=$1',
          [id]
      );
      if (result.rows.length > 0) {
          res.json(result.rows[0]); 
      } else {
          res.status(404).json({ message: 'User not found' });
      }
  } catch (error) {
      
      console.error('Error retrieving user by ID:', error);
      res.status(500).json({ error: 'Failed to retrieve user' });
  }
}

exports.createUser = async (req, res) => {
  const { firstName, lastName, roleId, password, email, address, mobile } = req.body;

  try {
    const result = await dbClient.query(
      `INSERT INTO "User"("FirstName", "LastName", "RoleId", "Password", "Email", "Address", "Mobile")
	VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [firstName, lastName, roleId, password, email, address, mobile]
    );
    res.status(201).json({ message: 'User added successfully', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add user' });
  }
};
exports.deleteUser = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await dbClient.query(
      `DELETE FROM "User" WHERE "Id" = $1`,
      [id]
    );
    res.status(201).json({ message: 'User deleted successfully', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
