import * as React from 'react';
import  './datagrid-table.component.style.css';
import { isNumber } from 'util';
import { DataGridHeaderColumns } from '../datagrid-header/datagrid-header';

export interface ColumnProps {
  key: string;
  name: string;
  width?: number;
}

interface Props {
  minHeight: string | number
  columns: ColumnProps[],
  data: any[]
}

interface State {
}

export class DataGridTable extends React.Component<Props, State> {
  render() {
    const { minHeight} = this.props;
    return(
      <div style={{minHeight: isNumber(minHeight) ? minHeight + 'px': minHeight }}>
      <div className="rowTable">
          <DataGridHeaderColumns columns={this.props.columns} />
      </div>
      </div>
    );
  }
}
