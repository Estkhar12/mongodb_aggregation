import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    // _id: {
    //   type: String,
    //   required: true,
    //   unique: true,
    // },
    listing_url: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
    },
    space: {
      type: String,
    },
    description: {
      type: String,
    },
    neighborhood_overview: {
      type: String,
    },
    notes: {
      type: String,
    },
    transit: {
      type: String,
    },
    access: {
      type: String,
    },
    interaction: {
      type: String,
    },
    house_rules: {
      type: String,
    },
    property_type: {
      type: String,
      required: true,
    },
    room_type: {
      type: String,
    },
    bed_type: {
      type: String,
    },
    minimum_nights: {
      type: String,
    },
    maximum_nights: {
      type: String,
    },
    cancellation_policy: {
      type: String,
    },
    last_scraped: {
      type: Date,
    },
    calendar_last_scraped: {
      type: Date,
    },
    first_review: {
      type: Date,
    },

    last_review: {
      type: Date,
    },

    accommodates: {
      type: Number,
    },
    bedrooms: {
      type: Number,
    },
    beds: {
      type: Number,
    },
    number_of_reviews: {
      type: Number,
    },
    bathrooms: {
      type: Number,
    },
    amenities: {
      type: [String],
    },
    price: {
      type: Number,
    },
    security_deposit: {
      type: Number,
    },
    cleaning_fee: {
      type: Number,
    },
    extra_people: {
      type: Number,
    },
    guests_included: {
      type: Number,
    },
    images: {
      thumbnail_url: {
        type: String,
      },
      medium_url: {
        type: String,
      },
      picture_url: {
        type: String,
      },
      xl_picture_url: {
        type: String,
      },
    },
    host: {
      host_id: {
        type: String,
        required: true,
        unique: true,
      },
      host_url: {
        type: String,
        required: true,
      },
      host_name: {
        type: String,
        required: true,
      },
      host_location: {
        type: String,
      },
      host_about: {
        type: String,
      },
      host_response_time: {
        type: String,
      },
      host_thumbnail_url: {
        type: String,
      },
      host_picture_url: {
        type: String,
      },
      host_neighbourhood: {
        type: String,
      },
      host_response_rate: {
        type: Number,
      },
      host_is_superhost: {
        type: Boolean,
      },
      host_has_profile_pic: {
        type: Boolean,
      },
      host_identity_verified: {
        type: Boolean,
      },
      host_listings_count: {
        type: Number,
      },
      host_total_listings_count: {
        type: Number,
      },
      host_verifications: {
        type: [String],
      },
    },
    address: {
      street: {
        type: String,
      },
      suburb: {
        type: String,
      },
      government_area: {
        type: String,
      },
      market: {
        type: String,
      },
      country: {
        type: String,
      },
      country_code: {
        type: String,
      },
      location: {
        type: {
          type: String,
        },
        coordinates: {
          type: Number,
        },
        is_location_exact: {
          type: Boolean,
        },
      },
    },
    availability: {
      availability_30: {
        type: Number,
      },
      availability_60: {
        type: Number,
      },
      availability_90: {
        type: Number,
      },
      availability_365: {
        type: Number,
      },
    },
    review_scores: {
      review_scores_accuracy: {
        type: Number,
      },
      review_scores_cleanliness: {
        type: Number,
      },
      review_scores_checkin: {
        type: Number,
      },
      review_scores_communication: {
        type: Number,
      },
      review_scores_location: {
        type: Number,
      },
      review_scores_value: {
        type: Number,
      },
      review_scores_rating: {
        type: Number,
      },
    },
    reviews: [
      {
        _id: {
          type: String,
          required: true,
          unique: true,
        },
        date: Date,
        listing_id: {
          type: String,
        },
        reviewer_id: {
          type: String,
        },
        reviewer_name: {
          type: String,
        },
        comments: {
          type: String,
        },
      },
    ],
  },
  { collection: "airbnbs" }
);

const Property = mongoose.model("Property", propertySchema);
export default Property;
