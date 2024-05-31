const cron = require('node-cron');
const mongoose = require('mongoose');
const Annonce = require('../models/Annonce'); // Adjust the path as needed

// Connect to MongoDB (adjust the connection string as needed)
mongoose.connect('mongodb+srv://sayf:sayf123@cluster0.lnrhp.mongodb.net/ProjectTransport?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

const archiveOldAnnonces = async () => {
    try {
        const now = new Date();
        const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7));
        
        const result = await Annonce.updateMany(
            { createdAt: { $lte: sevenDaysAgo }, status: { $ne: 'archivé' } },
            { status: 'archivé' }
        );

        console.log(`Archived ${result.nModified} annonces`);
    } catch (error) {
        console.error('Error archiving old annonces:', error);
    }
};

// Schedule the task to run every day at midnight
cron.schedule('0 0 * * *', () => {
    console.log('Running the archiveOldAnnonces task');
    archiveOldAnnonces();
});
