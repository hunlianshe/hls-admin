

import React, {
  Component,
} from './node_modules/react';

import {
  Steps,
} from './node_modules/antd';
const Step = Steps.Step;

import './pipeline.css';
import Service from '../../../../../Http/service';

class  Pipeline extends Component {
  constructor(props) {
    super(props)
    this.state = {
      steps: [],
      currentSteps: 1,
    }
  }

  componentWillMount() {
    this.getConvertModel();
  }

  getConvertModel() {
    let currentSteps = 1;
    Service.getConvertModel().then((result) => {
      let pipelineData = result.data || [];
      const steps = pipelineData.map((s, i) => {
        if (s.status) {
          currentSteps = i;
        }
        return <Step key={i} title={s.title} description={s.description} />
      });
      this.setState({
        steps,
        currentSteps,
      })
    });
  }

  render() {
    const {
      steps,
      currentSteps,
    } = this.state;
    return <div>
      <div className="sub-title"> Pipeline</div>
        <div className="steps">
          <Steps current={currentSteps}>{steps}</Steps>
        </div>
      </div>
  }
}

export default  Pipeline;