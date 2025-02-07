const dbClient = require('../config/db');

 exports.getVolunteers = async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10; 
  const offset = (page - 1) * limit;

  try {
    const result = await dbClient.query(`SELECT  
    public."Camp_Volunteers"."Id",
    public."User"."FirstName",
    public."User"."LastName",
    public."Camp_Data"."Name" AS "CampName"
FROM 
    public."Camp_Volunteers"
LEFT JOIN 
    public."User" 
ON 
    public."Camp_Volunteers"."UserId" = public."User"."Id"
JOIN 
    public."Camp_Data" 
ON 
    public."Camp_Volunteers"."CampId" = public."Camp_Data"."Id"  LIMIT $1 OFFSET $2`, [limit, offset]);

    const totalResult = await dbClient.query('SELECT COUNT(*) FROM public."Camp_Volunteers"');
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
    res.status(500).json({ error: 'Failed to retrieve Volunteers' });
  }
};

exports.getVolunteerById=async(req,res)=>{
  const {id} = req.params;
  try{
      const result=await dbClient.query('SELECT * FROM  "Camp_Volunteers" WHERE "Id"=$1',
          [id]
      );
      if (result.rows.length > 0) {
          res.json(result.rows[0]); 
      } else {
          res.status(404).json({ message: 'Volunteer not found' });
      }
  } catch (error) {
      
      console.error('Error retrieving volunteer by ID:', error);
      res.status(500).json({ error: 'Failed to retrieve volunteer' });
  }
}

exports.createVolunteer = async (req, res) => {
  const { UserId, CampId } = req.body;

  try {
    const result = await dbClient.query(
      `INSERT INTO "Camp_Volunteers"("UserId","CampId")
	VALUES ($1, $2)`,
      [ UserId, CampId]
    );
    res.status(201).json({ message: 'Volunteer added successfully', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add volunteer' });
  }
};
exports.updateVolunteer=async(req,res)=>{
  const { Id, UserId,CampId} = req.body; 
  try{
      const result=await dbClient.query('UPDATE "Camp_Volunteers" SET "UserId" = $2, "CampId" = $3 WHERE "Id" = $1',
          [ Id, UserId,CampId]
      );
      if (result.rows.length > 0) {
          res.json(result.rows[0]); 
      } else {
          res.status(404).json({ message: 'Volunteer updated successfully' });
      }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update volunteer' });
  }
}

exports.deleteVolunteer = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await dbClient.query(
      `DELETE FROM public."Camp_Volunteers" WHERE "Id" = $1`,
      [id]
    );
    res.status(201).json({ message: 'volunteer deleted successfully', user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete volunteer' });
  }
};