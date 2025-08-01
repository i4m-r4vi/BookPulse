import cron from 'node-cron'
import { sendDue } from '../utils/MailSender.js'
import issuedBooksModel from '../models/issued.model.js'


const dueRemainder = () => {
    cron.schedule("06 30 * * *", async () => {
    console.log("Started Due Reminder Work");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    const start = new Date(tomorrow.setHours(0, 0, 0, 0));
    const end = new Date(tomorrow.setHours(23, 59, 59, 999));

    const dueBooks = await issuedBooksModel.find({
        dueDate: { $gte: start, $lte: end }, returned: false
    }).populate({path:"UserId",select:["-password"]}).populate({path:"bookId",select:["-bookImgUrl","-totalCopies","-availableCopies","-createdAt","-updatedAt","-__v"]});

    if(!dueBooks){
        console.log("There is no dueBooks from users")
    }

    for (const userDetails of dueBooks) {
        const { UserId, bookId, dueDate } = userDetails;
        await sendDue(UserId.email, UserId.name, bookId.title, dueDate);
    }
    console.log("Due Reminder sended to their Emails.");})
}

export default dueRemainder
