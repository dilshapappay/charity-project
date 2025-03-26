const dbClient = require('../config/db');
const Role = require('../config/Role');

exports.getDashboardData = async (req, res) => {
    const user = req.user;

    try {
        let userFilter = '';
        const params = [];

        // Apply filters based on user role
        if (user.RoleId === Role["Normal User"]) {
            userFilter = `WHERE "UserId" = $1`;
            params.push(user.Id);

            // Fetch only total orders for Normal User
            const totalOrders = await dbClient.query(
                `SELECT COUNT(*) FROM public."Orders" ${userFilter}`,
                params
            );

            return res.json({
                totalOrders: parseInt(totalOrders.rows[0].count),
            });
        } else if (user.RoleId === Role["Camp Admin"]) {
            const campResult = await dbClient.query(
                'SELECT "Id" FROM public."Camp_Data" WHERE "CampAdminId" = $1',
                [user.Id]
            );
            const campIds = campResult.rows.map(row => row.Id);

            if (campIds.length > 0) {
                userFilter = `WHERE "CampId" = ANY($1::int[])`;
                params.push(campIds);
            } else {
                return res.json({
                    totalUsers: 0,
                    totalOrders: 0,
                    totalRequirements: 0,
                    totalCamps: 0,
                });
            }
        } else if (user.RoleId === Role["Volunteer"]) {
            const campResult = await dbClient.query(
                `SELECT "CampId" FROM public."Camp_Volunteers" WHERE "VolunteerId" = $1`,
                [user.Id]
            );
            const campIds = campResult.rows.map(row => row.CampId);

            if (campIds.length > 0) {
                userFilter = `WHERE "CampId" = ANY($1::int[])`;
                params.push(campIds);
            } else {
                return res.json({
                    totalUsers: 0,
                    totalOrders: 0,
                    totalRequirements: 0,
                    totalCamps: 0,
                });
            }
        }

        const totalUsersQuery = user.RoleId === Role["Master"]
            ? 'SELECT COUNT(*) FROM public."User" WHERE "IsDeleted" = false'
            : 'SELECT COUNT(*) FROM public."User" WHERE "IsDeleted" = false';

        const totalUsers = await dbClient.query(totalUsersQuery);

        const totalOrders = await dbClient.query(
            `SELECT COUNT(*) FROM public."Orders" ${userFilter}`,
            params
        );

        const totalRequirements = await dbClient.query(
            `SELECT COUNT(*) FROM public."Requirement" ${userFilter}`,
            params
        );

        const totalCamps = await dbClient.query(
            `SELECT COUNT(*) FROM public."Camp_Data" ${userFilter}`,
            params
        );

        res.json({
            totalUsers: parseInt(totalUsers.rows[0].count),
            totalOrders: parseInt(totalOrders.rows[0].count),
            totalRequirements: parseInt(totalRequirements.rows[0].count),
            totalCamps: parseInt(totalCamps.rows[0].count),
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.getOrderStatusData = async (req, res) => {
    const user = req.user;

    try {
        let userFilter = '';
        const params = [];

        // Apply filters based on user role
        if (user.RoleId === Role["Normal User"]) {
            userFilter = `AND "UserId" = $2`;
            params.push(user.Id);
        } else if (user.RoleId === Role["Camp Admin"]) {
            const campResult = await dbClient.query(
                'SELECT "Id" FROM public."Camp_Data" WHERE "CampAdminId" = $1',
                [user.Id]
            );
            const campIds = campResult.rows.map(row => row.Id);

            if (campIds.length > 0) {
                userFilter = `AND "CampId" = ANY($2::int[])`;
                params.push(campIds);
            } else {
                return res.json({
                    pending: 0,
                    processing: 0,
                    completed: 0,
                    cancelled: 0,
                });
            }
        } else if (user.RoleId === Role["Volunteer"]) {
            const campResult = await dbClient.query(
                `SELECT "CampId" FROM public."Camp_Volunteers" WHERE "VolunteerId" = $1`,
                [user.Id]
            );
            const campIds = campResult.rows.map(row => row.CampId);

            if (campIds.length > 0) {
                userFilter = `AND "CampId" = ANY($2::int[])`;
                params.push(campIds);
            } else {
                return res.json({
                    pending: 0,
                    processing: 0,
                    completed: 0,
                    cancelled: 0,
                });
            }
        }

        // Fetch order status counts
        const pending = await dbClient.query(
            `SELECT COUNT(*) FROM public."Orders" WHERE "StatusId" = $1 AND "IsDeleted" = false ${userFilter}`,
            ['1', ...params]
        );

        const processing = await dbClient.query(
            `SELECT COUNT(*) FROM public."Orders" WHERE "StatusId" = $1 AND "IsDeleted" = false ${userFilter}`,
            ['2', ...params]
        );

        const completed = await dbClient.query(
            `SELECT COUNT(*) FROM public."Orders" WHERE "StatusId" = $1 AND "IsDeleted" = false ${userFilter}`,
            ['3', ...params]
        );

        const cancelled = await dbClient.query(
            `SELECT COUNT(*) FROM public."Orders" WHERE "StatusId" = $1 AND "IsDeleted" = false ${userFilter}`,
            ['4', ...params]
        );

        res.json({
            pending: parseInt(pending.rows[0].count),
            processing: parseInt(processing.rows[0].count),
            completed: parseInt(completed.rows[0].count),
            cancelled: parseInt(cancelled.rows[0].count),
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

exports.getQuantityData = async (req, res) => {
    const user = req.user;

    try {
        let userFilter = '';
        const params = [];

        // Apply filters based on user role
        if (user.RoleId === Role["Normal User"]) {
            userFilter = `AND "UserId" = $1`;
            params.push(user.Id);
        } else if (user.RoleId === Role["Camp Admin"]) {
            const campResult = await dbClient.query(
                'SELECT "Id" FROM public."Camp_Data" WHERE "CampAdminId" = $1',
                [user.Id]
            );
            const campIds = campResult.rows.map(row => row.Id);

            if (campIds.length > 0) {
                userFilter = `AND "CampId" = ANY($1::int[])`;
                params.push(campIds);
            } else {
                return res.json([]);
            }
        } else if (user.RoleId === Role["Volunteer"]) {
            const campResult = await dbClient.query(
                `SELECT "CampId" FROM public."Camp_Volunteers" WHERE "VolunteerId" = $1`,
                [user.Id]
            );
            const campIds = campResult.rows.map(row => row.CampId);

            if (campIds.length > 0) {
                userFilter = `AND "CampId" = ANY($1::int[])`;
                params.push(campIds);
            } else {
                return res.json([]);
            }
        }

        const quantityData = await dbClient.query(
            `SELECT 
        "Camp_Data"."District",
        SUM("Requirement"."RequiredQuantity") AS TotalRequiredQuantity,
        SUM("Requirement"."AchievedQuantity") AS TotalAchievedQuantity
      FROM public."Requirement"
      JOIN public."Camp_Data" ON "Requirement"."CampId" = "Camp_Data"."Id"
      WHERE "Requirement"."IsDeleted" = false ${userFilter}
      GROUP BY "Camp_Data"."District"
      ORDER BY "Camp_Data"."District";`,
            params
        );

        res.json(quantityData.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};