const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => {
  return (
    <p>{props.content} {props.exercise}</p>
  )
}

function Total(props) {
  return (
    <p>Number of exercises {props.exercise1 + props.exercise2 + props.exercise3}</p>
  )
}

const App = () => {
  const course = {
    name: 'Full stack application development',
    parts: [{
      name: 'Fundamentals of React',
      exercises: 10
    },

    {
      name: 'Using props to pass data',
      exercises: 7
    },

    {
      name: 'State of a component',
      exercises: 14
    }]

  }
  return (
    <div>
      <Header course={course.name} />
      <Part content={course.parts[0].name} exercise={course.parts[0].exercises} />
      <Part content={course.parts[1].name} exercise={course.parts[1].exercises} />
      <Part content={course.parts[2].name} exercise={course.parts[2].exercises} />
      <Total exercise1={course.parts[0].exercises} exercise2={course.parts[1].exercises} exercise3={course.parts[2].exercises} />
    </div>
  )
}

export default App;