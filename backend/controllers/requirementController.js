const dbClient = require("../config/db");
const OrderStatus = require("../config/orderStatus");
const upload = require("../config/upload");

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
      public."Requirement"."StatusId",
      public."Requirement"."ImageURL"
      FROM public."Requirement"
      JOIN public."Camp_Data" ON public."Requirement"."CampId" = public."Camp_Data"."Id"
      JOIN public."Items" ON public."Requirement"."ItemId" = public."Items"."Id"
      WHERE public."Requirement"."IsDeleted" = false
    `;
    const params = [];

    if (req.query.district || req.query.categories) {
      if (req.query.district) {
        params.push(req.query.district.toLowerCase());
        sql += ` AND LOWER(public."Camp_Data"."District") = $${params.length}`;
      }

      if (req.query.categories) {
        params.push(req.query.categories);
        sql += ` AND public."Requirement"."ItemId" = $${params.length}`;
      }
    }

    sql += ` ORDER BY public."Requirement"."CreatedOn" DESC LIMIT $${
      params.length + 1
    } OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await dbClient.query(sql, params);
    const totalResult = await dbClient.query(
      'SELECT COUNT(*) FROM public."Requirement" WHERE "IsDeleted" = false'
    );
    const totalItems = parseInt(totalResult.rows[0].count);

    const requirements = result.rows.map((requirement) => {
      if (requirement.ImageURL) {
        requirement.ImageURL = `${req.protocol}://${req.get("host")}${requirement.ImageURL}`;
      }
      return requirement;
    });

    res.json({
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      data: requirements,
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
      `SELECT 
      public."Requirement"."Id",
      public."Items"."Name" AS "ItemName",
      public."Items"."Description",
      public."Requirement"."RequiredQuantity",
      public."Requirement"."AchievedQuantity",
      public."Camp_Data"."Name" AS CampName,
      public."Camp_Data"."District",
      public."Requirement"."StatusId",
      public."Requirement"."ImageURL"
      FROM "Requirement" 
      JOIN public."Camp_Data" ON public."Requirement"."CampId" = public."Camp_Data"."Id"
      JOIN public."Items" ON public."Requirement"."ItemId" = public."Items"."Id"
      WHERE public."Requirement"."IsDeleted" = false
      AND public."Requirement"."Id" = $1`,
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
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({ error: err });
      }

      const { ItemId, CampId, RequiredQuantity, AchievedQuantity } = req.body;
      const ImageURL = req.file
        ? `/uploads/${req.file.filename}`
        : null;

      const result = await dbClient.query(
        `INSERT INTO public."Requirement"("ItemId", "CampId", "StatusId", "RequiredQuantity", "AchievedQuantity", "ImageURL", "CreatedOn", "IsDeleted")
        VALUES ($1, $2, $3, $4, $5, $6, $7, false) RETURNING *`,
        [
          ItemId,
          CampId,
          OrderStatus.PENDING,
          RequiredQuantity,
          AchievedQuantity,
          ImageURL,
          new Date().toISOString(),
        ]
      );
      res.status(201).json({
        message: "Requirement inserted successfully",
        requirement: result.rows[0],
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to insert Requirement" });
  }
};

exports.updateRequirement = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    const { Id, ItemId, CampId, StatusId, RequiredQuantity, AchievedQuantity } =
      req.body;


    const ImageURL = req.file
      ? `/uploads/${req.file.filename}`
      : req.body.ImageURL;

    try {
      const result = await dbClient.query(
        'UPDATE "Requirement" SET "ItemId" = $2, "CampId" = $3, "StatusId" = $4, "RequiredQuantity" = $5, "AchievedQuantity" = $6, "ImageURL" = $7 WHERE "Id" = $1 RETURNING *',
        [
          Id,
          ItemId,
          CampId,
          StatusId,
          RequiredQuantity,
          AchievedQuantity,
          ImageURL,
        ]
      );
      if (result.rowCount > 0) {
        res.json({
          message: "Requirement updated successfully",
          requirement: result.rows[0],
        });
      } else {
        res.status(404).json({ message: "Requirement updation failed" });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to update requirement" });
    }
  });
};
exports.deleteRequirement = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await dbClient.query(
      `UPDATE public."Requirement" SET "IsDeleted" = true WHERE "Id" = $1 RETURNING *`,
      [id]
    );
    if (result.rowCount > 0) {
      res.status(200).json({
        message: "Requirement deleted successfully",
        requirement: result.rows[0],
      });
    } else {
      res.status(404).json({ message: "Requirement deletion failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete requirement" });
  }
};
