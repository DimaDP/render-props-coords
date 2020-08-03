import React from 'react';

interface State {
  x: number;
  y: number;
}

export type RenderCoordinatesProps = Pick<State, 'x' | 'y'>;

interface Props {
  children: (props: RenderCoordinatesProps) => JSX.Element;
}

export class MouseMoveListener extends React.Component<Props, State> {
  state: State = {
    x: 0,
    y: 0,
  };

  componentDidMount() {
    window.addEventListener('mousemove', this.listenMouseMove);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.listenMouseMove);
  }

  listenMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;

    this.setState({
      x: clientX,
      y: clientY,
    });
  };

  render() {
    const { x, y } = this.state;
    const { children } = this.props;

    return (
      <div>
        MouseMoveListener RenderProps:
        {children({ x, y })}
      </div>
    );
  }
}
