const dbClient = require('../config/db');
exports.getOrders = async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit; 

  try {
    const result = await dbClient.query(`
      SELECT 
        public."Orders"."Id",
        public."User"."FirstName",
        public."User"."LastName",
        public."Items"."Name" AS "ProductName",
        public."Orders"."StatusId",
        public."Orders"."Quantity"
      FROM 
        public."Orders"
      LEFT JOIN 
        public."User" ON public."Orders"."UserId" = public."User"."Id"
      JOIN 
        public."Items" ON public."Orders"."RequirementId" = public."Items"."Id"
      LIMIT $1 OFFSET $2`, [limit, offset]);

    const totalResult = await dbClient.query('SELECT COUNT(*) FROM public."Orders"');
    const totalItems = parseInt(totalResult.rows[0].count); // Get the total count of orders

    res.json({
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      data: result.rows
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve Orders' });
  }
};


exports.getOrderById=async(req,res)=>{
  const {id} = req.params;
  try{
      const result=await dbClient.query('SELECT * FROM  "Orders" WHERE "Id"=$1',
          [id]
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
  const { UserId,RequirementId, StatusId,Quantity } = req.body;

  try {
    const result = await dbClient.query(
      `INSERT INTO public."Orders"( "UserId","RequirementId", "StatusId","Quantity")
    VALUES ($1, $2, $3, $4)`,
      [UserId,RequirementId, StatusId,Quantity]
    );
    res.status(201).json({ message: 'Order inserted successfully', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to insert order' });
  }
};

exports.updateOrder=async(req,res)=>{
  const { Id,RequirementId, StatusId, UserId,Quantity} = req.body; 
  try{
      const result=await dbClient.query('UPDATE "Orders" SET "RequirementId" = $2, "StatusId" = $3, "UserId" = $4,"Quantity" = $5  WHERE "Id" = $1',
          [Id ,RequirementId, StatusId, UserId, Quantity]
     );
      if (result.rowCount > 0) {
          } else {
          res.status(404).json({ message: 'Order updation failed' });
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