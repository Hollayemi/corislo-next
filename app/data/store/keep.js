[{
  from: "brands",
  localField: "category",
  foreignField: "brandCollection",
  as: "brands",
  pipeline: [
    {
      $lookup: {
        from: "products",
        let: {
          id: {
            $toObjectId: "$storeId",
          },
          category: "$brandCollection",
          brands: "$sub_category",
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: {
                  $eq: ["$shopID", "$$id"],
                  $eq: [ "$prodSub_Category", "$$brands" ],
                  $eq: [ "$prodCategory", "$$category" ],
                },
              },
            },
          },
          {
            $group: {
              _id: {
                group: "$prodGroup",
              },
              products: {
                $push: {
                  prodName: "$prodName",
                  images: {
                    $arrayElemAt: ["$images", 0],
                  },
                  price: "$prodPrice",
                },
              },
            },
          },
        ],
        as: "groups",
      },
    },
    {
      $project: {
        _id: 0,
        name: "$brandName",
        subcategory: "$sub_category",
        groups: "$groups",
      },
    },
  ],
}]