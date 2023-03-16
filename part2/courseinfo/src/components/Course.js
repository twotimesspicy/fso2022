const Course = ({name, parts}) => {
    return (
        <div>
            <Header name={name}/>
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    )
}

const Header = ({name}) => {
    return <h1>{name}</h1>
}

const Total = ({parts}) => {
    const total = parts.reduce(
        (s, p) => s + p.exercises, 0
    )
    return <p><b>total of {total} exercises</b></p>
}

const Part = (props) => {
    return (
      <p>
        {props.part} {props.exercises}
      </p>
    )
}

const Content = ({parts}) => {
    return (
        <div>
            {parts.map(part =>
                <Part
                    part={part.name}
                    exercises={part.exercises}
                    key={part.id}
                />
            )}
        </div>
    )
}

export default Course
