import * as React from 'react';
import { ColumnProps } from '../datagrid-table/datagrid-table.component';

interface Props {
  data: any[],
  columns: ColumnProps[]
}

interface State {
}

export class DatagridRow extends React.Component<Props, State> {
  render() {
    return <div className="rowTable">test</div>
  }
}
