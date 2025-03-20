const dbClient = require("../config/db");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const { send } = require("process");
const sendPasswordEmail = require('../Services/EmailServices');

exports.getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    const result = await dbClient.query(`SELECT 
    public."User"."Id",
    public."User"."RoleId",
    public."User"."FirstName",
    public."User"."LastName",
    public."User"."Email",
    public."User"."Address",
    public."User"."Mobile",
    public."User"."Password"
    FROM 
    public."User" 
    LIMIT $1 OFFSET $2`, [limit, offset])

    const totalResult = await dbClient.query('SELECT COUNT(*) FROM public."User"');
    const totalItems = parseInt(totalResult.rows[0].count);
    res.json({
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      data: result.rows
    });
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

  try {
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
      const newUser = await dbClient.query(
        'INSERT INTO public."User" ("FirstName", "LastName", "Email", "Password", "RoleId", "Address", "Mobile", "CreatedOn","IsDeleted") VALUES ($1, $2, $3, $4, $5, $6, $7, $8,false) RETURNING *',
        [FirstName, LastName, Email, hash, RoleId, Address, Mobile, new Date().toDateString()]
      );

      sendPasswordEmail(Email, Password);
      res.json({ msg: 'User Registered' });

    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
  ``
};

exports.updateUser = async (req, res) => {
  const { Id, FirstName, LastName, RoleId, Password, Email, Address, Mobile } =
    req.body;
  try {
    const result = await dbClient.query(
      'UPDATE "User" SET "FirstName" = $2, "LastName" = $3, "RoleId" = $4, "Password" = $5, "Email" = $6, "Address" = $7, "Mobile" = $8, "UpdatedOn" = $9 WHERE "Id" = $1',
      [Id, FirstName, LastName, RoleId, Password, Email, Address, Mobile, new Date().toDateString()]
    );
    if (result.rowCount > 0) {
      res.json({ message: "User updated successfully" });

    } else {
      res.status(404).json({ message: "User updation failed " });
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
      'UPDATE public."User" SET "IsDeleted" = true WHERE "Id" = $1 RETURNING *',
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
