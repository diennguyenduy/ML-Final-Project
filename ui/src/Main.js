import UIfx from 'uifx';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CameraSection from './CameraSection';
import ChartsSection from './ChartsSection';
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import sad from './sounds/sad.mp3';
import fear from './sounds/fear.mp3';
import angry from './sounds/angry.mp3';
import happy from './sounds/happy.mp3';
import disgust from './sounds/disgust.mp3';
import surprise from './sounds/surprise.mp3';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    height: 580,
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  split: {
    'margin-top': '50px',
    'padding-left': '30%',
  },
});

const angryAlert = new UIfx(angry, {
  volume: 0.5,
  throttleMs: 100,
});

const happyAlert = new UIfx(happy, {
  volume: 0.5,
  throttleMs: 100,
});

const surpriseAlert = new UIfx(surprise, {
  volume: 0.5,
  throttleMs: 100,
});

const sadAlert = new UIfx(sad, {
  volume: 0.5,
  throttleMs: 100,
});

const fearAlert = new UIfx(fear, {
  volume: 0.5,
  throttleMs: 100,
});

const disgustAlert = new UIfx(disgust, {
  volume: 0.5,
  throttleMs: 100,
});

// function emotion(emotion) {
//   if (this.state.emotion === emotion) {
//     const Alert = new UIfx(emotion, {
//       volume: 0.5,
//       throttleMs: 100,
//     });
//   }
// }

class Main extends Component {
  state = {
    echartsData: [0, 0, 0, 0, 0, 0, 0],
    loaded: false,
  };

  updateEcharts(data) {
    let emotion;
    for (let i = 0; i < 7; i++) {
      if (data[i] === Math.max(...data)) {
        emotion = i;
        break;
      }
    }
    if (emotion === 0) {
      angryAlert.play();
    } else if (emotion === 1) {
      disgustAlert.play();
    } else if (emotion === 2) {
      fearAlert.play();
    } else if (emotion === 3) {
      happyAlert.play();
    } else if (emotion === 4) {
      sadAlert.play();
    } else if (emotion === 5) {
      surpriseAlert.play();
    }

    this.setState({ echartsData: data });
  }

  setLoaded() {
    this.setState({ loaded: true });
  }

  render() {
    return (
      <div>
        {this.state.loaded ? null : (
          <div>
            <LinearProgress />
            <br />
          </div>
        )}
        <CameraSection
          setLoaded={this.setLoaded.bind(this)}
          updateEcharts={this.updateEcharts.bind(this)}
        />
        <ChartsSection data={this.state.echartsData} />
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Main);
