const Header = ({ course }) => <h1>{course.name}</h1>

const Total = ({ sum }) => <h3>Number of exercises {sum}</h3>

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

const Content = ({ parts }) =>
    <>
        {parts.map(part =>
            <Part key={part.id} part={part} />)}
    </>

const Course = ({ course }) =>
    <>
        <Header course={course} />
        <Content parts={course.parts} />
        <Total sum={course.parts.reduce((sum, part) => sum + part.exercises, 0)} />
    </>

export default Course