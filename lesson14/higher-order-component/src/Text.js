import React from "react";

function withSize(WrappedComponent, fontSize) {
  const EnhancedComponent = function({ style, ...props }) {
    return (
      <WrappedComponent
        style={{
          fontSize,
          ...style
        }}
        {...props}
      />
    );
  };

  const displayName = WrappedComponent.displayName || WrappedComponent.name;
  EnhancedComponent.displayName = `withSize(${displayName}, ${fontSize})`;

  return EnhancedComponent;
}

function Text(props) {
  return <span {...props} />;
}

export const SmallText = withSize(Text, 12);
export const MediumText = withSize(Text, 16);
export const LargeText = withSize(Text, 20);
