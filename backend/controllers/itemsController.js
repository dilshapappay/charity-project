const dbClient = require('../config/db');

exports.getItems = async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;
  try {
    const result = await dbClient.query(`SELECT * FROM public."Items"LIMIT $1 OFFSET $2`, [limit, offset]);
    const totalResult = await dbClient.query('SELECT COUNT(*) FROM public."Items"');
    const totalItems = parseInt(totalResult.rows[0].count);
    res.json({
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      data: result.rows
    });  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve Items' });
  }
};


exports.getItemById = async (req, res) => {
  const { id } = req.params;
  
  try {
    const result = await dbClient.query('SELECT * FROM "Items" WHERE "Id" = $1', [id]);

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error retrieving item by ID:', error);
    res.status(500).json({ error: 'Failed to retrieve item' });
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

  exports.updateItem=async(req,res)=>{
    const { Id,Name,Description } = req.body; 
    try{
        const result=await dbClient.query('UPDATE "Items" SET "Name" = $2, "Description" = $3 WHERE "Id" = $1',
            [ Id,Name,Description]
        );
        if (result.rows.length > 0) {
            res.json(result.rows[0]); 
        } else {
            res.status(404).json({ message: 'Item updated successfully' });
        }
    } catch (error) {
      console.error( error);
      res.status(500).json({ error: 'Failed to update item' });
    }
  }
  exports.deleteItem = async (req, res) => {
    const { Id } = req.body;
    try {
      const result = await dbClient.query(
        `DELETE FROM public."Items" WHERE "Id" = $1`,
        [Id]
      );
      res.status(201).json({ message: 'Item deleted successfully', user: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to delete item' });
    }
  };
  