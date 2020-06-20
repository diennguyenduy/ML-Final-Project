import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: '0 auto',
  },
  split: {
    'margin-top': '50px',
    'padding-left': '50%',
  },
  out: {
    margin: '10px',
  },
});

class ChartsSection extends Component {
  render() {
    var data = this.props.data;
    const { classes } = this.props;
    console.log('new echart render', data);
    var barOption = {
      xAxis: {
        type: 'category',
        data: ['Angry', 'Disgusting', 'Fear', 'Happy', 'Sad', 'Surprise', 'Natural'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: data,
          type: 'bar',
        },
      ],
    };

    var pieOption = {
      title: {
        text: 'Emotion',
        x: 'center',
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: ['Angry', 'Disgusting', 'Fear', 'Happy', 'Sad', 'Surprise', 'Natural'],
      },
      series: [
        {
          name: 'emotions',
          type: 'pie',
          radius: '55%',
          center: ['50%', '60%'],
          data: [
            { value: data[0], name: 'Angry' },
            { value: data[1], name: 'Disgusting' },
            { value: data[2], name: 'Fear' },
            { value: data[3], name: 'Happy' },
            { value: data[4], name: 'Sad' },
            { value: data[5], name: 'Surprise' },
            { value: data[6], name: 'Natural' },
          ],
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
    };

    var idx = -1;
    var max = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i] > max) {
        max = data[i];
        idx = i;
      }
    }
    return (
      <div className={classes.out}>
        <Paper className={classes.paper}>
          <Grid container spacing={24}>
            <Grid item xs={3}>
              <canvas className={classes.split} id='cutted'></canvas>
            </Grid>
            <Grid item xs={1}>
              {idx === -1 ? (
                <h3>Pending...</h3>
              ) : (
                <div>
                  <h3>{barOption.xAxis.data[idx]}</h3>
                </div>
              )}
            </Grid>
            <Grid item xs={4}>
              <ReactEcharts option={pieOption} />
            </Grid>
            {/* <Grid item xs={4}>
              <ReactEcharts option={barOption} />
            </Grid> */}
          </Grid>
        </Paper>
      </div>
    );
  }
}

ChartsSection.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChartsSection);
