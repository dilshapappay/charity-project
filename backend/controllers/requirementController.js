const dbClient = require('../config/db');
exports.getRequirements = async (req, res) => {
    try {
      const result = await dbClient.query('SELECT * FROM public."Requirement"');
      res.json(result.rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to retrieve requirement' });
    }
  };

  exports.createRequirements = async (req, res) => {
    const { ItemId, CampId, StatusId, RequiredQuantity, AchievedQuantity } = req.body;
  
    try {
      const result = await dbClient.query(
        `INSERT INTO public."Requirement"("ItemId", "CampId", "StatusId", "RequiredQuantity", "AchievedQuantity")
      VALUES ($1,$2,$3,$4,$5)`,
        [ItemId, CampId, StatusId, RequiredQuantity, AchievedQuantity]
      );
      res.status(201).json({ message: 'Requirement inserted successfully', user: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to insert Requirement' });
    }
  };
  exports.deleteRequirement = async (req, res) => {
    const { id } = req.body;
    try {
      const result = await dbClient.query(
        `DELETE FROM public."Requirement" WHERE "Id" = $1`,
        [id]
      );
      res.status(201).json({ message: 'Requirement deleted successfully', user: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete requirement' });
    }
  };
  