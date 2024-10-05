const dbClient = require('../config/db');

exports.getItems = async (req, res) => {
  try {
    const result = await dbClient.query('SELECT * FROM public."Items"');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve Items' });
  }
};
exports.createItems = async (req, res) => {
    const { Name,Description } = req.body;
  
    try {
      const result = await dbClient.query(
        `INSERT INTO public."Items"("Name", "Description")
      VALUES ($1, $2)`,
        [Name,Description]
      );
      res.status(201).json({ message: 'Item inserted successfully', user: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to insert item' });
    }
  };

  exports.deleteItem = async (req, res) => {
    const { id } = req.body;
    try {
      const result = await dbClient.query(
        `DELETE FROM public."Items" WHERE "Id" = $1`,
        [id]
      );
      res.status(201).json({ message: 'Item deleted successfully', user: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete item' });
    }
  };
  