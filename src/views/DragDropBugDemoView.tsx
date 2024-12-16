import ExampleGrid from "./_components/ExampleGrid";
import { columns, fields, rows } from "./realgrid-data";
import { GridView, LocalDataProvider } from 'realgrid-2.7.2';
import { GridView as GridViewNew, LocalDataProvider as LocalDataProviderNew } from 'realgrid';

const getGridView = (container: HTMLDivElement) => {
  const gridView = new GridView(container);
  const provider = new LocalDataProvider(false);
  gridView.setDataSource(provider);
  return gridView;
};

const getGridViewBuggy = (container: HTMLDivElement) => {
  const gridView = new GridViewNew(container) as unknown as GridView;
  const provider = new LocalDataProviderNew(false) as unknown as LocalDataProvider;
  gridView.setDataSource(provider);
  return gridView;
};

export default function DragDropBugDemoView() {
  return <>
      <div className="header flex flex-row gap-2 p-2 py-1">
        <h1 className="text-center text-lg font-semibold">RealGrid Dropdown Bug : Drop Items to the Empty Grid</h1>
      </div>
      <h2 className="text-lg font-semibold px-2 bg-green-50">v2.7.x : Works</h2>
      <div className="vertical-split flex flex-row flex-1 h-full">
        <div className="left flex flex-col bg-blue-50 min-w-72">
          <h2 className="px-2 bg-blue-100">Drag Source</h2>
          <ExampleGrid getGridView={getGridView} movable hideRowIndicator rows={rows} columns={columns} fields={fields}/>
        </div>
        <div className="split-line w-1 bg-gray-300"></div>
        <div className="right flex flex-1 flex-col bg-red-50">
          <h2 className="px-2 bg-red-100">Drop Target</h2>
          <ExampleGrid getGridView={getGridView} rows={[]} columns={columns} fields={fields}/>
        </div>
      </div>
      <h2 className="text-lg font-semibold px-2 bg-red-50 text-red-700">v2.8.x : Doesn't Work (Bug)</h2>
      <div className="vertical-split flex flex-row flex-1 h-full">
        <div className="left flex flex-col bg-blue-50 min-w-72">
          <h2 className="px-2 bg-blue-100">Drag Source</h2>
          <ExampleGrid getGridView={getGridViewBuggy} movable hideRowIndicator rows={rows} columns={columns} fields={fields}/>
        </div>
        <div className="split-line w-1 bg-gray-300"></div>
        <div className="right flex flex-1 flex-col bg-red-50">
          <h2 className="px-2 bg-red-100">Drop Target</h2>
          <ExampleGrid getGridView={getGridViewBuggy}  rows={[]} columns={columns} fields={fields}/>
        </div>
      </div>
  </>
}