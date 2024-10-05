const dbClient = require('../config/db');

exports.getUsers = async (req, res) => {
  try {
    const result = await dbClient.query('SELECT * FROM public."User"');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

exports.createUser = async (req, res) => {
  const { firstName, lastName, roleId, password, email, address, mobile } = req.body;

  try {
    const result = await dbClient.query(
      `INSERT INTO public."User"("FirstName", "LastName", "RoleId", "Password", "Email", "Address", "Mobile")
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
      `DELETE FROM public."User" WHERE "Id" = $1`,
      [id]
    );
    res.status(201).json({ message: 'User deleted successfully', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};
