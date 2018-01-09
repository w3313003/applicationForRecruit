import * as React from 'react';
import { Button } from 'antd-mobile';
import * as  stylus from  './s.styl';
import 'antd-mobile/dist/antd-mobile.css'
console.log(stylus)

interface UiP {
  name: string,
  children?: {}
}

class Ui extends React.Component<UiP> {
    constructor(props: any) {
      super(props)
    }
    render() {
      return (
        <div>
            name:{this.props.name}
            {this.props.children}
        </div>
      )
    }
}

interface Props {
  store: any,
  stateAdd?: any,
  stateDrease?: any
}

class App extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <div>
        <Ui name="zj">
            <h4>Hello,world</h4>
        </Ui>
        <h1>
          现在有机枪{this.props.store}把
        </h1>
            <Button onClick={() => this.props.stateAdd()} type="primary" size='small'>添加武器</Button>
            <div className='app'>
                <Button onClick={() => this.props.stateDrease()} type='warning' size='large'>撤回武器</Button>
            </div>
      </div>
    );
  }
}

export default App;
