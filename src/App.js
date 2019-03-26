import React, { Component } from 'react';
import './App.css';
//____________________DATA_______________________
const audiosetOne = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  }, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  }, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  }, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3'
  }, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  }, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  }, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: "Kick-n'-Hat",
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  }, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  }, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  },
];

const audiosetTwo = [
    {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Chord-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3'
  }, {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Chord-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3'
  }, {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Chord-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3'
  }, {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Shaker',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3'
  }, {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3'
  }, {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3'
  }, {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Punchy-Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3'
  }, {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Side-Stick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3'
  }, {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Snare',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3'
  }
];

//__________________Components____________________
class DrumButton extends Component {
  constructor(props){
    super(props);
    this.playAudio = this.playAudio.bind(this);
  }
  playAudio = (event) => {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.props.setDisplay(this.props.id);
  }
  handleKeyPress = (event) => {
    if (event.keyCode === this.props.keyCode) {
      this.playAudio();
    }
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  render(){
    return(
      <div  className="drum-pad"
            onClick={this.playAudio}
            id={this.props.id}>
        <audio className='clip' id={this.props.keyTrigger} src={this.props.url}></audio>
        {this.props.keyTrigger}
      </div>
    );
  }
}
class DrumPad extends Component {
  constructor(props){
    super(props);
  }
  render() {
    let buttonSet;
    if(this.props.power){
      buttonSet = this.props.audioset.map((audioObj) =>
      {
        return(
          <DrumButton keyCode = {audioObj.keyCode}
                      keyTrigger = {audioObj.keyTrigger}
                      id = {audioObj.id}
                      url = {audioObj.url}
                      setDisplay = {this.props.setDisplay}/>
        )
      });
    }
    else {
      buttonSet = "Power off";
    }
    return(
      <div id="drum-pad-container">{buttonSet}</div>
    );
  }
}
class Settings extends Component {
  render() {
    return (
      <div id="settings">
        <p id="display">{this.props.display}</p>
        <button onClick={this.props.changeAudioset}>Change audio set</button>
        <button onClick={this.props.turnPower}>Turn Power</button>
      </div>
    );
  }
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      audioset: audiosetOne,
      audiosetID: "audiosetOne",
      display: "Heater set",
    };
  };
//_____________________HANDLERS____________________
  turnPower = () => {
    this.state.power ?
    this.setState({power: false}) :
    this.setState({power: true});
  }

  setDisplay = (text) => {
    this.setState({
      display: text
    })
  }
  changeAudioset = () => {
    if(this.state.power){
      if(this.state.audiosetID === "audiosetOne") {
        this.setState({
          audioset: audiosetTwo,
          audiosetID: "audiosetTwo",
          display: "Piano set"
        });
      }
      else {
        this.setState({
          audioset: audiosetOne,
          audiosetID: "audiosetOne",
          display: "Heater set"
        });
      }
    }
  }
  //_________________RENDER________________
  render() {
    return (
      <div className="App">
        <div id="drum-machine">
          <DrumPad power={this.state.power} audioset={this.state.audioset} setDisplay={this.setDisplay}/>
          <Settings display={this.state.display} changeAudioset={this.changeAudioset} turnPower={this.turnPower}/>
        </div>
      </div>
    );
  }
}

export default App;
