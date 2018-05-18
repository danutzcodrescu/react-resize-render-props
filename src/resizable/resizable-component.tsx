import * as React from "react";
import { fromEvent, Observable, Subscription } from "rxjs";
import { switchMap, takeUntil, map } from "rxjs/operators";
import * as _ from 'lodash';

interface Props {
  render: any
  width?: number;
  onResize?: (width: number) => void;
  className?: string;
}

interface State {
  width: number;
}

export class ResizableComponent extends React.Component<Props, State> {
  container: React.RefObject<HTMLDivElement> = React.createRef();
  mouseDown$: Observable<Event>;
  mouseUp$: Observable<Event>;
  mouseMove$: Observable<Event>;
  mouseDrag$: Observable<Event>;
  mouseSubscription$: Subscription;

  constructor(props: Props) {
    super(props);
    this.state = {
      width: this.props.width || 0
    };

  }

 
  componentDidMount() {
    this.mouseDown$ = fromEvent(
      this.container.current as HTMLDivElement,
      "mousedown"
    );
    this.mouseUp$ = fromEvent(
      document,
      "mouseup"
    );
    this.mouseMove$ = fromEvent(
      document,
      "mousemove"
    );
    this.mouseDrag$ = this.mouseDown$.pipe(
      switchMap((event: MouseEvent) => { 
        return this.mouseMove$.pipe(map((elem: MouseEvent) => {
          let newWidth;
          if (elem.clientX > (this.container.current as HTMLDivElement).offsetLeft) {
            newWidth = elem.clientX - (this.container.current as HTMLDivElement).offsetLeft;
          } else {
            newWidth = (this.container.current as HTMLDivElement).getBoundingClientRect().width - elem.clientX + (this.container.current as HTMLDivElement).offsetLeft;
          }
        this.setState({width: newWidth})
        return elem;
      }),takeUntil(this.mouseUp$))})
    );
    this.mouseSubscription$ = this.mouseDrag$.subscribe(() => {
      if(!_.isNil(this.props.onResize)) {
        this.props.onResize(this.state.width);
      }
    });
  }

  componentWillUnmount() {
    this.mouseSubscription$.unsubscribe();
  }
  render() {
    return <div className={this.props.className} style={{width: this.state.width > 0 ? this.state.width+'px' : 'auto'}} ref={this.container}>
        {this.props.render}
      </div>;
  }
}
