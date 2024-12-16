
import { useEffect, useRef } from "react";
import { DataColumn, DataDropMode, DataField, DataValues, GridView, LocalDataProvider, SelectionMode } from "realgrid-2.7.2";

type Props =  {
  getGridView: (container: HTMLDivElement) => GridView, 
  columns: DataColumn[];
  fields: DataField[];
  rows: DataValues[];
  movable?: boolean;
  hideRowIndicator?: boolean;
}

export default function ExampleGrid(props: Props) {
  const {rows, columns, fields, movable, hideRowIndicator} = props;
  const realgridElement = useRef(null);

  useEffect(() => {
    const container = realgridElement.current!;
    const grid =  props.getGridView(container);
    const provider = grid.getDataSource() as LocalDataProvider;
    
    grid.setStateBar({ visible: false });
    grid.setCheckBar({ visible: false });
    grid.setFooter({ visible: false });
    grid.setRowIndicator({ visible: false });
    if (hideRowIndicator) {
      grid.rowIndicator.visible = false;
    }
    
    grid.setDisplayOptions({
      selectionMode: SelectionMode.SINGLE,
      selectAndImmediateDrag: true,
    });
    
    grid.setRowStyleCallback((_, item) => {
      const checked = item.checked ? "checked " : ""
      return checked ? "row-selected" : '';
    })
    
    grid.onCurrentRowChanged = (grid, _, rowIdx) => {
      console.log('onCurrentRowChanged');
      grid.checkAll(false);
      grid.checkRow(rowIdx, true);
    }
    
    provider.setFields(fields);
    grid.setColumns(columns);
    provider.setRows(rows);

    if (movable) {
      grid.editOptions.movable = true;
      grid.dataDropOptions.dropMode = DataDropMode.COPY;
      grid.dataDropOptions.dropOtherElement = true;
    }

    return () => {
      provider.clearRows();
      grid.destroy();
      provider.destroy();
    };
  }, []);

  return (
    <div ref={realgridElement} className="flex-1 bg-blue-50"></div>
  )
}
