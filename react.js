/*============
  PLAYERS AND SCORES
=========== */
const Header = (props) => {
  return (
    <header>
      <h1>{props.title}</h1>
      <span className='stats'>Players: {props.totalPlayers}</span>
    </header>
  )
}

//extends keyword is used to create a sub class or child of another class
//super() calls the constructor of the component class
// class Counter extends React.Component {
// constructor(){
//   super()
// }
//}
//when you create custom components that extends from react.component it'll lose its binding
//arrow scope uses lexical, binds the scope to which they're defined
/*setState takes an object passed to it and eventually merges it. Using multiple this.setState inside a event handler can cause issues; state can be updated asynchronously. setState can take a callback that produces state based on previous state. whenever you need to update state based on previous state use prevState is more reliable. */

//DISPLAYS EACH PLAYER'S NAME
const Player = (props) => {
  return (
    <div className='player'>
      <span className='player-name'>
        <button
          className='remove-player'
          onClick={() => props.removePlayer(props.id)}
        >
          x
        </button>
        {props.name}
      </span>
      <Counter />
    </div>
  )
}

class Counter extends React.Component {
  state = {
    score: 0,
  }

  increment = () => {
    this.setState((prevState) => ({
      score: prevState.score + 1,
    }))
  }

  decrement = () => {
    this.setState((prevState) => ({
      score: prevState.score - 1,
    }))
  }

  render() {
    return (
      <div className='counter'>
        <button className='counter-action decrement' onClick={this.decrement}>
          -
        </button>
        <span className='counter-score'>{this.state.score}</span>
        <button className='counter-action increment' onClick={this.increment}>
          +
        </button>
      </div>
    )
  }
}

class App extends React.Component {
  state = {
    players: [
      { name: 'Chris', id: 1 },
      { name: 'Daniel', id: 2 },
      { name: 'Eric', id: 3 },
      { name: 'Ping', id: 4 },
      { name: 'Raymond', id: 5 },
      { name: 'Ryan', id: 6 },
    ],
  }
  handleRemovePlayer = (id) => {
    this.setState((prevState) => {
      return { players: prevState.players.filter((p) => p.id !== id) }
    })
  }
  render() {
    return (
      <div className='scoreboard'>
        <Header title='Score' totalPlayers={this.state.players.length} />
        {this.state.players.map((player) => (
          <Player
            name={player.name}
            id={player.id}
            key={player.id.toString()}
            removePlayer={this.handleRemovePlayer}
          />
        ))}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
