const dbClient = require('../config/db');

exports.getRoles = async (req, res) => {
  try {
    const result = await dbClient.query('SELECT * FROM public."Role"');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve role' });
  }
};
exports.createRoles = async (req, res) => {
  const {RoleName } = req.body;

  try {
    const result = await dbClient.query(
      `INSERT INTO public."Role"("RoleName")
	VALUES ($1)`,  
      [RoleName]
    );
    res.status(201).json({ message: 'Role added successfully', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add role' });
  }
};