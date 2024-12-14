
import { useEffect, useRef } from "react";
import { DataColumn, DataDropMode, DataField, DataValues, GridView, LocalDataProvider } from "realgrid";

type Props =  {
  columns: DataColumn[];
  fields: DataField[];
  rows: DataValues[];
  movable?: boolean;
}

export default function ExampleGrid({rows, columns, fields, movable}: Props) {
  const realgridElement = useRef(null);

  useEffect(() => {
    const container = realgridElement.current!;
    const provider = new LocalDataProvider(true);
    const gridView = new GridView(container);

    gridView.editOptions.editable = false;
    gridView.footer.visible = false;
    gridView.checkBar.visible = false;
    gridView.stateBar.visible = false;

    gridView.setDataSource(provider);
    provider.setFields(fields);
    gridView.setColumns(columns);
    provider.setRows(rows);

    if (movable) {
      gridView.editOptions.movable = true;
      gridView.dataDropOptions.dropMode = DataDropMode.COPY;
      gridView.dataDropOptions.dropOtherElement = true;
    }

    return () => {
      provider.clearRows();
      gridView.destroy();
      provider.destroy();
    };
  }, []);

  return (
    <div ref={realgridElement} className="flex-1 bg-blue-50"></div>
  )
}