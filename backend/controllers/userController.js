const dbClient = require('../config/db');

exports.getUsers = async (req, res) => {
  try {
let sql=`SELECT 
 public."Role"."RoleName",
  public."User"."FirstName",
   public."User"."LastName",
   public."User"."Email",
   public."User"."Address",
   public."User"."Mobile"
FROM 
  public."User" 
JOIN 
  public."Role" 
ON 
  public."User"."RoleId" = public."Role"."id";`


    const result = await dbClient.query(sql);
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
  const { FirstName, LastName, RoleId, Password, Email, Address, Mobile } = req.body;

  try {
    const result = await dbClient.query(
      `INSERT INTO "User"("FirstName", "LastName", "RoleId", "Password", "Email", "Address", "Mobile")
	VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [FirstName, LastName, RoleId, Password, Email, Address, Mobile]
    );
    res.status(201).json({ message: 'User added successfully', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add user' });
  }
};

exports.updateUser=async(req,res)=>{
  const { id,firstName, lastName, roleId, password, email, address, mobile } = req.body; 
  try{
      const result=await dbClient.query('UPDATE "User"SET "FirstName" = $2, "LastName" = $3, "RoleId" = $4, "Password" = $5,  "Email" = $6, "Address" = $7, "Mobile" = $8 WHERE "Id" = $1',
          [id,firstName, lastName, roleId, password, email, address, mobile]
      );
      if (result.rows.length > 0) {
          res.json(result.rows[0]); 
      } else {
          res.status(404).json({ message: 'User updated successfully' });
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update user' });
  }
}


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
