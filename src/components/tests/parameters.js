import { ColumnHeightOutlined } from "@ant-design/icons";

import { HeartRateIcon, TemperatureIcon, WeightIcon } from "./icons";

function getColors(color) {
  switch (color) {
    case "blue":
      return {
        border: "border-blue-700",
        text: "text-blue-700",
      };
    case "green":
      return {
        border: "border-green-600",
        text: "text-green-600",
      };
    case "red":
      return {
        border: "border-red-700",
        text: "text-red-700",
      };
    case "yellow":
      return {
        border: "border-yellow-700",
        text: "text-yellow-700",
      };
    default:
      return {
        border: "border-gray-700",
        text: "text-gray-700",
      };
  }
}

export const parameters = [
  {
    colors: getColors("blue"),
    description: "Patient's Height Information",
    id: "height",
    name: "height",
    icon: ColumnHeightOutlined,
    // value: "156cm",
  },
  {
    colors: getColors("green"),
    description: "Patient's Weight Information",
    id: "weight",
    name: "weight",
    icon: WeightIcon,
    // value: "70kg",
  },
  {
    colors: getColors("red"),
    description: "Patient's Pulse Rate Information",
    name: "pulse/heart rate",
    icon: HeartRateIcon,
    id: "pulse",
    // value: "55BPM",
  },
  {
    colors: getColors("yellow"),
    description: "Patient's Temperature Information",
    name: "temperature",
    id: "temperature",
    icon: TemperatureIcon,
    iconProps: {
      fill: "#f5930a",
    },
    // value: "33C",
  },
];
