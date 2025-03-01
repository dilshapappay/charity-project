const dbClient = require("../config/db");


exports.getRequirements = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    let sql = `
      SELECT 
        public."Requirement"."Id",
        public."Items"."Name",
        public."Items"."Description",
        public."Requirement"."RequiredQuantity",
        public."Requirement"."AchievedQuantity",
        public."Camp_Data"."District",
        public."Requirement"."StatusId"
      FROM public."Requirement"
      JOIN public."Camp_Data" ON public."Requirement"."CampId" = public."Camp_Data"."Id"
      JOIN public."Items" ON public."Requirement"."ItemId" = public."Items"."Id"
    `;
    const params = [];

    if (req.query.district || req.query.categories) {
      sql += " WHERE ";

      if (req.query.district) {
        params.push(req.query.district.toLowerCase());
        sql += `LOWER(public."Camp_Data"."District") = $${params.length}`;
      }

      if (req.query.categories) {
        if (req.query.district) {
          sql += " AND ";
        }
        params.push(req.query.categories);
        sql += `public."Requirement"."ItemId" = $${params.length}`;
      }
    }

    sql += ` ORDER BY public."Requirement"."CreatedOn" DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);


    const result = await dbClient.query(sql, params);
    const totalResult = await dbClient.query('SELECT COUNT(*) FROM public."Requirement"');
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
    res.status(500).json({ error: "Failed to retrieve requirements" });
  }
};

exports.getRequirementById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await dbClient.query(
      'SELECT * FROM "Requirement" WHERE "Id" = $1',
      [id]
    );

    if (result.rows.length > 0) {
      res.status(200).json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Requirement not found" });
    }
  } catch (error) {
    console.error("Error retrieving Requirement by ID:", error);
    res.status(500).json({ error: "Failed to retrieve Requirement" });
  }
};

exports.createRequirements = async (req, res) => {
  const { ItemId, CampId, StatusId, RequiredQuantity, AchievedQuantity} =
    req.body;

  try {
    const result = await dbClient.query(
      `INSERT INTO public."Requirement"("ItemId", "CampId", "StatusId", "RequiredQuantity", "AchievedQuantity","CreatedOn")
      VALUES ($1,$2,$3,$4,$5,$6)`,
      [ItemId, CampId, StatusId, RequiredQuantity, AchievedQuantity, new Date().toDateString()]
    );
    res
      .status(201)
      .json({
        message: "Requirement inserted successfully",
        user: result.rows[0],
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to insert Requirement" });
  }
};
exports.updateRequirement = async (req, res) => {
  const { Id, ItemId, CampId, StatusId, RequiredQuantity, AchievedQuantity } =
    req.body;
  try {
    const result = await dbClient.query(
      'UPDATE "Requirement" SET "ItemId" = $2, "CampId" = $3, "StatusId" = $4, "RequiredQuantity" = $5,  "AchievedQuantity" = $6  WHERE "Id" = $1',
      [Id, ItemId, CampId, StatusId, RequiredQuantity, AchievedQuantity]
    );
    if (result.rowCount > 0) {
      res.json({ message: "Order updated successfully" }); 
    } else {
      res.status(404).json({ message: "Requirement updation failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to requirement user" });
  }
};

exports.deleteRequirement = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await dbClient.query(
      `DELETE FROM public."Requirement" WHERE "Id" = $1`,
      [id]
    );
    res
      .status(201)
      .json({
        message: "Requirement deleted successfully",
        user: result.rows[0],
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete requirement" });
  }
};
