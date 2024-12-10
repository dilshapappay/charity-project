const dbClient = require('../config/db');

exports.getOrders = async (req, res) => {
  try {
    const result = await dbClient.query('SELECT * FROM public."Orders"');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve Orders' });
  }
};

exports.getOrderById=async(req,res)=>{
  const {Id } = req.params;
  try{
      const result=await dbClient.query('SELECT * FROM  public."Orders" WHERE Id=$1',
          [Id]
      );
      if (result.rows.length > 0) {
          res.json(result.rows[0]); 
      } else {
          res.status(404).json({ message: 'Order not found' });
      }
  } catch (error) {
      
      console.error('Error retrieving order by ID:', error);
      res.status(500).json({ error: 'Failed to retrieve order' });
  }
}

exports.createOrder = async (req, res) => {
  const { RequirementId, StatusId, UserId } = req.body;

  try {
    const result = await dbClient.query(
      `INSERT INTO public."Orders"("RequirementId", "StatusId", "UserId")
    VALUES ($1, $2, $3)`,
      [RequirementId, StatusId, UserId]
    );
    res.status(201).json({ message: 'Order inserted successfully', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to insert order' });
  }
};

exports.updateOrder=async(req,res)=>{
  const { id,RequirementId, StatusId, UserId} = req.body; 
  try{
      const result=await dbClient.query('UPDATE "Orders" SET "RequirementId" = $2, "StatusId" = $3, "UserId" = $4  WHERE "Id" = $1',
          [id ,RequirementId, StatusId, UserId]
      );
      if (result.rows.length > 0) {
          res.json(result.rows[0]); 
      } else {
          res.status(404).json({ message: 'Order updated successfully' });
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update order' });
  }
}
exports.deleteOrder = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await dbClient.query(
      `DELETE FROM public."Orders" WHERE "Id" = $1`,
      [id]
    );
    res.status(201).json({ message: 'Order deleted successfully', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete Order' });
  }
};