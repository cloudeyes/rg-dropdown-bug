import { useRef } from "react";
import RealGrid, {
  GridView as GridViewNew,
  LocalDataProvider as LocalDataProviderNew,
} from "realgrid";
import { gridVersion, GridView, LocalDataProvider } from "realgrid-2.7.2";
import ExampleGrid from "./_components/ExampleGrid";
import { columns, fields, rows } from "./realgrid-data";

const getGridView = (container: HTMLDivElement) => {
  const gridView = new GridView(container);
  const provider = new LocalDataProvider(false);
  gridView.setDataSource(provider);
  console.log("gridView:", gridVersion);
  return gridView;
};

const getGridViewBuggy = (container: HTMLDivElement) => {
  const rawGridView = new GridViewNew(container);
  const gridView = rawGridView as unknown as GridView;
  const provider = new LocalDataProviderNew(
    false
  ) as unknown as LocalDataProvider;
  console.log("gridViewBuggy:", RealGrid.getVersion());
  gridView.setDataSource(provider);
  return gridView;
};

export default function DragDropBugDemoView() {
  const targetGrid1 = useRef<GridView>();
  const targetGrid2 = useRef<GridView>();

  return (
    <>
      <div className="header flex flex-row gap-2 p-2 py-1">
        <h1 className="text-center text-lg font-semibold">
          RealGrid Dropdown Bug : Drop Items to the Empty Grid
        </h1>
      </div>
      <h2 className="flex items-center text-lg font-semibold px-2 py-1 bg-green-50">
        v2.7.x : Works
        <button
          className="text-sm text-black font-normal ml-5 px-2 py-1 rounded-md border bg-gray-100 hover:bg-gray-200"
          onClick={() => {
            console.log("targetGrid1:", targetGrid1);
            targetGrid1.current?.getDataSource().clearRows();
          }}
        >
          Reset
        </button>
      </h2>
      <div className="vertical-split flex flex-row flex-1 h-full">
        <div className="left flex flex-col bg-blue-50 min-w-72">
          <h2 className="px-2 bg-blue-100">Drag Source</h2>
          <ExampleGrid
            getGridView={getGridView}
            dragSource
            hideRowIndicator
            rows={rows}
            columns={columns}
            fields={fields}
          />
        </div>
        <div className="split-line w-1 bg-gray-300"></div>
        <div className="right flex flex-1 flex-col bg-red-50">
          <h2 className="px-2 bg-red-100">Drop Target</h2>
          <ExampleGrid
            getGridView={getGridView}
            rows={[]}
            columns={columns}
            fields={fields}
            onInitGrid={(_) => (targetGrid1.current = _)}
          />
        </div>
      </div>
      <h2 className="flex items-center text-lg font-semibold px-2 py-1 text-red-700 bg-red-50">
        v2.8.x : Doesn't Work (Bug)
        <button
          className="text-sm text-black font-normal ml-5 px-2 py-1 rounded-md border bg-gray-100 hover:bg-gray-200"
          onClick={() => targetGrid2.current?.getDataSource().clearRows()}
        >
          Reset
        </button>
      </h2>
      <div className="vertical-split flex flex-row flex-1 h-full">
        <div className="left flex flex-col bg-blue-50 min-w-72">
          <h2 className="px-2 bg-blue-100">Drag Source</h2>
          <ExampleGrid
            getGridView={getGridViewBuggy}
            dragSource
            hideRowIndicator
            rows={rows}
            columns={columns}
            fields={fields}
          />
        </div>
        <div className="split-line w-1 bg-gray-300"></div>
        <div className="right flex flex-1 flex-col bg-red-50">
          <h2 className="px-2 bg-red-100">Drop Target</h2>
          <ExampleGrid
            getGridView={getGridViewBuggy}
            rows={[]}
            columns={columns}
            fields={fields}
            onInitGrid={(_) => (targetGrid2.current = _)}
          />
        </div>
      </div>
    </>
  );
}
