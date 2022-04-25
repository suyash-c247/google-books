import searchModule from "../databsase/models/searchKayModels.js";

export const chart = async (req, res) => {
  const documents = await searchModule.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(2022, 0, 1),
          $lte: new Date(2022, 11, 31),
        },
      },
    },
    {
      $unwind: "$search",
    },
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          search : "$search.key"
        },
        count: { $sum: 1 },
        total: {
          $sum: "$search.count",
        },
      },
    },
    {
      $project: {
        _id: 1,
        totalSales: "$total",
        count:"$count",
        Month: {
          $arrayElemAt: [
            [
              "",
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
            "$_id.month",
          ],
        },
        m: "$_id.month", //added only for sorting data
      },
    },
    { $sort: { m: 1 } },
  ]);
  res.send(documents);
};
