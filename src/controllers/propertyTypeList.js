import Property from "../models/propertyList.js";

// Create an API to fetch the list of properties based on property_type.
// Also add search for name, pagination and sorting in ascending order.
// Add start date, end date and accomodation filter to previous API

const searchPropertyList = async (req, res) => {
  try {
    const {
      pageNo = 1,
      limit = 10,
      name,
      sort = "name", // default sorting by name
      property_type,
      startDate,
      endDate,
      accommodates,
    } = req.query;

    let differenceInDates = null;

    // Check if both startDate and endDate are provided
    if (startDate && endDate) {
      const startingDate = new Date(startDate);
      const endingDate = new Date(endDate);

      if (isNaN(startingDate) || isNaN(endingDate)) {
        return res.status(400).json({ error: "Invalid date format!" });
      }

      if (endingDate < startingDate) {
        return res
          .status(400)
          .json({ error: "endDate must be after startDate" });
      }

      differenceInDates = Math.ceil(
        Math.abs(endingDate - startingDate) / (1000 * 60 * 60 * 24)
      );
    }
    
    let query = {};

    if (property_type) {
      query.property_type = property_type;
    }

    if (name) {
      query.name = new RegExp(name, "i");
    }

    if (differenceInDates !== null) {
      query.minimum_nights = { $lte: differenceInDates.toString() };
      query.maximum_nights = { $gte: differenceInDates.toString() };
    }

    if (accommodates) {
      if (!parseInt(accommodates)) {
        return res.status(400).json({ error: "Invalid accommodates value!" });
      }
      query.accommodates = { $gte: parseInt(accommodates) };
    }

    const totalProperties = await Property.countDocuments(query);
    const totalPages = Math.ceil(totalProperties / limit);
    const aggregateProperties = await Property.aggregate([
      { $match: query },
      { $sort: { [sort]: 1 } },
      { $skip: (pageNo - 1) * parseInt(limit) },
      { $limit: parseInt(limit) },
      {
        $project: {
          id: 1,
          name: 1,
          property_type: 1,
          maximum_nights: 1,
          minimum_nights: 1,
          accommodates: 1,
        },
      },
    ]);

    return res.status(200).json({
      totalProperties,
      totalPages,
      currentPage: pageNo,
      aggregateProperties,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const searchPropertyList = async (req, res) => {
//   try {
//     const {
//       pageNo = 1,
//       limit = 10,
//       name,
//       sort,
//       property_type,
//       startDate,
//       endDate,
//       accomodates,
//     } = req.query;

//     let differenceInDates;

//     const startingDate = new Date(startDate);
//     const endingDate = new Date(endDate);

//     // if (isNaN(startingDate) || isNaN(endingDate)) {
//     //   return res.status(400).json({ error: "invalid date formate!" });
//     // }

//     if (endingDate < startingDate) {
//       return res.status(400).json({ error: "endDate must be after startDate" });
//     }

//     differenceInDates = Math.abs(endingDate - startingDate);
//     differenceInDates = Math.ceil(differenceInDates / (1000 * 60 * 60 * 24));

//     let query = {
//       property_type,
//       name: new RegExp(name, "i"),
//     };

//     if (differenceInDates !== null) {
//       query.minimum_nights_num = { $lte: differenceInDates };
//       query.maximum_nights_num = { $gte: differenceInDates };
//     }

//     if (accomodates) {
//       if (!parseInt(accomodates)) {
//         return res.status(404).json({ error: "Invalid accomodates value!" });
//       }
//       query.accomodates = { $gte: parseInt(accomodates) };
//     }

//     //Count Total Properties
//     const aggregationTotal = await Property.aggregate([
//       {
//         $addFields: {
//           minimum_nights_num: { $toInt: "$minimum_nights" },
//           maximum_nights_num: { $toInt: "$maximum_nights" },
//         },
//       },
//       {
//         $match: query,
//       },
//       {
//         $count: "totalProperties",
//       },
//     ]);
//     console.log(aggregationTotal);

//     const totalProperties =
//       aggregationTotal.length > 0 ? aggregationTotal[0].totalProperties : 0;

//     const totalPages = Math.ceil(totalProperties / limit);

//     const aggregateProperties = await Property.aggregate([
//       {
//         $addFields: {
//           minimum_nights_num: { $toInt: "$minimum_nights" },
//           maximum_nights_num: { $toInt: "$maximum_nights" },
//         },
//       },
//       { $match: query },
//       { $sort: { [sort]: 1 } },
//       { $skip: (pageNo - 1) * limit },
//       { $limit: parseInt(limit) },
//       {
//         $project: {
//           id: 1,
//           name: 1,
//           property_type: 1,
//           maximum_nights: 1,
//           minimum_nights: 1,
//           accomodates: 1,
//         },
//       },
//     ]);

//     return res.status(200).json({
//       aggregateProperties,
//       aggregationTotal,
//       totalPages,
//       accomodates,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export default searchPropertyList;
