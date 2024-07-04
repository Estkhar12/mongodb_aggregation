import Property from "../models/propertyList.js";

const propertyTypes = async (req, res) => {
  try {
    const { name, property_type, page, pageSize, limit } = req.query;

    const pageNumber = parseInt(page, 10) || 1;
    const pageSizeNumber = parseInt(pageSize, 10) || 10;
    const limitNumber = parseInt(limit, 10);

    const finalLimit = limitNumber > 0 ? limitNumber : pageSizeNumber;

    let matchQuery = {};

    if (name) {
      matchQuery.name = { $regex: name, $options: "i" };
    }
    
    if (property_type) {
      matchQuery.property_type = property_type;
    }
    
    const defaultLimit = !name && !property_type ? 50 : finalLimit;

    const aggregationPipeline = await Property.aggregate([
      { $match: matchQuery },
      { $sort: { property_type: 1 } },

      {
        $facet: {
          metadata: [{ $count: "totalResults" }],
          data: [
            { $skip: (pageNumber - 1) * defaultLimit },
            { $limit: defaultLimit },
            {
              $project: {
                _id: 0,
                property_type: 1,
                name: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          totalResults: { $arrayElemAt: ["$metadata.totalResults", 0] },
          results: "$data",
        },
      },
    ]);

    if (
      !aggregationPipeline ||
      aggregationPipeline.length === 0 ||
      !aggregationPipeline[0].results.length
    ) {
      return res.status(404).json({ message: "No listings found" });
    }

    // Extract totalResults and results from the aggregation result
    const { totalResults, results } = aggregationPipeline[0];

    res.status(200).json({
      totalResults,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalResults / defaultLimit),
      results,
    });
  } catch (err) {
    console.error("Error searching and aggregating listings:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export default propertyTypes;
