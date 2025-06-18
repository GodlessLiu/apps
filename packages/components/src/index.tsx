import type React from "react";

export const Hello: React.FC = () => {
  return <div>Hello World from components</div>;
};

export function add(a: number, b: number) {
  return a + b;
}
