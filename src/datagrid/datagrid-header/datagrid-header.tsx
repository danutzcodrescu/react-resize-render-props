import * as React from 'react';
import { ColumnProps } from '../datagrid-table/datagrid-table.component';
import { ResizableComponent } from '../../resizable/resizable-component';

interface Props {
  columns: ColumnProps[]
}

interface State {
}

export class DataGridHeaderColumns extends React.Component<Props, State> {

  resizedCol = (width: number) => {
    console.log(width)
  }

  render() {
    return <>
        {this.props.columns.map(column => (
          <ResizableComponent
            key={column.key}
            className="headers"
            render={
              <div>
                <div className="content">{column.name}</div>
              </div>
            }
            onResize={this.resizedCol}
          />
        ))}
      </>;
  }
}
