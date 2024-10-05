/*const dbClient = require('../config/db');

exports.getOrder = async (req, res) => {
  try {
    const result = await dbClient.query('SELECT * FROM public."Order"');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve Order' });
  }
};
exports.createOrder = async (req, res) => {
    const { RequirementId, StatusId, UserId } = req.body;
  
    try {
      const result = await dbClient.query(
        `INSERT INTO public."User"("RequirementId", "StatusId", "UserId")
      VALUES ($1, $2, $3)`,
        [RequirementId, StatusId, UserId]
      );
      res.status(201).json({ message: 'Order inserted successfully', user: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to insert order' });
    }
  };*/