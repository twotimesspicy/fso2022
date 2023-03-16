import personService from '../services/persons'

const DeleteButton = ({id}) => {
    const handleDelete = () => {
        if (window.confirm("Do you really want to delete?")) {
            console.log('handle delete')
            personService.deletePerson(id)
        }
    }
    return (
        <button onClick={handleDelete}>delete</button>
    )
}

const Persons = ({personsToShow}) => {
    return (
        <div>
            {personsToShow.map(person =>
                <div key={person.id}>
                    {person.name} {person.number} <DeleteButton id={person.id}/>
                </div>
            )}
        </div>
    )
}

export default Persons
