
import { useEffect } from "react";

export default function SummaryPage() {

  useEffect(() => {
    console.log("this component renders");

    return () => {
      console.log("unmounting...");
    };
  });

  return (
    <div className="page summary">
      <h1>Summary</h1>
      <br />
    </div>
  );
}
