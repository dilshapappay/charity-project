const dbClient = require("../config/db");
const OrderStatus = require("../config/orderStatus");
const Role = require("../config/Role");
const {
  sendOrderEmail,
  sentRejectOrderEmail,
} = require("../Services/EmailServices");

exports.getOrders = async (req, res) => {
  const user = req.user;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const offset = (page - 1) * limit;

  try {
    let query = `
      SELECT public."Orders"."Id", public."User"."FirstName", public."User"."LastName",
             public."Items"."Name" AS "ProductName",
              public."Orders"."StatusId",
             public."Orders"."Quantity"
      FROM public."Orders"
      LEFT JOIN public."User" ON public."Orders"."UserId" = public."User"."Id"
      LEFT JOIN public."Requirement" ON public."Orders"."RequirementId" = public."Requirement"."Id"
      LEFT JOIN public."Items" ON public."Requirement"."ItemId" = public."Items"."Id"
      WHERE public."Orders"."IsDeleted" = false
    `;

    let countQuery = `
      SELECT COUNT(*) 
      FROM public."Orders"
      LEFT JOIN public."Requirement" ON public."Orders"."RequirementId" = public."Requirement"."Id"
      WHERE public."Orders"."IsDeleted" = false
    `;

    const params = [limit, offset];
    const countParams = [];

    // Add filter for normal users
    if (user.RoleId === Role["Normal User"]) {
      query += ` AND public."Orders"."UserId" = $3`;
      countQuery += ` AND public."Orders"."UserId" = $1`;
      params.push(user.Id);
      countParams.push(user.Id);
    }

    // Add filter for Camp Admins

    if (user.RoleId === Role["Camp Admin"]) {
      const campResult = await dbClient.query(
        'SELECT "Id" FROM public."Camp_Data" WHERE "CampAdminId" = $1',
        [user.Id]
      );
      const campIds = campResult.rows.map((row) => row.Id);

      if (campIds.length > 0) {
        query += ` AND public."Requirement"."CampId" = ANY($3::int[])`;
        countQuery += ` AND public."Requirement"."CampId" = ANY($1::int[])`;
        params.push(campIds);
        countParams.push(campIds);
      } else {
        query += ` AND 1 = 0`; // No camps found for this admin, return no results
        countQuery += ` AND 1 = 0`;
      }
    }

    if (user.RoleId === Role["Volunteer"]) {
      const volResult = await dbClient.query(
        `SELECT public."Camp_Data"."Id" FROM public."Camp_Data" left join public."Camp_Volunteers" on "Camp_Volunteers"."CampId"= "Camp_Data"."Id"
      WHERE "Camp_Volunteers"."Id" =$1`,
        [user.Id]
      );
      const campIds = volResult.rows.map((row) => row.Id);
      if (campIds.length > 0) {
        query += ` AND public."Requirement"."CampId" = ANY($3::int[])`;
        countQuery += ` AND public."Requirement"."CampId" = ANY($1::int[])`;
        params.push(campIds);
        countParams.push(campIds);
      } else {
        query += ` AND 1 = 0`; 
        countQuery += ` AND 1 = 0`;
      }
    }

    query += ` LIMIT $1 OFFSET $2`;

    const result = await dbClient.query(query, params);
    const totalResult = await dbClient.query(countQuery, countParams);
    const totalItems = parseInt(totalResult.rows[0].count); // Get the total count of orders

    res.json({
      page,
      limit,
      totalItems,
      totalPages: Math.ceil(totalItems / limit),
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve Orders" });
  }
};
exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await dbClient.query(
      `SELECT public."Orders".*, public."User"."Email",
              public."Items"."Name" AS "RequirementName",
              public."Camp_Data"."LocationAddress",
              public."Camp_Data"."Name" AS "CampName",
              public."Requirement"."RequiredQuantity",
              public."Requirement"."AchievedQuantity"
      FROM public."Orders"
      LEFT JOIN public."User" ON public."Orders"."UserId" = public."User"."Id"
      LEFT JOIN "Requirement" ON "Requirement"."Id" = "Orders"."RequirementId"
      LEFT JOIN public."Camp_Data" ON public."Requirement"."CampId" = public."Camp_Data"."Id"
	        LEFT JOIN "Items" ON "Requirement"."ItemId" = "Items"."Id"

      WHERE "Orders"."Id" = $1`,
      [id]
    );
    if (result.rows.length > 0) {
      res.json(result.rows[0]);
    } else {
      res.status(404).json({ message: "Order not found" });
    }
  } catch (error) {
    console.error("Error retrieving order by ID:", error);
    res.status(500).json({ error: "Failed to retrieve order" });
  }
};

