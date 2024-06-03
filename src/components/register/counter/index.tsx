import React from "react";

interface PageCounterProps {
  currentSection: number;
  totalSections: number;
}

const PageCounter = ({ currentSection, totalSections }: PageCounterProps) => {
  const renderSections = (numSections: number) => {
    const sections = [];
    for (let i = 0; i < numSections; i++) {
      const isActive = i === currentSection - 1;
      const sectionClass = `h-3 w-3 mr-1 rounded-full ${
        isActive ? "bg-blue-400" : "bg-gray-300"
      }`;

      sections.push(<div key={i} className={sectionClass}></div>);
    }
    return sections;
  };

  return (
    <div className="flex justify-center w-full pt-4">
      {renderSections(totalSections)}
    </div>
  );
};

export default PageCounter;
