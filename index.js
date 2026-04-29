const {initializeDatabase} = require("./db/db.connect")
const Meetup = require("./models/meetup.models")
initializeDatabase();

const express = require("express")
const app = express()

app.use(express.json())

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));

/*
const newMeetup = {
    title: "Marketing Seminar: Digital Growth 2026",
    host: "Marketing Experts Group",
    details: "Stay ahead of the game in the dynamic field of digital marketing by attending the Marketing Seminar organized by Marketing Experts. This offline seminar will be held on June 15th from 10:00 AM to 12:00 PM in Bangalore, situated at 123 Brigade Road. Join industry leaders Sarah Johnson, Marketing Manager, and Michael Brown, SEO Specialist, as they delve into the latest trends and strategies in digital marketing. The seminar is open to individuals aged 18 and above and requires a ticket priced at ₹3,000. The dress code for the event is smart casual.",
    eventDate: "June 15, 2026",
    eventStartTime: "10:00 AM",
    eventEndTime: "12:00 PM",
    eventType: "Offline",
    venueAddress: {
        apartment: "4th Floor, Opera House",
        street: "123 Brigade Road",
        city: "Bangalore",
        state: "Karnataka",
        pin: "560001"
    },
    speakers: [
        {
            name: "Sarah Johnson",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
            expertise: "Marketing Manager"
        },
        {
            name: "Michael Brown",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
            expertise: "SEO Specialist"
        }
    ],
    eventFee: "1000",
    eventTag: ["Marketing", "Career & Business"],
    additionalInfo: [
        "Dress Code: Smart Casual",
        "Age Limit: 18+",
        "Post Event Networking Lunch"
    ],
    eventImageUrl: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0"
};
*/

// Function to add new event data into the DB
async function createNewEvent(newEvent){
    try{
        const meetup = new Meetup(newEvent)
        const saveMeetup = await meetup.save()
        return saveMeetup
    }catch(error){
        console.log(error)
    }
}

//createNewEvent(newMeetup)

//API route to create new event entry in the DB
app.post("/meetups", async (req, res) => {
    try{
        const savedEvent = await createNewEvent(req.body)
        res.status(201).json({message: "Event added successfully"})
    }catch(error){
        res.status(500).json({error: "Failed to add event"})
    }
})

//Function to get all the events from the DB
async function getAllEvent() {
    try{
        const events = await Meetup.find()
        return events
    }catch(error){
        console.log(error)
    }
}

//API route to get all the events from the DB
app.get("/meetups", async (req, res)=> {
    try{
        const allEvents = await getAllEvent()
        if (allEvents.length > 0){
            res.status(200).json(allEvents)
        } else {
            res.status(404).json({error: "No events found"})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch events"})
    }
})

//Function to get event details by Id
async function getEventById(eventId){
    try{
        const getEvent = await Meetup.findById(eventId)
        return getEvent
    }catch(error){
        console.log(error)
    }
}

//API route to get event details by Id
app.get("meetups/:eventId", async (req, res) => {
    try{
        const eventDetail = await getEventById(req.params.eventId)
        if (eventDetail){
            res.status(200).json(eventDetail)
        } else {
            res.status(404).json({error: "Event not found"})
        }
    }catch(error){
        res.status(500).json({error: "Failed to fetch event"})
    }
})

//Function to update event by Id
async function updateEvent(eventId, dataToUpdate){
    try{
        const updatedEventData = await Meetup.findByIdAndUpdate(eventId, dataToUpdate, {new: true})
        return updatedEventData
    }catch(error){
        console.log(error)
    }
}

//API route to update hotel by ID
app.post("/meetups/:eventId", async (req, res) => {
    try{
        const eventUpdated = await updateEvent(req.params.eventId, req.body)
        if(eventUpdated){
            res.status(200).json({message: "Event updated successfully", event: eventUpdated})
        } else {
            res.status(404).json({error: "Event not found"})
        }
    }catch(error){
        res.status(500).json({error: "Failed to update event"})
    }
})

//Function to delete event by ID
async function deleteEventById(eventId){
    try{
        const deletedEvent = await Meetup.findByIdAndDelete(eventId)
        return deletedEvent
    }catch(error){
        console.log(error)
    }
}

//deleteEventById("69f1828c3420c564d2ceb0cb")

//API route to delete an event by id
app.delete("/meetups/:eventId", async (req, res) => {
    try{
        const deleteHotel = await deleteEventById(req.params.eventId)
        res.status(200).json({message: "Event deleted successfully", deleteHotel})
    }catch(error){
        res.status(500).json({error: "Failed to delete event"})
    }
})

const PORT = 7500
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`)
})