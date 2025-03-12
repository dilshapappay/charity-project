const dbClient = require('../config/db');

exports.getCamps = async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;

    try {
        const result = await dbClient.query(`
            SELECT 
                public."Camp_Data"."Id",
                public."User"."FirstName",
                public."User"."LastName",
                public."Camp_Data"."Name",
                public."Camp_Data"."Description",
                public."Camp_Data"."LocationAddress",
                public."Camp_Data"."District"
            FROM 
                public."Camp_Data"
            JOIN 
                public."User" 
            ON 
                public."Camp_Data"."CampAdminId" = public."User"."Id" 
            WHERE 
                public."Camp_Data"."IsDeleted"=false 
            LIMIT $1 OFFSET $2`, [limit, offset] ); 
                const totalResult = await dbClient.query('SELECT COUNT(*) FROM public."Camp_Data" WHERE "IsDeleted"=false');
                const totalItems = parseInt(totalResult.rows[0].count);
                res.json({
                  page,
                  limit,
                  totalItems,
                  totalPages: Math.ceil(totalItems / limit),
                  data: result.rows
                });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve camp' });
    }
};

  exports.getCampById=async(req,res)=>{
    const { id } = req.params;
    try{
        const result=await dbClient.query('SELECT * FROM "Camp_Data" WHERE "Id"=$1',
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
    const { CampAdminId,Name,Description,LocationAddress,District } = req.body;
  
    try {
      const result = await dbClient.query(
        `INSERT INTO public."Camp_Data"("CampAdminId","Name","Description","LocationAddress","District","CreatedOn")
      VALUES ($1, $2,$3,$4,$5,$6) RETURNING *`,
      [CampAdminId,Name,Description,LocationAddress,District,new Date().toDateString()]
      );
      res.status(201).json({ message: 'Camp inserted successfully', user: result.rows[0] });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to insert camp' });
    }
  };

  exports.updateCamp=async(req,res)=>{
    const { Id,CampAdminId,Name,Description,District,LocationAddress} = req.body; 
    try{
        const result=await dbClient.query('UPDATE "Camp_Data" SET "CampAdminId" = $2, "Name" = $3, "Description" = $4, "District"=$5, "LocationAddress" = $6,"UpdatedOn"=$7 WHERE "Id" = $1',
            [Id ,CampAdminId,Name,Description,District,LocationAddress,new Date().toDateString()]
        );
        if (result.rowCount > 0) {
          res.json({ message: "Camp updated successfully" });     
        } else {
            res.status(404).json({ message: 'Camp updation failed' });
        }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update camp' });
    }
  }
    
  exports.deleteCamp = async (req, res) => {
    const { id } = req.body;
    try {
      await dbClient.query('UPDATE public."Camp_Data" SET "IsDeleted" = true WHERE "Id" = $1', [id]);
      res.status(200).json({ message: 'Camp deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to mark camp as deleted' });
    }
  };