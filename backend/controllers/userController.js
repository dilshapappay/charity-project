const dbClient = require("../config/db");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { send } = require("process");
const sendPasswordEmail = require('../Services/EmailServices');

exports.getUsers = async (req, res) => {
  try {
    let sql = `SELECT 
  public."User"."Id",
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
  public."User"."RoleId" = public."Role"."id";`;

    const result = await dbClient.query(sql);
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
};

exports.getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await dbClient.query('SELECT * FROM "User" WHERE "Id"=$1', [
      id,
    ]);
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error retrieving user by ID:", error);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
};

exports.createUser = async (req, res) => {
  try{
    const { FirstName, LastName, RoleId, Email, Address, Mobile } =
    req.body;

  if (!Email) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  const result = await dbClient.query('SELECT * FROM public."User" WHERE public."User"."Email" = $1', [Email]);
  if (result.rows.length > 0) {
    return res.status(400).json({ msg: 'Email already exists' });
  } else {
    const salt = await bcrypt.genSalt(10);
    const Password = crypto.randomBytes(8).toString('hex'); // Generates a 16-character random password
    const hash = await bcrypt.hash(Password, salt);
    await dbClient.query('INSERT INTO public."User" ("Email", "Password") VALUES ($1, $2)', [Email, hash]);
   
   
    sendPasswordEmail(Email, Password);
    res.json({ msg: 'User Registered' });

  }  
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

exports.updateUser = async (req, res) => {
  const { id, firstName, lastName, roleId, password, email, address, mobile } =
    req.body;
  try {
    const result = await dbClient.query(
      'UPDATE "User"SET "FirstName" = $2, "LastName" = $3, "RoleId" = $4, "Password" = $5,  "Email" = $6, "Address" = $7, "Mobile" = $8 WHERE "Id" = $1',
      [id, firstName, lastName, roleId, password, email, address, mobile]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "User updated successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update user" });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.body; 

  try {
    
    const campResult = await dbClient.query('SELECT * FROM "Camp_Data" WHERE "CampAdminId" = $1', [id]);

    if (campResult.rowCount > 0) {
      return res.status(400).json({ 
        message: "Cannot delete user as they are included in the Camp table" 
      });
    }

    // Proceed to delete the user
    const deleteResult = await dbClient.query(
      'DELETE FROM public."User" WHERE "Id" = $1 RETURNING *',
      [id]
    );

    if (deleteResult.rowCount === 0) {
      return res.status(400).json({ message: "User not found" });
    }

    res.status(200).json({ 
      message: "User deleted successfully", 
      user: deleteResult.rows[0] 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete user" });
  }
};
