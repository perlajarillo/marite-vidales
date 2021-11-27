export const groupByYear = (objectOfExhibits) =>
  [...Object.entries(objectOfExhibits)].reduce((acc, [key, value]) => {
    // Group initialization
    if (!acc[value.year]) {
      acc[value.year] = [];
    }
    // Grouping
    const objectWithKey = { key, ...value };
    acc[value.year].push(objectWithKey);

    return acc;
  }, {});