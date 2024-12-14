import ExampleBuggyGrid from "./_components/ExampleBuggyGrid";
import ExampleGrid from "./_components/ExampleGrid";
import { columns, fields, rows } from "./realgrid-data1";
import { columns as columns2, fields as fields2 } from "./realgrid-data2";

export default function DragDropBugDemoView() {
  return <>
      <div className="header flex flex-row gap-2 p-2 py-1">
        <h1 className="text-center text-lg font-semibold">RealGrid Dropdown Bug : Drop Items to the Empty Grid</h1>
      </div>
      <h2 className="text-lg font-semibold px-2 bg-green-50">v2.7.x : Works</h2>
      <div className="vertical-split flex flex-row flex-1 h-full">
        <div className="left flex flex-col bg-blue-50 min-w-72">
          <h2 className="px-2 bg-blue-100">Drag Source</h2>
          <ExampleGrid movable rows={rows} columns={columns} fields={fields}/>
        </div>
        <div className="split-line w-1 bg-gray-300"></div>
        <div className="right flex flex-1 flex-col bg-red-50">
          <h2 className="px-2 bg-red-100">Drop Target</h2>
          <ExampleGrid rows={[]} columns={columns} fields={fields}/>
        </div>
      </div>
      <h2 className="text-lg font-semibold px-2 bg-red-50 text-red-700">v2.8.x : Doesn't Work (Bug)</h2>
      <div className="vertical-split flex flex-row flex-1 h-full">
        <div className="left flex flex-col bg-blue-50 min-w-72">
          <h2 className="px-2 bg-blue-100">Drag Source</h2>
          <ExampleBuggyGrid movable rows={rows} columns={columns2} fields={fields2}/>
        </div>
        <div className="split-line w-1 bg-gray-300"></div>
        <div className="right flex flex-1 flex-col bg-red-50">
          <h2 className="px-2 bg-red-100">Drop Target</h2>
          <ExampleBuggyGrid rows={[]} columns={columns2} fields={fields2}/>
        </div>
      </div>
  </>
}