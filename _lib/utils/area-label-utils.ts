import generalData from "@/_data/general-data.json";

export const getAreaLabel = (areaValue: string): string => {
  return (
    generalData.propertySearch.area.find((a) => a.value === areaValue)
      ?.label ?? areaValue
  );
};
