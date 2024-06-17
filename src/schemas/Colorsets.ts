export const ColorsetsSchema = {
  name: "Colorsets",
  properties: {
    _id: "objectId",
    name: "string",
    colors: "int[]",
    owner_id: "string",
    viewers: "string[]",
  },
  primaryKey: "_id",
};
