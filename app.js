function formattedSeconds(sec){
  var seconds = ('0' + sec % 60).slice(-2);
  var minutes = Math.floor(sec/60);
  return minutes + ':' + seconds;
}

var Stopwatch = React.createClass({

  getInitialState: function(){
    return { secondsElapsed: 0, laps: []};
  },

  getSeconds: function(){
    return ('0' + this.state.secondsElapsed % 60).slice(-2);
  },

  getMinutes: function() {
    return Math.floor(this.state.secondsElapsed / 60)
  },

  handleStartClick: function(){
    var _this = this;
    this.incrementer = setInterval(function() {
      _this.setState({
        secondsElapsed: (_this.state.secondsElapsed + 1)
      });
    }, 1000)
  },

  handleStopClick: function(){
    clearInterval(this.incrementer);
    this.setState({lastClearedIncrementer: this.incrementer});
  },

  handleResetClick: function(){
    this.setState({ secondsElapsed: 0, laps: [] });
  },

  handleLapClick: function(){
    this.setState({laps: this.state.laps.concat([this.state.secondsElapsed])});
  },

  render: function (){
    return <div className="stopwatch">
    <h1 className="stopwatch-timer">{formattedSeconds(this.state.secondsElapsed)}</h1>

    {(this.state.secondsElapsed === 0) || this.incrementer === this.state.lastClearedIncrementer
      ? <Button className="start-btn" onClick={this.handleStartClick}>start</button>
      : <Button className="stop-btn" onClick={this.handleStopClick}>stop</button>
    }

     {(this.state.secondsElapsed !== 0 && this.incrementer !== this.state.lastClearedIncrementer)
       ? <Button onClick={this.handleLapClick}>lap</button>
       : null
     }

     {(this.state.secondsElapsed !== 0 && this.incrementer === this.state.lastClearedIncrementer)
       ? <Button onClick={this.handleResetClick}>reset</button>
       : null
     }

      <ul className="stopwatch-laps">{this.state.laps.map(function(lap, i){
        return <li className="stopwatch-lap"><strong>{i+1}</strong>{formattedSeconds(lap)}</li>
      })}</ul>
      
    </div>
  }

});

var Button = React.createClass({
  render: function () {
    return <button type="button" {...this.props} className={"btn " + this.props.className} />;
  }
})
React.render(<Stopwatch />, document.body);
