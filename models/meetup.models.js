const mongoose = require("mongoose");

const meetupSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        host: {
            type: String,
            required: true,
        },
        details: {
            type: String,
            required: true,
        },
        eventDate: {
            type: String,
            required: true,
        },
        eventStartTime: {
            type: String,
            required: true,
        },
        eventEndTime: {
            type: String,
            required: true,
        },
        eventType: {
            type: String,
            enum: [
                "Online",
                "Offline",
            ],
        },
        venueAddress: {
            apartment: {
                type: String,
            },
            street: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            pin: {
                type: String,
            }
        },
        speakers: [{
            name: {
                type: String,
                required: true
            },
            image: {
                type: String, // Usually a URL to the hosted image
                required: true
            },
            expertise: {
                type: String,
                required: true
            }
        }],
        eventFee: {
            type: String,
        },
        eventTag: [{
            type: String,
            enum: [
                "Marketing",
                "Technology",
                "Science & Education",
                "Art & Culture",
                "Health & Wellbeing",
                "Career & Business",
                "Sports & Fitness",
                "Travel & Outdoor",
                "Community & Environment",
                "Identity & Language",
                "Games",
                "Dancing",
                "Support & Coaching",
                "Music",
                "Pets & Animals",
                "Writing",
                "Parents & Family",
                "Religion & Spirituality",
                "Movement & Politics"
            ],
            required: true
        }],
        additionalInfo: {
            type: [String]
        },
        eventImageUrl: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

const Meetup = mongoose.model("Meetup", meetupSchema);

module.exports = Meetup;