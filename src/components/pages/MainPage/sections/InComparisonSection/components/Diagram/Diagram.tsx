import * as React from 'react';

import './style.scss';

type TDiagramProps = {
  title: string;
  fillPercent: number;
};

const STROKE_DASHARRAY = 470.5;
const FULL_PERCENTAGE = 100;

function calculateStrokeDashArray(fillPercent: number = 0): string {
  return `${(STROKE_DASHARRAY * fillPercent) /
    FULL_PERCENTAGE} ${STROKE_DASHARRAY}`;
}

export function Diagram({
  title,
  fillPercent = 0
}: TDiagramProps): JSX.Element {
  return (
    <div
      className="comparison-section-diagram-wrapper"
      style={{ background: `` }}
    >
      <svg
        width="150"
        height="150"
        className="comparison-section-diagram"
        id="for-mask"
        transform="rotate(145deg)"
      >
        <circle
          r="75"
          cx="75"
          cy="75"
          strokeDasharray={calculateStrokeDashArray(fillPercent)}
          strokeWidth="150"
          className="comparison-section-diagram__chart"
          fill="#ececf4"
          stroke="#567df4"
        />
      </svg>
      <div
        contentEditable
        role="textbox"
        aria-multiline="true"
        className="comparison-section-diagram-title"
      >
        {title}
      </div>
    </div>
  );
}
