const mongoose = require("mongoose");
const validator = require("validator");

const watchItemSchema = new mongoose.Schema(
  {
    externalId: { 
      type: String, 
      required: true 
    }, 

    title: { 
      type: String, 
      required: true 
    },

    image: { 
      type: String, 
      required: true,
      validate: {
        validator: (v) => validator.isURL(v),
        message: "URL de imagen inválida",
      }
    },

    genre: { 
      type: String, 
      required: true 
    },

    synopsis: { 
      type: String, 
      required: true 
    },

    releaseDate: { 
      type: String, 
      required: true 
    },

    endDate: { 
      type: String, 
      default: null 
    },

    platforms: {
      type: [String],
      required: true
    },

    type: {
      type: String,
      enum: ["movies", "series"],
      required: true
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
      select: false 
    }
  },
  { versionKey: false }
);

module.exports = mongoose.model("watchListItem", watchItemSchema);
