export const groupByYear = (objectOfExhibits) =>
  [...Object.values(objectOfExhibits)].reduce((acc, value) => {
    // Group initialization
    if (!acc[value.year]) {
      acc[value.year] = [];
    }
    // Grouping
    acc[value.year].push(value);

    return acc;
  }, {});