exports.createOrder = async (req, res) => {
  const { RequirementId, Quantity } = req.body;
  const userId = req.user.Id;
  try {
    const result = await dbClient.query(
      `INSERT INTO public."Orders"( "UserId","RequirementId", "StatusId","Quantity","CreatedOn","IsDeleted")
    VALUES ($1, $2, $3, $4,$5,false) RETURNING *`,
      [
        userId,
        RequirementId,
        OrderStatus.PENDING,
        Quantity,
        new Date().toDateString(),
      ]
    );
    res
      .status(201)
      .json({ message: "Order inserted successfully", user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to insert order" });
  }
};

exports.updateOrder = async (req, res) => {
  const { Id, Quantity } = req.body;
  const userId = req.user.Id;
  try {
    const result = await dbClient.query(
      'UPDATE "Orders" SET "Quantity" = $3 , "UpdatedOn"=$4 , "UpdatedBy"=$2 WHERE "Id" = $1',
      [Id, userId, Quantity, new Date().toDateString()]
    );
    if (result.rowCount > 0) {
      res.json({ message: "Order updated successfully" });
    } else {
      res.status(404).json({ message: "Order updation failed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update order" });
  }
};

exports.deleteOrder = async (req, res) => {
  const { id } = req.body;
  try {
    const result = await dbClient.query(
      `UPDATE public."Orders" SET "IsDeleted"=true WHERE "Id" = $1`,
      [id]
    );
    res
      .status(201)
      .json({ message: "Order deleted successfully", user: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete Order" });
  }
};

exports.approveOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const orderResult = await dbClient.query(
      `SELECT public."Orders".*, public."User"."Email",
              public."Items"."Name" AS "RequirementName",
              public."Camp_Data"."LocationAddress"
      FROM public."Orders"
      LEFT JOIN public."User" ON public."Orders"."UserId" = public."User"."Id"
      LEFT JOIN "Requirement" ON "Requirement"."Id" = "Orders"."RequirementId"
      LEFT JOIN public."Camp_Data" ON public."Requirement"."CampId" = public."Camp_Data"."Id"
	        LEFT JOIN "Items" ON "Requirement"."ItemId" = "Items"."Id"
      WHERE public."Orders"."Id" = $1`,
      [id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    const userEmail = orderResult.rows[0].Email; // Extract user email
    const RequirementName = orderResult.rows[0].RequirementName;
    const LocationAddress = orderResult.rows[0].LocationAddress;

    await dbClient.query(
      'UPDATE public."Orders" SET "StatusId" = $1 WHERE "Id" = $2',
      [2, id]
    );
    if (userEmail) {
      sendOrderEmail(userEmail, RequirementName, LocationAddress);
    } else {
      console.warn(`Email not found for order ID: ${id}`);
    }
    res.status(200).json({ message: "Order approved successfully" });
  } catch (error) {
    console.error("Error approving order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.rejectOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const orderResult = await dbClient.query(
      `
	  SELECT public."Orders".*, public."User"."Email" ,
  
         public."Items"."Name" AS "RequirementName",
              public."Camp_Data"."LocationAddress"
    FROM public."Orders"
      LEFT JOIN public."User" ON public."Orders"."UserId" = public."User"."Id"
  LEFT JOIN "Requirement" ON "Requirement"."Id" = "Orders"."RequirementId"
      LEFT JOIN public."Camp_Data" ON public."Requirement"."CampId" = public."Camp_Data"."Id"
	        LEFT JOIN "Items" ON "Requirement"."ItemId" = "Items"."Id"
                WHERE public."Orders"."Id" = $1`,
      [id]
    );

    if (orderResult.rows.length === 0) {
      return res.status(404).json({ message: "Order not found" });
    }
    const userEmail = orderResult.rows[0].Email;
    const RequirementName = orderResult.rows[0].RequirementName;
    const campAddress = orderResult.rows[0].CampAddress;
    const requirementName = orderResult.rows[0].RequirementName;
    await dbClient.query(
      'UPDATE public."Orders" SET "StatusId" = $1 WHERE "Id" = $2',
      [4, id]
    );

    if (userEmail) {
      sentRejectOrderEmail(userEmail, RequirementName, campAddress);
    } else {
      console.warn(`Email not found for order ID: ${id}`);
    }

    res.status(200).json({ message: "Order rejected successfully" });
  } catch (error) {
    console.error("Error rejecting order:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
