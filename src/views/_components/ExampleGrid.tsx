import { useEffect, useRef } from "react";
import {
  DataColumn,
  DataDropMode,
  DataField,
  DataValues,
  DragFeedbackStyle,
  GridView,
  LocalDataProvider,
  SelectionMode,
} from "realgrid-2.7.2";

type Props = {
  getGridView: (container: HTMLDivElement) => GridView;
  onInitGrid?: (grid: GridView) => void;
  columns: DataColumn[];
  fields: DataField[];
  rows: DataValues[];
  movable?: boolean;
  hideRowIndicator?: boolean;
};

export default function ExampleGrid(props: Props) {
  const { rows, columns, fields, movable, hideRowIndicator } = props;
  const realgridElement = useRef(null);

  useEffect(() => {
    const container = realgridElement.current!;
    const gridView = props.getGridView(container);
    const provider = gridView.getDataSource() as LocalDataProvider;
    provider.setFields(fields);
    gridView.setColumns(columns);

    gridView.setStateBar({ visible: false });
    gridView.setCheckBar({ visible: false });
    gridView.setFooter({ visible: false });
    gridView.setRowIndicator({ visible: false });

    if (hideRowIndicator) {
      gridView.rowIndicator.visible = false;
    }

    gridView.setDisplayOptions({
      selectionMode: SelectionMode.SINGLE,
      selectAndImmediateDrag: true,
    });

    gridView.setRowStyleCallback((_, item) => {
      const checked = item.checked ? "checked " : "";
      return checked ? "row-selected" : "";
    });

    gridView.onCurrentRowChanged = (grid, _, rowIdx) => {
      grid.checkAll(false);
      grid.checkRow(rowIdx, true);
    };

    if (movable) {
      gridView.editOptions.movable = true;
      gridView.setDataDropOptions({
        dropMode: DataDropMode.COPY,
        dropOtherElement: true,
      });
    } else {
      gridView.setDataDropOptions({
        // BUG: DropTarget 의 피드백 스타일을 Row 로 설정하면 2.8.X에서 동작하지 않음.
        feedbackStyle: DragFeedbackStyle.ROW,
      });
    }

    provider.setRows(rows);
    props.onInitGrid?.(gridView);

    return () => {
      provider.clearRows();
      gridView.destroy();
      provider.destroy();
    };
  }, []);

  return <div ref={realgridElement} className="flex-1 bg-blue-50"></div>;
}
