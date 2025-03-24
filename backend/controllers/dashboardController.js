
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
        const pending = await dbClient.query('SELECT COUNT(*) FROM public."Orders" WHERE "Status" = $1 AND "IsDeleted" = false', ['Pending']);
        const approved = await dbClient.query('SELECT COUNT(*) FROM public."Orders" WHERE "Status" = $1 AND "IsDeleted" = false', ['Approved']);
        const rejected = await dbClient.query('SELECT COUNT(*) FROM public."Orders" WHERE "Status" = $1 AND "IsDeleted" = false', ['Rejected']);
        const completed = await dbClient.query('SELECT COUNT(*) FROM public."Orders" WHERE "Status" = $1 AND "IsDeleted" = false', ['Completed']);

        res.json({
            pending: parseInt(pending.rows[0].count),
            approved: parseInt(approved.rows[0].count),
            rejected: parseInt(rejected.rows[0].count),
            completed: parseInt(completed.rows[0].count)
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
