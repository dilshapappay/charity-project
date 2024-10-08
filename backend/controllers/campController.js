const dbClient = require('../config/db');
exports.getCamps = async (req, res) => {
    try {
      const result = await dbClient.query('SELECT * FROM public."Camp_Data"');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve camp' });
    }
  };
  exports.createCamps = async (req, res) => {
    const { CampAdminId,Name,Description,LocationAddress } = req.body;
  
    try {
      const result = await dbClient.query(
        `INSERT INTO public."Items"("CampAdminId","Name","Description","LocationAddress")
      VALUES ($1, $2)`,
        [CampAdminId,Name,Description,LocationAddress]
      );
      res.status(201).json({ message: 'Item inserted successfully', user: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to insert item' });
    }
  };
