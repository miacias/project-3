const { Schema, model } = require("mongoose");


const brewerySchema = new Schema(
  {
    breweryId: {
      //Pull ID from API call
      type: String,
      required: true,
    },
    reviews: [
      {
        type: Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
  }
);


brewerySchema.virtual('avgRating').get(function () {
    if(this.reviews.length){
        let ratingSum = 0;
        for (let i = 0; i < this.reviews.length; i++) {
            ratingSum += this.reviews[i];
        }
        return ((ratingSum / reviews.length).toFixed(1));;
    } else {
        return null;
    }
});


brewerySchema.virtual('reviewCount').get(function () {
    return this.reviews.length;
});


const Brewery = model("Brewery", brewerySchema);


module.exports = Brewery;