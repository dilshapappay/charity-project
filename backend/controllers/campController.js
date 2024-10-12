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
  exports.getCampById=async(req,res)=>{
    const { id } = req.params;
    try{
        const result=await dbClient.query('SELECT * FROM "Camp_Data" WHERE Id=$1',
            [id]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]); 
        } else {
            res.status(404).json({ message: 'Camp not found' });
        }
    } catch (error) {
        
        console.error('Error retrieving camp by ID:', error);
        res.status(500).json({ error: 'Failed to retrieve camp' });
    }
}
  
  exports.createCamps = async (req, res) => {
    const { CampAdminId,Name,Description,LocationAddress } = req.body;
  
    try {
      const result = await dbClient.query(
        `INSERT INTO public."Camp_Data"("CampAdminId","Name","Description","LocationAddress")
      VALUES ($1, $2,$3,$4)`,
      [CampAdminId,Name,Description,LocationAddress]
      );
      res.status(201).json({ message: 'Camp inserted successfully', user: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to insert camp' });
    }
  };

  exports.deleteCamp = async (req, res) => {
    const { id } = req.body;
    try {
      const result = await dbClient.query(
        `DELETE FROM public."Camp_Data" WHERE "Id" = $1`,
        [id]
      );
      res.status(201).json({ message: 'Camp deleted successfully', user: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete Camp' });
    }
  };