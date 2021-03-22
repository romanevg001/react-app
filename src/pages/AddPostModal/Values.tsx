import * as React from "react";


export default ({ value }: any) => {
  return (
    <div >
      <h3 >Values</h3>
      <pre>{JSON.stringify(value)}</pre>
    </div>
  );
};
