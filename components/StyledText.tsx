// components/StyledText.tsx
"use client";
import React from "react";
import { Text, TextProps } from "@chakra-ui/react";

interface StyledTextProps extends TextProps {
  lang?: "en" | "jp";
}

const StyledText: React.FC<StyledTextProps> = ({ lang = "en", children, ...props }) => {
  const baseStyles = {
    en: {
      fontSize: "17px",
      color: "gray.600",
      textShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
    },
    jp: {
      fontSize: "16px",
      color: "gray.600",
      textShadow: "0px 0px 8px rgba(0, 0, 0, 0.3)",
    },
  };

  return <Text {...baseStyles[lang]} {...props}>{children}</Text>;
};

export default StyledText;
