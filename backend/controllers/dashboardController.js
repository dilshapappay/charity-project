
const dbClient = require('../config/db');

exports.getDashboardData = async (req, res) => { 
    try {
        const totalUsers = await dbClient.query('SELECT COUNT(*) FROM public."User" WHERE "IsDeleted" = false');      
        const totalOrders = await dbClient.query('SELECT COUNT(*) FROM public."Orders" WHERE "IsDeleted" = false');
        const totalRequirements = await dbClient.query('SELECT COUNT(*) FROM public."Requirement" WHERE "IsDeleted" = false');
        const totalCamps= await dbClient.query('SELECT COUNT(*) FROM public."Camp_Data" WHERE "IsDeleted" = false');

        res.json({
            totalUsers: parseInt(totalUsers.rows[0].count),
            totalOrders: parseInt(totalOrders.rows[0].count),
            totalRequirements: parseInt(totalRequirements.rows[0].count),
            totalCamps: parseInt(totalCamps.rows[0].count)  

        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

exports.getOrderStatusData = async (req, res) => {
    try {
        const pending = await dbClient.query('SELECT COUNT(*) FROM public."Orders" WHERE "StatusId" = $1 AND "IsDeleted" = false', ['1']);
        const processing = await dbClient.query('SELECT COUNT(*) FROM public."Orders" WHERE "StatusId" = $1 AND "IsDeleted" = false', ['2']);
        const completed = await dbClient.query('SELECT COUNT(*) FROM public."Orders" WHERE "StatusId" = $1 AND "IsDeleted" = false', ['3']);
        const cancelled = await dbClient.query('SELECT COUNT(*) FROM public."Orders" WHERE "StatusId" = $1 AND "IsDeleted" = false', ['4']);

        res.json({
            pending: parseInt(pending.rows[0].count),
            processing: parseInt(processing.rows[0].count), 
            completed: parseInt(completed.rows[0].count),   
            cancelled: parseInt(cancelled.rows[0].count)    
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


exports.getQuantityData = async (req, res) => {
    try{
        const quantityData = await dbClient.query(`SELECT 
        "Camp_Data"."District",
        SUM("Requirement"."RequiredQuantity") AS TotalRequiredQuantity,
        SUM("Requirement"."AchievedQuantity") AS TotalAchievedQuantity
    FROM public."Requirement"
    JOIN public."Camp_Data" ON "Requirement"."CampId" = "Camp_Data"."Id"
    WHERE "Requirement"."IsDeleted" = false
    GROUP BY "Camp_Data"."District"
    ORDER BY "Camp_Data"."District";`);

        res.json(quantityData.rows);
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}